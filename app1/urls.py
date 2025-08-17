from django.urls import path
from app1.views import home,howtouse,predict

urlpatterns = [
    path('',home,name='home'),
    path('howtouse/', howtouse,name='howtouse'),
    path('predict/',predict,name='predict'),

]