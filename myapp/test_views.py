from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

class ViewsTestCase(TestCase):
    # def test_index_loads_properly(self):
    #     """The index page loads properly"""
    #     response = self.client.get('/log?next=/')
    #     self.assertEqual(response.status_code, 200)

    # def test_template(self):
    #     self.assertTemplateUsed(self.response, 'index.html')

    # def test_anonymous_cannot_see_page(self):
    #     response = self.client.get(reverse("home"))
    #     self.assertRedirects(response, "/accounts/login/?next=/home/")

    # def test_authenticated_user_can_see_page(self):
    #     user = User.objects.create_user("Juliana","juliana@dev.io", "some_pass")
    #     self.client.force_login(user=user)
    #     response = self.client.get(reverse("home"))
    #     self.assertEqual(response.status_code, 200)

    def test_check_username(self):
        response = self.client.get(reverse("validate_username"))
        self.assertContains(response, 'valid')
        print(response)