from django.shortcuts import render
from .forms import HousePriceForm, LOCATION_OPTIONS
import joblib
import numpy as np
import pandas as pd


def calculate_price(data):


    linear = joblib.load("app1/linear.sav")
    encoder = joblib.load("app1/encoder.sav")
    scaler = joblib.load("app1/scaler.sav")

    data = pd.DataFrame([data])
    encoded_location = encoder.transform(data[["Location"]]).toarray()
    location_df = pd.DataFrame(encoded_location, columns=encoder.get_feature_names_out(["Location"]))
    data = pd.concat([data.drop("Location", axis=1).reset_index(drop=True),
                      location_df.reset_index(drop=True)], axis=1)
    scaled = scaler.transform(data)
    data = pd.DataFrame(scaled, columns=data.columns, index=data.index)
    predicted_price = linear.predict(data)
    return (predicted_price[0])

def home(request):
    return render(request, 'app1/home.html')

def howtouse(request):
    return render(request, 'app1/howtouse.html')

def predict(request):
    form = HousePriceForm()
    price = None
    input_values = [0, 0, 0, 0]  # raw input values
    posted_location = ''

    if request.method == "POST":
        form = HousePriceForm(request.POST)
        if form.is_valid():
            price = calculate_price(form.cleaned_data)
            Location = request.POST.get('Location', '')
            BHK = float(request.POST.get('BHK', 0))
            Sqft = float(request.POST.get('Sqft', 0))
            Bathrooms = float(request.POST.get('Bath', 0))
            Balcony = float(request.POST.get('Balcony', 0))

            posted_location = Location

            input_values = [BHK,Sqft,Bathrooms,Balcony]

    return render(request, 'app1/predict.html', {
        'form': form,
        'price': price,
        'input_values': input_values,
        'posted_location': posted_location,
        'accuracy_score': 50,
        'location_options': LOCATION_OPTIONS
    })