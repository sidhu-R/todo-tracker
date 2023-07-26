from django.test import TestCase
from .models import faq,feedback,Activity
from datetime import datetime
from django.contrib.auth.models import User
from datetime import datetime
class TestModels(TestCase):
    
    # def test_faq_model(self):
    #     """test faq model"""
    #     event = faq.objects.create(
    #         question="Some title",
    #         answer="ishcisn",

    #     )
    #     self.assertEqual(str(event), "question 1")

    # def test_feedback_model(self):
    #     """test feedback model"""
    #     event = feedback.objects.create(
    #         first_name="name",
    #         feed_desc="ishcisn",
    #         country="india",
    #         mail="dniusdias@gmail.com"
    #     )
    #     self.assertEqual(str(event), "name")


    # def test_activity_model(self):
    #     """test activity model"""
    #     today=datetime.today()
    #     event = Activity.objects.create(
    #         user = User.objects.create_user("admin","admin@dev.io", "some_pass"),
    #         activity_done="some activity",
    #         activity_date=today
    #     )
    #     self.assertEqual(str(event), "admin")
    
    pass