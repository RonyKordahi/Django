from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-agwn@r)2b=gj7j$7hykawfxl%74zx!&m(31_hc=^88d_4lm(%z'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1"] 

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "base.apps.BaseConfig",
    "rest_framework",
    "corsheaders",
    
    # django-storages app to install
    "storages",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    # package that allows server to serve static files
    "whitenoise.middleware.WhiteNoiseMiddleware",
    # 
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            # telling django to use React's build folder
            # continued in backend/urls.py and below in STATICFILES_DIRS
            os.path.join(BASE_DIR, "frontend/build")
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# db override in udemy course, all options are default for postgress
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': "proshop",
#         "USER": "postgress",
#         "PASSWORD": "password",
#         "HOST": "locahost",
#         "PORT": "5432"
#     }
# }
# 
# after overriding, run migrations
# 
# |
# |
# |
# V
# 
# db transferred to AWS
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': "AWS_name",
        "USER": "AWS_user",
        "PASSWORD": "AWS_password",
        "HOST": "AWS_host_endpoint",
        "PORT": "AWS_port"
    }
}
# 
# after transferring, run migrations again

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

###########################
# Manually added settings #
###########################

# allows cors access from all URLs
CORS_ALLOW_ALL_ORIGINS = True

# lets project detect static folders in the root (BASE_DIR is the root)
STATICFILES_DIRS = [
    BASE_DIR / "static",
    BASE_DIR / "frontend/build/static",
]

# tells django where to upload user content (path for images)
MEDIA_ROOT = BASE_DIR / "static/images"

# deployment static file
# python manage.py collectstatic
# go to base/urls.py for next step
STATIC_ROOT = BASE_DIR / "staticfiles"

# tells django from where to render images (path for src)
MEDIA_URL = "images/"

# changes authentication library from django to simplejwt
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# customizes jwt token
from datetime import timedelta

SIMPLE_JWT = {
    
    # expiration set to 30 days instead of 5 minutes
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    
    # custom token serializer for custom token values
    "TOKEN_OBTAIN_SERIALIZER": "base.serializers.MyTokenObtainPairSerializer",
}

# sets debug to false when app is live
if os.getcwd() == "/app":
    DEBUG = False

#######################
# IMAGE HOSTING STEPS #
#######################

# pip install boto3 + django-storages for image hosting

# comes from boto3
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"

# create IAM user on AWS, these values should be hidden in .env. Variables come from boto3/djang-storages
AWS_ACCESS_KEY_ID = AWS_access_key_id
AWS_SECRET_ACCESS_KEY = AWS_secret_access_key
AWS_STORAGE_BUCKET_NAME = AWS_s3_photobucket_name

# keeps the query auth information out of the image src
AWS_QUERYSTRING_AUTH = False
