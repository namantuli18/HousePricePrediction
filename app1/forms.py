from django import forms

import pandas as pd

# Load dataset
df = pd.read_csv(r'C:\Users\vvans\Downloads\House_Price_Bangalore.csv')
LOCATION_OPTIONS = sorted(df['Location'].dropna().unique())

class HousePriceForm(forms.Form):
    Location= forms.CharField(label="Location",widget=forms.TextInput(attrs={
            'list': 'locationOptions',
            'placeholder': 'Enter location',
            'class': 'input-field',
        }))
    BHK = forms.FloatField(label="BHK", widget=forms.NumberInput(attrs={
        'placeholder': 'Enter BHK',
        'class': 'input-field',

    }))
    Sqft = forms.FloatField(label="Sqft", widget=forms.NumberInput(attrs={
        'placeholder': 'Enter sqft',
        'class': 'input-field',

    }))
    Bath = forms.FloatField(label="Bathrooms",  widget=forms.NumberInput(attrs={
        'placeholder': 'Enter number of bathrooms',
        'class': 'input-field',

    }))
    Balcony = forms.FloatField(label="Balcony", widget=forms.NumberInput(attrs={
        'placeholder': 'Enter number of balcony',
        'class': 'input-field',

    }))