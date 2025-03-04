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
    "shared.users",
    "shared.notifications",
]

DATABASE_URL = env("DATABASE_URL", default=None)

DATABASES = {
    "default": {
        "ENGINE": (
            "libsql.db.backends.sqlite3"
            if DATABASE_URL
            else "django.db.backends.sqlite3"
        ),
        "NAME": DATABASE_URL if DATABASE_URL else BASE_DIR / "db.sqlite3",
        "CONN_MAX_AGE": 300,
    }
}

AUTH_USER_MODEL = "shared_users.User"

USE_TZ = True
