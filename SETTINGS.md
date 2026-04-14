# settings.py (Security, Auth, Admin, API Risks)

- Every mistake in settings.py effects:
    - Login system
    - Admin panel
    - API security
    - Data protection

### SECRET_KEY - Authentication Backbone

```
SECRET_KEY = 'dev-secret-key'
```
- **Problem*:**
    - Hardcoded
    - Weak and predictable

- **Django uses SECRET_KEY for:**
    - Session signing
    - Password reset tokens
    - CSRF tokens

- *If exposed:*
    - Attackers can **forge login sessions**
    - Hijack user accounts
    - Generate valid reset links

### DEBUG = True - Full System Exposure
```
DEBUG = True
```
- **Debug mode exposes:**
    - Full stack traces
    - Installed apps
    - Database queries

### ALLOWED_HOSTS = [] - Deployment Failure + Host Header Attack
- **Problem:**
    1. In production - Django blocks all requests
    2. If misconfigured - vulnerable to **Host Header Injection**
- **Impact:**
    - Password reset links can be hijacked
    - Users redirected to attacker domains

### INSTALLED_APPS - Missing Critical Security Components
....


### No REST_FRAMEWORK Configuration
```
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
```

- **Missing:**
```
REST_FRAMEWORK = {
    ...
}
```
