from apscheduler.schedulers.background import BackgroundScheduler
from .cron import update_something,due_reminder

# due reminder timer
def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(due_reminder, 'interval', minutes=720)
    scheduler.start()