from django.apps import AppConfig


class MyappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'

# calling the due reminder timer
    def ready(self):
        from . import updater
        updater.start()