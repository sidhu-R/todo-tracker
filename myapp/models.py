from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User=get_user_model()

# user profile model
class user_profile3(models.Model):
    user3=models.ForeignKey(User,on_delete=models.CASCADE,blank=True)
    name3=models.CharField(max_length=100)
    image3=models.ImageField(upload_to='userprofile',blank=True)
    about3=models.CharField(max_length=400,blank=True)
    company3=models.CharField(max_length=100,blank=True)
    job3=models.CharField(max_length=50,blank=True)
    country3=models.CharField(max_length=20,blank=True)
    adress3=models.CharField(max_length=300,blank=True)
    phone3=models.CharField(max_length=30,blank=True)
    email3=models.CharField(max_length=30,blank=True)
    twitter3=models.CharField(max_length=30,blank=True)
    facebook3=models.CharField(max_length=30,blank=True)
    instagram3=models.CharField(max_length=30,blank=True)
    linkdin3=models.CharField(max_length=30,blank=True)
    notif_acc3=models.BooleanField('notif',default=False)

    def __str__(self):
        return self.name3


# tasks model
class task1(models.Model):
    STATUS_CHOICES=[
        ('Pending',"Pending"),
        ('In Progress',"In Progress"),
        ('Finished',"Finished")
    ]

    PRIORITY_CHOICES=[
        ('High',"High"),
        ('Medium',"Medium"),
        ('Low',"Low")
    ]

    user1=models.ForeignKey(User,on_delete=models.CASCADE,blank=True)
    task_title1=models.CharField(max_length=50)
    task_desc1=models.CharField(max_length=150)
    task_priority1=models.CharField(max_length=20,choices=PRIORITY_CHOICES)
    task_status1=models.CharField(max_length=20,choices=STATUS_CHOICES)
    task_due1=models.DateField()
    # ----------------------------------------------------
    task_created_date=models.DateTimeField(auto_now=True)
    # ----------------------------------------------------

    task_created=models.DateTimeField(auto_now_add=True)
    task_updated=models.DateTimeField(auto_now=True)
    task_activation=models.CharField(max_length=30,blank=True,null=True)

    def __str__(self):
        return  self.task_title1


# faq model
class faq(models.Model):
    question=models.CharField(max_length=300)
    answer=models.CharField(max_length=300)
    def __str__(self):
        return 'question'+" "+ str(self.id)


# feedback model
class feedback(models.Model):
    first_name=models.CharField(max_length=30)
    feed_desc=models.CharField(max_length=350)
    country=models.CharField(max_length=30)
    mail=models.EmailField()

    def __str__(self):
        return self.first_name
    

# news and updates model
class news_updates(models.Model):
    CATAGORY_CHOICES=[
        ('General',"General"),
        ('Featured',"Featured")
    ]
    user=models.ForeignKey(User,on_delete=models.CASCADE,blank=True)
    news_title=models.CharField(max_length=100)
    news_desc=models.CharField(max_length=500)
    news_img=models.ImageField(upload_to='news',blank=True)
    news_created=models.DateTimeField(auto_now=True)
    news_catagory=models.CharField(max_length=30,choices=CATAGORY_CHOICES)
    def __str__(self):
        return self.news_title

# Announcement model
class Announce(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,blank=True)
    ann_title=models.CharField(max_length=200)
    ann_desc=models.CharField(max_length=300)
    ann_created=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.ann_title

# Activity model
class Activity(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    activity_done=models.CharField(max_length=200)
    activity_date=models.DateField(auto_now_add=True)
    activity_time=models.TimeField(auto_now_add=True)
    def __str__(self):
        return str(self.user)