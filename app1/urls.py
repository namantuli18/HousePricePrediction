from django.urls import path
from app1.views import home,predict,result

urlpatterns = [
    path('',home),
    path('predict/',predict),
    path('predict/result/',result),
    path('predict/result',result),
]
