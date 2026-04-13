# Project Structure

```
fundingstack/

manage.py

config/
    __init__.py
    settings.py
    urls.py
    wsgi.py

apps/
    users/
    startups/
    investors/
    funding/
    deals/
```

---

# settings.py

```python
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'dev-secret-key'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',

    'apps.users',
    'apps.startups',
    'apps.investors',
    'apps.funding',
    'apps.deals',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # use postgres later
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_USER_MODEL = 'users.User'

ROOT_URLCONF = 'config.urls'
```

---

# urls.py

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.users.urls')),
    path('api/', include('apps.startups.urls')),
    path('api/', include('apps.investors.urls')),
    path('api/', include('apps.funding.urls')),
    path('api/', include('apps.deals.urls')),
]
```

---

# USERS APP

## models.py

```python
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
```

## serializers.py

```python
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
```

## views.py

```python
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

## urls.py

```python
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register("users", UserViewSet)

urlpatterns = router.urls
```

---

# STARTUPS APP

## models.py

```python
from django.db import models
from django.conf import settings

class Startup(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    founder = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    industry = models.CharField(max_length=100)

    def __str__(self):
        return self.name
```

## serializers.py

```python
from rest_framework import serializers
from .models import Startup

class StartupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = "__all__"
```

## views.py

```python
from rest_framework.viewsets import ModelViewSet
from .models import Startup
from .serializers import StartupSerializer

class StartupViewSet(ModelViewSet):
    queryset = Startup.objects.all()
    serializer_class = StartupSerializer
```

## urls.py

```python
from rest_framework.routers import DefaultRouter
from .views import StartupViewSet

router = DefaultRouter()
router.register("startups", StartupViewSet)

urlpatterns = router.urls
```

---

# INVESTORS APP

## models.py

```python
from django.db import models

class Investor(models.Model):
    name = models.CharField(max_length=200)
    investor_type = models.CharField(max_length=100)

    def __str__(self):
        return self.name
```

## serializers.py

```python
from rest_framework import serializers
from .models import Investor

class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = "__all__"
```

## views.py

```python
from rest_framework.viewsets import ModelViewSet
from .models import Investor
from .serializers import InvestorSerializer

class InvestorViewSet(ModelViewSet):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer
```

## urls.py

```python
from rest_framework.routers import DefaultRouter
from .views import InvestorViewSet

router = DefaultRouter()
router.register("investors", InvestorViewSet)

urlpatterns = router.urls
```

---

# FUNDING ROUNDS

## models.py

```python
from django.db import models
from apps.startups.models import Startup

class FundingRound(models.Model):
    startup = models.ForeignKey(Startup, on_delete=models.CASCADE)
    round_type = models.CharField(max_length=50)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    raised_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.startup.name} - {self.round_type}"
```

---

# DEALS

## models.py

```python
from django.db import models
from apps.investors.models import Investor
from apps.funding.models import FundingRound

class InvestmentDeal(models.Model):
    investor = models.ForeignKey(Investor, on_delete=models.CASCADE)
    funding_round = models.ForeignKey(FundingRound, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    equity = models.FloatField()

    def __str__(self):
        return f"{self.investor.name} deal"
```

---

# Run Project

```bash
pip install django djangorestframework

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

# API Endpoints

```
/api/users/
/api/startups/
/api/investors/
/api/fundinground/
/api/deals/
```

---

# Result

You now have:

```text
✔ Full Django backend
✔ Models (Users, Startups, Investors, Funding, Deals)
✔ REST APIs
✔ Scalable structure
```
