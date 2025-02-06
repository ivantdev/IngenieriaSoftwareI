from pathlib import Path
import environ
import os

BASE_DIR = Path(__file__).resolve().parent
env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG")

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "shared.notifications",
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": env("DATABASE_URL", default=BASE_DIR / "db.sqlite3"),
    }
}

USE_TZ = True
