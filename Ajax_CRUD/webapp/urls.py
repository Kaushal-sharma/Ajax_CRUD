from django.urls import path
from webapp import views

urlpatterns=[
    path('home/', views.home, name='home'),
    path('save/', views.save_data, name='save'),
    path('edit/', views.edit_data, name="edit"),
    path('delete/', views.delete_data, name='delete'),
]