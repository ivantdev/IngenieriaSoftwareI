"""
WSGI config for centro_medico project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
import sys
from pathlib import Path
from django.core.wsgi import get_wsgi_application


BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(BASE_DIR / "python_shared"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "centro_medico.settings")

application = get_wsgi_application()
