from django.urls import path

from . import views

urlpatterns = [
    path("new/", views.upload_pdf),
    path("get_promt/", views.get_promt),
]
