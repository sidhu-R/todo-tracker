from django.urls import path
from .import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    # main pages load only-----------
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

    # task page-----------------------
    path('todotask/<int:pk>/',views.Taskpageview.as_view(),name="todotask"),
    path('data/create/', views.Createtaskview.as_view(), name='data_create'),
    path('data_task_view/', views.Tasklistview.as_view(), name='data_list'),
    path('data/delete/<int:pk>/', views.Deactivatetaskview.as_view(), name='data_delete'),
    path('data/update/<int:pk>/', views.Updatetaskview.as_view(), name='data_update'),
    path('data/deactive', views.Deactivetasklistview.as_view(), name='deactivelist'),

    # task detail page----------------
    path('taskdetails/<int:pk>/',views.TaskDetailpageview.as_view(),name='taskDetail'),
    path('viewtaskdetailpage_data/',views.TaskDetaildataview.as_view(),name='taskDatadetail'),
    path('add_task_attachement/',views.CreateTaskAttachementview.as_view(), name='task_add_attach'),
    path('task_attachement/',views.Taskattachmentview.as_view(), name='Task_attachview'),
    path('subtask_data/',views.Subtaskdataview.as_view(), name='subtask_view'),
    path('add_subtask/',views.CreateSubtaskview.as_view(), name='subtask_add'),
    path('subtask_update/<int:pk>/',views.UpdateSubtaskview.as_view(), name='Subtask_update'),
    path('task_atatch_dlt/<int:pk>/', views.Deeletetaskattachview.as_view(), name='task_attach_delete'),
    
    # project page--------------------
    path('data_project_view/',views.Projectdataview.as_view(), name='project_list'),
    path('project_create_view',views.CreateProject.as_view(), name='create_project'),
    path('project_update/<int:pk>/',views.UpdateProjectView.as_view(), name='project_update'),
    path('project_delete/<int:pk>/', views.Deactivateprojectview.as_view(), name='project_delete'),
    path('view_deactiveproject/', views.Deactiveprojectshowview.as_view(), name='project_deactivelist'),
    path('upload_project/',views.UploadProject.as_view(),name='Uploadproject'),

    # List page-----------------------
    path('managelist/<int:pk>/',views.Listpageview.as_view(),name='managelist'),
    path('create_list/',views.CreateList.as_view(),name='createlist'),
    path('view_projectlistdata/',views.listdataview.as_view(),name='viewprojectlist'),
    path('list_update/<int:pk>/',views.UpdateListView.as_view(), name='List_update'),
    path('list_deactivate/<int:pk>/', views.DeactivateListview.as_view(), name='list_delete'),

    # list page project details-------
    path('assignee_add',views.assigneeaddview.as_view(),name="addassignee"),
    path('project_detail/<int:pk>/',views.ProjectDetailview.as_view(),name="projectdetails"),
    path('assigneetask/<int:pk>/',views.assigneetaskview.as_view(),name='getassigneetask'),
    path('assignee_dlt',views.assigneedltview.as_view(),name='assigneedlt'),


    # Issue page----------------------
    path('issuepage/<int:pk>/',views.Issuepageview.as_view(),name='issuepage'),
    path('create_issue/',views.CreateIssue.as_view(),name='createissue'),
    path('view_issuepagedata/',views.Issuedataview.as_view(),name='viewissuelist'),
    path('issue_update/<int:pk>/',views.UpdateIssueView.as_view(), name='Issue_update'),
    path('issue_deactivate/<int:pk>/', views.DeactivateIssueview.as_view(), name='issue_delete'),
    path('view_deactiveissues/', views.Deactiveissuelistview.as_view(), name='issue_deactivelist'),

    # Issue detail page--------------
    path('issuedetailpage/<int:pk>/',views.IssueDetailpageview.as_view(),name='issuedetailpage'),
    path('view_issuedetailpagedata/',views.IssueDetaildataview.as_view(),name='viewissuedetaillist'),
    path('issue_attachement/',views.Issueattachmentview.as_view(), name='Issue_attachview'),
    path('add_issue_attachement/',views.CreateIssueAttachementview.as_view(), name='Issue_add_attachview'),
    path('issue_atatch_dlt/<int:pk>/', views.Deeleteissueattachview.as_view(), name='issue_attach_delete'),

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
    path('sort_issue_num/',views.Dashissuescountview.as_view(),name="issuenum"),


    # Dashboard project---------------
    path('sort_project_table/',views.Dashprojecttableview.as_view(),name="dashprojectview"),
    path('sort_project_num/',views.Dashprojectnumview.as_view(),name="projectnum"),
    path('sort_project_com/',views.Dashprojectcompletednum.as_view(),name="projectcompleted"),
    path('sort_project_hold/',views.Dashprojectonholdnum.as_view(),name="projectonhold"),
    path('sort_project_pending/',views.Dashprojectpendingnum.as_view(),name="projectpending"),
    path('sort_project_cancelled/',views.Dashprojectcancellnum.as_view(),name="projectcancelled"),
    path('project_popup/',views.Dashprojectpopupsview.as_view(),name='projectpopup'),

    # Dashboard issues---------------
    path('sort_issue_table/',views.Dashissuetableview.as_view(),name="dashissueview"),
    path('sort_issue_num/',views.Dashissuescountview.as_view(),name="issuenum"),
    path('sort_issue_open/',views.Dashissueopenview.as_view(),name="issueopennum"),
    path('sort_issue_inprogess/',views.Dashissueinprogressview.as_view(),name="issueinprogressnum"),
    path('sort_issue_resolved/',views.Dashissueresolvedview.as_view(),name="issueresolvednum"),

    # announcement---------------------
    path('add_announce/',views.Announcementcreateview.as_view(),name="announce"),
    path('view_announce/',views.AnnounceNotifbarview.as_view(),name="announceview"),
    path('send_view_announce/',views.AnnouceSendview.as_view(),name="announcesendview"),
    path('recieve_view_announce/',views.AnnounceRecieveview.as_view(),name="announcerecieveview"),



]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




