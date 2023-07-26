from django.urls import path
from .import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    # page load only-----------------
    # path('',views.logi,name="login"),
    path('',views.index,name="home"),
    path('todotask',views.todo,name="todo"),
    path('log',views.logi,name="logi"),
    path('sign',views.signup,name="signup"),
    path('uprofile',views.profile,name="uprofile"),
    path('newsup',views.news,name="news"),
    path('feedb',views.feedb,name="feed"),
    path('faqs',views.faqs,name="faq"),
    
    # login and signups---------------
    path('login',views.login_view,name="login"),
    path('logout',views.logout_view,name="logout"),
    path('signup',views.signup_view,name="signup"),
    path('unamecheck',views.checkuname,name="validate_username"),

    # profile page--------------------
    path('profile',views.profile_view,name="profile"),
    path('changepass',views.change_pass,name="changepass"),
    path('profile_data_get/', views.profile_data, name='data_list'),
    path('notif', views.notifications, name='notification'),
    path('deleteim/', views.delete_image, name='delete_image'),

    # todo page-----------------------
    path('data/create/', views.create_task, name='data_create'),
    path('data_task_view/', views.task_list, name='data_list'),
    path('data/delete/<int:pk>/', views.delete_task, name='data_delete'),
    path('data/update/<int:pk>/', views.update_task, name='data_update'),

    # feedback------------------------
    path('feed/',views.feed,name="feed"),

    # news updates page---------------
    path('create_news/',views.news_up,name="newscreation"),
    path('search_sort_data/',views.search_sort_gennews,name="sortnews"),
    path('search_sort_feat/',views.search_sort_featnews,name="sortfeatnews"),

    # dashboard-----------------------
    path('sort_news_dash/',views.dash_news,name="dashnews"),
    path('sort_task_num/',views.dash_task_num,name="dashnum"),
    path('sort_task_fin/',views.dash_task_fin,name="dashfin"),
    path('sort_task_pen/',views.dash_task_pen,name="dashpen"),
    path('sort_task_prog/',views.dash_task_prog,name="dashprog"),
    path('sort_task_table/',views.dash_task_table,name="dashtaskview"),
    path('sort_activity/',views.activity_log,name="recentactivity"),
    
    # announcement---------------------
    path('add_announce/',views.user_announce,name="announce"),
    path('view_announce/',views.announce_notif_view,name="announceview"),
    path('send_view_announce/',views.announce_send_view,name="announcesendview"),
    path('recieve_view_announce/',views.announce_recieve_view,name="announcerecieveview"),




]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




