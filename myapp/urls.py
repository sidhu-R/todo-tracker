from django.urls import path
from .import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    # page load only-----------------
    # path('',views.logi,name="login"),
    path('',views.Indexpageview.as_view(),name="home"),
    path('log',views.Loginpageview.as_view(),name="logi"),
    path('sign',views.Signuppageview.as_view(),name="signup"),
    path('uprofile',views.Profilepageview.as_view(),name="uprofile"),
    path('todoproject',views.Projectpageview.as_view(),name="todo"),
    path('newsup',views.Newspageview.as_view(),name="news"),
    path('feedb',views.Feedbackpageview.as_view(),name="feed"),
    path('faqs',views.Faqpageview.as_view(),name="faq"),
    
    # login and signups---------------
    path('login',views.Loginview.as_view(),name="login"),
    path('logout',views.Logoutview.as_view(),name="logout"),
    path('signup',views.Signupview.as_view(),name="signup"),
    path('unamecheck',views.Checkusername.as_view(),name="validate_username"),

    # profile page--------------------
    path('profile',views.Profiledataview.as_view(),name="profile"),
    path('changepass',views.Changepassview.as_view(),name="changepass"),
    # path('profile_data_get/', views.profile_data, name='data_list'),
    path('notif', views.Notificationview.as_view(), name='notification'),
    path('deleteim/', views.Deleteimageview.as_view(), name='delete_image'),

    # todo page-----------------------
    path('todotask/<int:pk>/',views.Taskpageview.as_view(),name="todotask"),
    path('data/create/', views.Createtaskview.as_view(), name='data_create'),
    path('data_task_view/', views.Tasklistview.as_view(), name='data_list'),
    path('data/delete/<int:pk>/', views.Deactivatetaskview.as_view(), name='data_delete'),
    path('data/update/<int:pk>/', views.Updatetaskview.as_view(), name='data_update'),
    path('data/deactive', views.Deactivetasklistview.as_view(), name='deactivelist'),

    # project page--------------------
    path('data_project_view/',views.Projectdataview.as_view(), name='project_list'),
    path('project_create_view',views.CreateProject.as_view(), name='create_project'),
    path('project_update/<int:pk>/',views.UpdateProjectView.as_view(), name='project_update'),
    path('project_delete/<int:pk>/', views.Deactivateprojectview.as_view(), name='project_delete'),

    # List page-----------------------
    path('managelist/<int:pk>/',views.Listpageview.as_view(),name='managelist'),
    path('create_list/',views.CreateList.as_view(),name='createlist'),
    path('view_projectlistdata/',views.listdataview.as_view(),name='viewprojectlist'),
    path('list_update/<int:pk>/',views.UpdateListView.as_view(), name='List_update'),
    path('list_deactivate/<int:pk>/', views.DeactivateListview.as_view(), name='list_delete'),

    # Issue page----------------------
    path('issuepage/<int:pk>/',views.Issuepageview.as_view(),name='issuepage'),
    path('create_issue/',views.CreateIssue.as_view(),name='createissue'),
    path('view_issuepagedata/',views.Issuedataview.as_view(),name='viewissuelist'),
    path('issue_deactivate/<int:pk>/', views.DeactivateIssueview.as_view(), name='issue_delete'),

    # Issue detail page--------------
    path('issuedetailpage/<int:pk>/',views.IssueDetailpageview.as_view(),name='issuedetailpage'),
    path('view_issuedetailpagedata/',views.IssueDetaildataview.as_view(),name='viewissuedetaillist'),
    path('issue_update/<int:pk>/',views.UpdateIssueView.as_view(), name='Issue_update'),
    path('issue_attachement/',views.Issueattachmentview.as_view(), name='Issue_attachview'),
    path('add_issue_attachement/',views.CreateAttachementview.as_view(), name='Issue_add_attachview'),


    # feedback------------------------
    path('feed/',views.Feedbackview.as_view(),name="feed"),

    # news updates page---------------
    path('create_news/',views.Createnewsview.as_view(),name="newscreation"),
    path('search_sort_data/',views.Generalnewssortview.as_view(),name="sortnews"),
    path('search_sort_feat/',views.Featurenewssortview.as_view(),name="sortfeatnews"),

    # dashboard-----------------------
    path('sort_news_dash/',views.Dashnewsfilterview.as_view(),name="dashnews"),
    path('sort_task_num/',views.Dashtasknumview.as_view(),name="dashnum"),
    path('sort_task_fin/',views.Dashtaskfinishedview.as_view(),name="dashfin"),
    path('sort_task_pen/',views.Dashtaskpendingview.as_view(),name="dashpen"),
    path('sort_task_prog/',views.Dashtaskprogressview.as_view(),name="dashprog"),
    path('sort_task_table/',views.Dashtasktableview.as_view(),name="dashtaskview"),
    path('sort_activity/',views.Dashactvitylogview.as_view(),name="recentactivity"),
    
    # announcement---------------------
    path('add_announce/',views.Announcementcreateview.as_view(),name="announce"),
    path('view_announce/',views.AnnounceNotifbarview.as_view(),name="announceview"),
    path('send_view_announce/',views.AnnouceSendview.as_view(),name="announcesendview"),
    path('recieve_view_announce/',views.AnnounceRecieveview.as_view(),name="announcerecieveview"),




]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




