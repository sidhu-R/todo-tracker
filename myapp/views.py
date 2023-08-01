from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.core import serializers
import json
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User
from .models import user_profile3,task1,faq,feedback,news_updates,Announce,Activity
from django.core.mail import send_mail
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from datetime import datetime
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View

# function to view and filter Activitylog in dahsboard                 
class Dashactvitylogview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            # print(sort_by)
            # print(day)

            if sort_by=='Today':
                data = Activity.objects.filter(user=user,activity_date__day=day,activity_date__year=year).order_by('-activity_time')
                response_data = []
                for item in data:
                    response_data.append({
                    'activity_done': item.activity_done,
                    'activity_date': item.activity_date,
                    'activity_time': item.activity_time,
                    })

            elif sort_by=='This Month':
                data = Activity.objects.filter(user=user,activity_date__month=month,activity_date__year=year).order_by('-activity_time')
                response_data = []
                for item in data:
                    response_data.append({
                    'activity_done': item.activity_done,
                    'activity_date': item.activity_date,
                    'activity_time': item.activity_time,
                    })


            elif sort_by=='This Year':
                data = Activity.objects.filter(user=user,activity_date__year=year).order_by('-activity_time')
                response_data = []
                for item in data:
                    response_data.append({
                    'activity_done': item.activity_done,
                    'activity_date': item.activity_date,
                    'activity_time': item.activity_time,
                    })

            # print(response_data)
            return JsonResponse(response_data, safe=False)


# function to view and filter announment recieved
class AnnounceRecieveview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day

            if sort_by=='Today':
                data = Announce.objects.filter(ann_created__day=day,ann_created__month=month,ann_created__year=year).exclude(user=user).order_by('-ann_created')

                response_data = []
                for item in data:
                        response_data.append({
                        'user_name':item.user.username,
                        'ann_title': item.ann_title,
                        'ann_desc': item.ann_desc,
                        'ann_created': item.ann_created,
                        })

            elif sort_by=='This Month':
                data = Announce.objects.filter(ann_created__month=month,ann_created__year=year).exclude(user=user).order_by('-ann_created')

                response_data = []
                for item in data:
                        response_data.append({
                        'user_name':item.user.username,
                        'ann_title': item.ann_title,
                        'ann_desc': item.ann_desc,
                        'ann_created': item.ann_created,
                        })
            elif sort_by=='This Year':
                data = Announce.objects.filter(ann_created__year=year).exclude(user=user).order_by('-ann_created')

                response_data = []
                for item in data:
                        response_data.append({
                        'user_name':item.user.username,
                        'ann_title': item.ann_title,
                        'ann_desc': item.ann_desc,
                        'ann_created': item.ann_created,
                        })

            # print(response_data)
            return JsonResponse(response_data, safe=False)


# function to view and filter Announcement send
class AnnouceSendview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day

            if sort_by=='Today':
                data = Announce.objects.filter(user=user,ann_created__day=day,ann_created__month=month,ann_created__year=year).order_by('-ann_created')

                response_data = []
                for item in data:
                        response_data.append({
                        'user_name':item.user.username,
                        'ann_title': item.ann_title,
                        'ann_desc': item.ann_desc,
                        'ann_created': item.ann_created,
                        })

            elif sort_by=='This Month':
                data = Announce.objects.filter(user=user,ann_created__month=month,ann_created__year=year).order_by('-ann_created')

                response_data = []
                for item in data:
                        response_data.append({
                        'user_name':item.user.username,
                        'ann_title': item.ann_title,
                        'ann_desc': item.ann_desc,
                        'ann_created': item.ann_created,
                        })
            elif sort_by=='This Year':
                data = Announce.objects.filter(user=user,ann_created__year=year).order_by('-ann_created')

                response_data = []
                for item in data:
                        response_data.append({
                        'user_name':item.user.username,
                        'ann_title': item.ann_title,
                        'ann_desc': item.ann_desc,
                        'ann_created': item.ann_created,
                        })

            # print(response_data)
            return JsonResponse(response_data, safe=False)

# function to view Announcement in notification bar
class AnnounceNotifbarview(View):
    def get(self,request):
        user=request.user
        if request.method == 'GET':
            # sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
    
            data = Announce.objects.filter(ann_created__day=day,ann_created__month=month,ann_created__year=year).exclude(user=user).order_by('-ann_created')[:4]

            # print(data)
            response_data = []
            for item in data:
                    response_data.append({
                    'user_name':item.user.username,
                    'ann_title': item.ann_title,
                    'ann_desc': item.ann_desc,
                    'ann_created': item.ann_created,
                    })
            # print(response_data)
        return JsonResponse(response_data, safe=False)


# function to create announcement
class Announcementcreateview(View):
    def post(self,request):
        user=request.user
        if request.method=='POST':
            title = request.POST.get('title')
            desc = request.POST.get('desc')
            Announce.objects.create(user=user,ann_title=title,ann_desc=desc)
            activity=Activity.objects.create(user=user,activity_done="Announcement created")
            activity.save()
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({"error": ""}, status=400)


# function to view and filter Task list in dahsboard  
class Dashtasktableview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            # print(sort_by)
            # print(day)


            if sort_by=='All':    
                data = task1.objects.filter(user1=user).exclude(task_activation='deactive').order_by('-task_created')
                # print(data)
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })

            elif sort_by=='Today':
                data = task1.objects.filter(user1=user,task_created__day=day).exclude(task_activation='deactive').order_by('-task_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })

            elif sort_by=='This Month':
                data = task1.objects.filter(user1=user,task_created__month=month,task_created__year=year).exclude(task_activation='deactive').order_by('-task_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })

            elif sort_by=='This Year':
                data = task1.objects.filter(user1=user,task_created__year=year).exclude(task_activation='deactive').order_by('-task_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })
            # print(response_data)
            return JsonResponse(response_data, safe=False)
        

# function to view and filter count of Tasks in progress in dahsboard  
class Dashtaskprogressview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            # print(sort_by)
            # print(day)

            if sort_by=='All':
                data = task1.objects.filter(user1=user,task_status1='In Progress').exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })

            elif sort_by=='Today':
                data = task1.objects.filter(user1=user,task_status1='In Progress',task_created__day=day,task_created__year=year).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })
                
            elif sort_by=='This Month':
                data = task1.objects.filter(user1=user,task_status1='In Progress',task_created__month=month,task_created__year=year).exclude(task_activation='deactive').count()

                response_data = []
                response_data.append({
                    'count': data
                    })
                
            elif sort_by=='This Year':
                data = task1.objects.filter(user1=user,task_status1='In Progress',task_created__year=year).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })
                
            # print(response_data )
            return JsonResponse(response_data , safe=False)


# function to view and filter count of Tasks in pending in dahsboard  
class Dashtaskpendingview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            # print(sort_by)
            # print(day)

            if sort_by=='All':
                data = task1.objects.filter(user1=user,task_status1='Pending').exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })

            elif sort_by=='Today':
                data = task1.objects.filter(user1=user,task_status1='Pending',task_created__day=day,task_created__year=year).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })
                
            elif sort_by=='This Month':
                data = task1.objects.filter(user1=user,task_status1='Pending',task_created__month=month,task_created__year=year).exclude(task_activation='deactive').count()

                response_data = []
                response_data.append({
                    'count': data
                    })
                
            elif sort_by=='This Year':
                data = task1.objects.filter(user1=user,task_status1='Pending',task_created__year=year).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })
                
            # print(response_data )
            return JsonResponse(response_data , safe=False)

# function to view and filter count of Finished tasks in dahsboard  
class Dashtaskfinishedview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            # print(sort_by)
            # print(day)

            if sort_by=='All':
                data = task1.objects.filter(user1=user,task_status1='Finished').exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })

            elif sort_by=='Today':
                data = task1.objects.filter(user1=user,task_status1='Finished',task_created__day=day,task_created__year=year).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })
                
            elif sort_by=='This Month':
                data = task1.objects.filter(user1=user,task_status1='Finished',task_created__month=month,task_created__year=year).exclude(task_activation='deactive').count()

                response_data = []
                response_data.append({
                    'count': data
                    })
                
            elif sort_by=='This Year':
                data = task1.objects.filter(user1=user,task_status1='Finished',task_created__year=year).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })
                
            # print(response_data )
            return JsonResponse(response_data , safe=False)

# function to view and filter count of All tasks in dahsboard  
class Dashtasknumview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            # print(sort_by)
            # print(day)

            if sort_by=='All':
                data = task1.objects.filter(user1=user).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })

            elif sort_by=='Today':
                data = task1.objects.filter(user1=user,task_created__day=day,task_created__year=year).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })
                
            elif sort_by=='This Month':
                data = task1.objects.filter(user1=user,task_created__month=month,task_created__year=year).exclude(task_activation='deactive').count()

                response_data = []
                response_data.append({
                    'count': data
                    })
                
            elif sort_by=='This Year':
                data = task1.objects.filter(user1=user,task_created__year=year).exclude(task_activation='deactive').count()
                response_data = []
                response_data.append({
                    'count': data
                    })
                
            # print(response_data )
            return JsonResponse(response_data , safe=False)


# function to view and filter featured news dahsboard  
class Dashnewsfilterview(View):
    def post(self,request):
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            # print(sort_by)
            # print(day)

            if sort_by=='Today':
                data = news_updates.objects.filter(news_created__day=day,news_catagory='Featured').order_by('-news_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'image_url': item.news_img.url,
                    'news_title': item.news_title,
                    'news_desc': item.news_desc,
                    })

            elif sort_by=='This Month':
                data = news_updates.objects.filter(news_created__month=month,news_created__year=year,news_catagory='Featured').order_by('-news_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'image_url': item.news_img.url,
                    'news_title': item.news_title,
                    'news_desc': item.news_desc,
                    })

            elif sort_by=='This Year':
                data = news_updates.objects.filter(news_created__year=year,news_catagory='Featured').order_by('-news_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'image_url': item.news_img.url,
                    'news_title': item.news_title,
                    'news_desc': item.news_desc,
                    })
            return JsonResponse(response_data, safe=False)



# function to view and filter general news in News updates page
class Generalnewssortview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            search_query = request.POST.get('search_query')
            sort_by = request.POST.get('sort_by')
            sort_by2 = request.POST.get('sort_by2')
            user_by = request.POST.get('user_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            print('gen_news user ',user_by)
            print('gen_news sort1 ',sort_by)
            print('gen_news sort2 ',sort_by2)

            # both deos not have values
            if sort_by=='' and sort_by2=='':

                if user_by=='All':    
                    data = news_updates.objects.filter(news_title__icontains=search_query,news_created__day=day,news_created__month=month,news_created__year=year,news_catagory='General').order_by('-news_created')
                    response_data = []
                    for item in data:
                        # print(item.news_created)
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
                else:
                    data = news_updates.objects.filter(news_title__icontains=search_query,user=user_by,news_created__day=day,news_created__month=month,news_created__year=year,news_catagory='General').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
            # both have values
            elif sort_by!='' and sort_by2!='':
                if user_by=='All':
                    data = news_updates.objects.filter(news_title__icontains=search_query,news_created__gte=(sort_by),news_created__lte=(sort_by2),news_catagory='General').order_by('-news_created')
                    # print(data)
                    response_data = []
                    for item in data:
                        print(item.news_created)
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
                else:
                    data = news_updates.objects.filter(news_title__icontains=search_query,user=user_by,news_created__gte=(sort_by),news_created__lte=(sort_by2),news_catagory='General').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
            # starting date have value
            elif sort_by!='' and sort_by2=='':
                if user_by=='All':
                    data = news_updates.objects.filter(news_title__icontains=search_query,news_created__gte=(sort_by),news_catagory='General').order_by('-news_created')
                    # print(data)
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
                else:
                    data = news_updates.objects.filter(news_title__icontains=search_query,user=user_by,news_created__gte=(sort_by),news_catagory='General').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
            elif sort_by=='' and sort_by2!='':
                if user_by=='All':
                    data = news_updates.objects.filter(news_title__icontains=search_query,news_created__lte=(sort_by2),news_catagory='General').order_by('-news_created')
                    # print(data)
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
                else:
                    data = news_updates.objects.filter(news_title__icontains=search_query,user=user_by,news_created__lte=(sort_by2),news_catagory='General').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
            return JsonResponse(response_data, safe=False)


# function to view and filter Featured news in News updates page
class Featurenewssortview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            search_query = request.POST.get('search_query')
            sort_by = request.POST.get('sort_by')
            sort_by2 = request.POST.get('sort_by2')
            user_by = request.POST.get('user_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            print('feat_news user ',user_by)
            print('feat_news sort1 ',sort_by)
            print('feat_news sort2 ',sort_by2)

            # both deos not have value
            if sort_by=='' and sort_by2=='':

                if user_by=='All':    
                    data = news_updates.objects.filter(news_title__icontains=search_query,news_created__day=day,news_created__month=month,news_created__year=year,news_catagory='Featured').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
                else:
                    data = news_updates.objects.filter(news_title__icontains=search_query,user=user_by,news_created__day=day,news_created__month=month,news_created__year=year,news_catagory='Featured').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
            # both have values
            elif sort_by!='' and sort_by2!='':
                if user_by=='All':
                    data = news_updates.objects.filter(news_title__icontains=search_query,news_created__gte=(sort_by),news_created__lte=(sort_by2),news_catagory='Featured').order_by('-news_created')
                    # print(data)
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
                else:
                    data = news_updates.objects.filter(news_title__icontains=search_query,user=user_by,news_created__gte=(sort_by),news_created__lte=(sort_by2),news_catagory='Featured').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
            # starting date have value
            elif sort_by!='' and sort_by2=='':
                if user_by=='All':
                    data = news_updates.objects.filter(news_title__icontains=search_query,news_created__gte=(sort_by),news_catagory='Featured').order_by('-news_created')
                    # print(data)
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
                else:
                    data = news_updates.objects.filter(news_title__icontains=search_query,user=user_by,news_created__gte=(sort_by),news_catagory='Featured').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
            # ending date have value
            elif sort_by=='' and sort_by2!='':
                if user_by=='All':
                    data = news_updates.objects.filter(news_title__icontains=search_query,news_created__lte=(sort_by2),news_catagory='Featured').order_by('-news_created')
                    # print(data)
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })
                else:
                    data = news_updates.objects.filter(news_title__icontains=search_query,user=user_by,news_created__lte=(sort_by2),news_catagory='Featured').order_by('-news_created')
                    response_data = []
                    for item in data:
                        response_data.append({
                        'image_url': item.news_img.url,
                        'news_title': item.news_title,
                        'news_desc': item.news_desc,
                        'news_created':item.news_created,
                        })     
            return JsonResponse(response_data, safe=False)


# function to create news in News updates page
class Createnewsview(View):
    @method_decorator(login_required(login_url='/log'))
    def post(self,request):
        user=request.user
        if request.method=="POST":
            ttle=request.POST['newstitle']
            dsc=request.POST['newsdesc']
            cat=request.POST['newscat']
            newimage=request.FILES.get('newsimg')
            news_updates.objects.create(user=user,
                                        news_title=ttle,
                                        news_desc=dsc,
                                        news_catagory=cat,
                                        news_img=newimage
                                        )
            activity=Activity.objects.create(user=user,activity_done="news created")
            activity.save()
            return JsonResponse({'status': 'success'})
        return JsonResponse({"Message":""})

# function to send feedback in feedback page
class Feedbackview(View):
    @method_decorator(login_required(login_url='/log'))
    def post(self,request):
        adminmail=User.objects.filter(username='admin').values_list('email')
        if request.method=="POST":
            name = request.POST['name']
            mail = request.POST['mail']
            country=request.POST['country']
            desc=request.POST['desc']
            # print(adminmail[0])
            feedback.objects.create(first_name=name,mail=mail,country=country,feed_desc=desc)

            send_mail(
        'feedback',
        'Thank you for your precious feedback mr '+name+' !',
        'sidharth.work10@gmail.com',
        [mail],
        fail_silently=False,
    )
            send_mail(
        'Got a feedback',
        'Got a feedback from '+name+'!'+' :'+desc,
        'sidharth.work10@gmail.com',
        adminmail[0],
        fail_silently=False,
    )

            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({"error": ""}, status=400)


# function to view deactivated tasks list in todo page
class Deactivetasklistview(View):
    def post(self,request):
        user=request.user
        if request.method == 'POST':
            sort_by = request.POST.get('sort_by')
            today = datetime.today()
            year = today.year
            month = today.month
            day = today.day
            # print(sort_by)
            # print(day)

            if sort_by=='All':    
                data = task1.objects.filter(user1=user,task_activation='deactive').order_by('-task_updated')
                # print(data)
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })

            elif sort_by=='Today':
                data = task1.objects.filter(user1=user,task_updated__day=day,task_activation='deactive').order_by('-task_updated')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })

            elif sort_by=='This Month':
                data = task1.objects.filter(user1=user,task_updated__month=month,task_updated__year=year,task_activation='deactive').order_by('-task_updated')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })

            elif sort_by=='This Year':
                data = task1.objects.filter(user1=user,task_updated__year=year,task_activation='deactive').order_by('-task_updated')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })
            # print(response_data)
            return JsonResponse(response_data, safe=False)


# function to deactivate tasks in todo page
class Deactivatetaskview(View):
    def post(self,request, pk):
        user=request.user
        if request.method == 'POST':
            task1.objects.filter(id=pk).update(task_activation='deactive')
            activity=Activity.objects.create(user=user,activity_done="Task deactivated")
            activity.save()
            return JsonResponse({'status': 'success'})


# function to update tasks in todo page
class Updatetaskview(View):
    def post(self,request, pk):
        user=request.user
        if request.method == 'POST':
            title=request.POST.get('title')
            desc=request.POST.get('desc')
            dte=request.POST.get('dte')
            prio=request.POST.get('prio')
            status=request.POST.get('status')
            task1.objects.filter(id=pk).update(task_title1=title,task_desc1=desc,task_priority1=prio,task_status1=status,task_due1=dte)
            activity=Activity.objects.create(user=user,activity_done="task updated")
            activity.save()
            return JsonResponse({'status': 'success'})

# function to create tasks in todo page
class Createtaskview(View):
    def post(self,request):
        user=request.user
        if request.method == "POST":
            title=request.POST.get('title')
            desc=request.POST.get('desc')
            dte=request.POST.get('dte')
            prio=request.POST.get('prio')
            status=request.POST.get('status')

            task1.objects.create(user1=user,task_title1=title,task_desc1=desc,task_priority1=prio,task_status1=status,task_due1=dte,task_activation='active')
            activity=Activity.objects.create(user=user,activity_done="task created")
            activity.save()
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({"error": ""}, status=400)

# function to view and filter tasks in todo page
class Tasklistview(View):
    def post(self,request):
        user=request.user
        if request.method=='POST':
            sort_by = request.POST.get('sort_by')
            sort_by2 = request.POST.get('sort_by2')
            print(sort_by)
            print(sort_by2)

            # both deos not have values
            if sort_by=='' and sort_by2=='':
                data = task1.objects.filter(user1=user).exclude(task_activation='deactive').order_by('-task_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })
            # both have values
            elif sort_by!='' and sort_by2!='':
                data = task1.objects.filter(user1=user,task_due1__gte=(sort_by),task_due1__lte=(sort_by2)).exclude(task_activation='deactive').order_by('-task_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })
            # starting date have value
            elif sort_by!='' and sort_by2=='':
                data = task1.objects.filter(user1=user,task_due1__gte=(sort_by)).exclude(task_activation='deactive').order_by('-task_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })
            # ending date have value
            elif sort_by=='' and sort_by2!='':
                data = task1.objects.filter(user1=user,task_due1__lte=(sort_by2)).exclude(task_activation='deactive').order_by('-task_created')
                response_data = []
                for item in data:
                    response_data.append({
                    'id':item.id,
                    'task_title': item.task_title1,
                    'task_desc': item.task_desc1,
                    'task_due': item.task_due1,
                    'task_priority': item.task_priority1,
                    'task_status': item.task_status1,
                    })
            # print(response_data)
            return JsonResponse(response_data, safe=False)


# function to turn notification on or off in userprofile page
class Notificationview(View):
    @method_decorator(login_required(login_url='/log'))
    def post(self,request):
        user=request.user
        profile=user_profile3.objects.filter(user3=user).all()
        if request.method=="POST":
            user_profile3.objects.filter(user3=user).update(notif_acc3=request.POST.get('boxes',False))

        return render(request,"users-profile.html",{"profile":profile})


# function to change password in userprofile page
class Changepassview(View):
    @method_decorator(login_required(login_url='/log'))
    @method_decorator(csrf_protect)
    def post(self,request):
        user=request.user
        currentpassword= request.user.password 
        if request.method=="POST":
            currentpasswordentered=request.POST["password"]
            password1=request.POST["newpassword"]
            matchcheck= check_password(currentpasswordentered, currentpassword)

            if matchcheck:
                        user=User.objects.get(username=user.username)
                        user.set_password(password1)
                        user.save()

                        activity=Activity.objects.create(user=user,activity_done="password changed")
                        activity.save()

                        em=user_profile3.objects.filter(user3=user).values_list('email3')
                        chck=user_profile3.objects.filter(user3=user).values_list('notif_acc3')
                        print(chck[0])
                        check=(True,)
                        print(check)
                        if check==chck[0]:
                            send_mail(

                            'password changed',
                            'your account password has been changed please secure your account if not done by you',
                            'sidharth.work10@gmail.com',
                            em[0],
                            fail_silently=False,
                            )

                            activity=Activity.objects.create(user=user,activity_done="profile updated")
                            activity.save()
                        return redirect('/log')

            else:
                profile = user_profile3.objects.filter(user3=user).all()
                return render(request,"users-profile.html",{"msg":"wrong password please try again","profile":profile})

        return render(request,"users-profile.html")

# function to delete image in userprofile page
class Deleteimageview(View):
    def post(self,request):
        user=request.user
        image = user_profile3.objects.get(user3=user)
        if request.method == 'POST':
            if image.image3:
                image.image3=''
                image.save()
                return JsonResponse({'message': 'Image deleted successfully.'})
            else:
                return JsonResponse({'message': 'No images to delete.'})
        return JsonResponse({'message': 'Invalid request.'})

# function to view and update user profile in userprofile page
class Profiledataview(View):
    @method_decorator(login_required(login_url='/log'))
    @method_decorator(csrf_protect)
    def post(self,request):
        user=request.user
        profiledata=user_profile3.objects.get(user3=user)
        if request.method=="POST":
            if request.FILES.get('img')==None:
                img=profiledata.image3
                name=request.POST['name']
                about=request.POST['about']
                company=request.POST['company']
                job=request.POST['job']
                country=request.POST['country']
                address=request.POST['address']
                phone=request.POST['phone']
                email=request.POST['email']
                twitter=request.POST['twitter']
                facebook=request.POST['facebook']
                instagram=request.POST['instagram']
                linkedin=request.POST['linkedin']
            else:
                name=request.POST['name']
                img=request.FILES.get('img',False)
                about=request.POST['about']
                company=request.POST['company']
                job=request.POST['job']
                country=request.POST['country']
                address=request.POST['address']
                phone=request.POST['phone']
                email=request.POST['email']
                twitter=request.POST['twitter']
                facebook=request.POST['facebook']
                instagram=request.POST['instagram']
                linkedin=request.POST['linkedin']

        profiledata.name3=name
        profiledata.image3=img
        profiledata.about3=about
        profiledata.company3=company
        profiledata.job3=job
        profiledata.country3=country
        profiledata.adress3=address
        profiledata.phone3=phone
        profiledata.email3=email
        profiledata.twitter3=twitter
        profiledata.facebook3=facebook
        profiledata.instagram3=instagram
        profiledata.linkdin3=linkedin
        profiledata.save()

        user_ob=User.objects.get(username=user.username)
        user_ob.email=email
        user_ob.first_name=name
        user_ob.save()

        activity=Activity.objects.create(user=user,activity_done="profile updated")
        activity.save()

        profile = user_profile3.objects.filter(user3=user).all()
        # print(user_profile3.objects.filter(user3=user).values())
        return render(request,"users-profile.html",{"profile": profile})


# function to check username already exists in signup page
class Checkusername(View):
    @method_decorator(csrf_protect)
    def get(self,request):
        if request.method == "GET":
            username = request.GET.get("username", None)

            if User.objects.filter(username = username).exists():
                return JsonResponse({"valid":False}, status = 200)
            else:

                return JsonResponse({"valid":True}, status = 200)

        return JsonResponse({}, status = 400)


# function to create account in signup page
class Signupview(View):
    @method_decorator(csrf_protect)
    def post(self,request):
        if request.method=="POST":
            first_name=request.POST['name']
            email=request.POST['email']
            username=request.POST['username']
            password=request.POST['password']
            user=User.objects.create_user(first_name=first_name,email=email,username=username,password=password)
            user.save()

            prof=user_profile3(user3=user,name3=first_name,email3=email)
            prof.save()

            return redirect('/log')
        return render(request,"pages-register.html")


# function to login
class Loginview(View):
    @method_decorator(csrf_protect)
    def post(self,request):
        user1=request.user
        if request.method=="POST":
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                activity=Activity.objects.create(user=user1,activity_done="Logged in")
                activity.save()
                return redirect('/')
            
            else:
                return render(request,"pages-login.html",{"msg":'incorrect username or password'})
        else:
            return render(request,"pages-login.html")


# function to logout 
class Logoutview(View):
    def get(self,request):
        user=request.user
        activity=Activity.objects.create(user=user,activity_done="Logged out")
        activity.save()
        logout(request)

        return redirect('/log')

# function to load index page
class Indexpageview(View):
    @method_decorator(login_required(login_url='/log'))
    def get(self,request):
        return render(request,"index.html")

# function to load todo page
class Todopageview(View):
    @method_decorator(login_required(login_url='/log'))
    def get(self,request):
        return render(request, "toDO.html")

# function to load login page
class Loginpageview(View):
    def get(self,request):
        return render(request,"pages-login.html")

# function to load signup page
class Signuppageview(View):
    def get(self,request):
        return render(request,"pages-register.html")

# function to load faqpage
class Faqpageview(View):
    @method_decorator(login_required(login_url='/log'))
    def get(self,request):
        fq=faq.objects.all()
        return render(request,"pages-faq.html",{"fq":fq})

# function to load profile page
class Profilepageview(View):
    @method_decorator(login_required(login_url='/log'))
    def get(self,request):
        user=request.user
        profile = user_profile3.objects.filter(user3=user).all()
        # print(user_profile3.objects.filter(user3=user).values()) 
        return render(request, "users-profile.html", {"profile": profile})

# function to load feedback page
class Feedbackpageview(View):
    @method_decorator(login_required(login_url='/log'))
    def get(self,request):
        return render(request,"feedback.html")

# function to load newsupdates page
class Newspageview(View): 
    @method_decorator(login_required(login_url='/log'))
    def get(self,request):
        # news=news_updates.objects.all().order_by('news_created')
        uname=User.objects.all()
        return render(request, 'news.html',{"uname":uname})



