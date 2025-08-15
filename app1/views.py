from django.shortcuts import render
from .forms import HousePriceForm

def calculate_price(data):
    import joblib
    import numpy as np
    import pandas as pd

    # Load model and encoder
    model = joblib.load("app1/model.sav")
    encoder = joblib.load("app1/encoder.sav")  # OneHotEncoder trained on 'Address' with handle_unknown='ignore'

    input_df = pd.DataFrame([data])
    encoded_address = encoder.transform(input_df[['Address']]).toarray()

    # If needed, convert back to DataFrame and join with other features
    encoded_df = pd.DataFrame(encoded_address, columns=encoder.get_feature_names_out(['Address']))
    final_input = pd.concat([input_df.drop('Address', axis=1), encoded_df], axis=1)

    predicted_price = model.predict(final_input)
    return predicted_price[0].item()


def home(request):
    return render(request, 'app1/home.html')

def howtouse(request):
    return render(request, 'app1/howtouse.html')

def predict(request):
    form = HousePriceForm()
    price = None
    input_values = [0, 0, 0, 0, 0]  # raw input values
    posted_address = ''

    if request.method == "POST":
        form = HousePriceForm(request.POST)
        if form.is_valid():
            price = calculate_price(form.cleaned_data)
            income = float(request.POST.get('Income', 0))
            house_age = float(request.POST.get('HouseAge', 0))
            rooms = float(request.POST.get('Number_of_Rooms', 0))
            bedrooms = float(request.POST.get('Number_of_Bedrooms', 0))
            population = float(request.POST.get('Population', 0))
            posted_address = request.POST.get('Address', '')

            input_values = [house_age, rooms, bedrooms, income,population]

    return render(request, 'app1/predict.html', {
        'form': form,
        'price': price,
        'input_values': input_values,
        'posted_address': posted_address,
        'accuracy_score': 91.798
    })