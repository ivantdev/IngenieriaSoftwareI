from django.apps import AppConfig
import threading
import sys
import os
import time


def delayed_tasks():
    """
    Execute the record_occupancy task every 5 seconds
    """
    if os.environ.get("RUN_MAIN") != "true":
        return

    time.sleep(5)  # Wait for the database to be ready
    from occupancy.tasks import record_occupancy

    def run_record_occupancy():
        interval = int(os.environ.get("OCCUPANCY_RECORD_INTERVAL", 900))
        threading.Timer(interval, run_record_occupancy).start()
        record_occupancy()

    if "runserver" in sys.argv:  # Only run the task when the server is running
        run_record_occupancy()


class OccupancyConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "occupancy"

    def ready(self):
        RUN_TASKS = os.environ.get("RUN_TASKS", "False")
        if RUN_TASKS == "True":
            threading.Thread(target=delayed_tasks).start()
