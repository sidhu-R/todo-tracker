
from .models import task1
from django.contrib.auth.models import User
from datetime import datetime
from django.db.models import Q
from django.core.mail import send_mail
from .models import user_profile3






def due_reminder():
    users=User.objects.all()
    today = datetime.today()
    print('reminder running')
    for user in users:
            pending = task1.objects.filter(user1=user,task_due1__lt=today,).exclude(Q(task_status1='Finished'))
            if pending:
                    chck=user_profile3.objects.filter(user3=user).values_list('notif_acc3')
                    check=(True,)
                    if check==chck[0]:
                            send_mail(
                    'pending',
                    'There are pending tasks and due date is over please look on to it'+user.username +'' '!',
                    'sidharth.work10@gmail.com',
                    [user.email],
                    fail_silently=False,
                )



def update_something():
    print("this function runs every 10 seconds")