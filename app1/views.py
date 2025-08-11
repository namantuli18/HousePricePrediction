from django.shortcuts import render

def home(request):
    return render(request,'app1/home.html')

def predict(request):
    return render(request,'app1/predict.html')# Create your views here.

def result(request):

    if request.method =='POST':

        import numpy as np
        import joblib

        model = joblib.load("app1/models.sav")

        var1 = float(request.POST['n1'])
        var2 = float(request.POST['n2'])
        var3 = float(request.POST['n3'])
        var4 = float(request.POST['n4'])
        var5 = float(request.POST['n5'])
        var6 = str(request.POST['n6'])


        prediction = model.predict(np.array([[var1,var2,var3,var4,var5]]))
        prediction = (prediction[0])

    return render(request,'app1/predict.html',context={"result":prediction })