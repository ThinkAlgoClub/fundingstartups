# Production Grade Project Code

### Working background with:
- Core apps
- Models
- API endpoints
- Settings
- URLs

### 1. Project Structure
- Use the following command:
```
(.env) D:\Interviews\fundingstartups>django-admin startproject project .       
```


```
fundingstartups/
    manage.py
    project/
            __init__.py
            settings.py
            urls.py
            wsgi.py
    users/
    startups/
    investors/
    funding/
    deals/
```


### 2. settings.py
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

    'users',
    'startups',
    'investors',
    'funding',
    'deals',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', # use SQL Server later
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_USER_MODEL = 'users.User'

ROOT_URLCONF = 'project.urls'
```

### 3. urls.py

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('startups/', include('startups.urls')),
    path('investors/', include('investors.urls')),
    path('funding/', include('funding.urls')),
    path('deals/', include('deals.urls')),
]
```

### 4. USERS APP
`**models.py**`

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