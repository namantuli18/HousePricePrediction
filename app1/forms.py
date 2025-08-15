from django import forms

class HousePriceForm(forms.Form):

    Income = forms.FloatField(label="Income", min_value=1,widget=forms.NumberInput(attrs={
            'placeholder': 'Enter Income',
            'class': 'input-field',
            'min': '1'
        }))
    HouseAge = forms.FloatField(label="House Age", min_value=1, widget=forms.NumberInput(attrs={
        'placeholder': 'Enter House Age',
        'class': 'input-field',
        'min': '1'
    }))
    Number_of_Rooms = forms.FloatField(label="rooms", min_value=1, widget=forms.NumberInput(attrs={
        'placeholder': 'Enter number of rooms',
        'class': 'input-field',
        'min': '1'
    }))
    Number_of_Bedrooms = forms.FloatField(label="Bedrooms", min_value=1, widget=forms.NumberInput(attrs={
        'placeholder': 'Enter number of bedrooms',
        'class': 'input-field',
        'min': '1'
    }))
    AreaPopulation = forms.FloatField(label="population", min_value=1, widget=forms.NumberInput(attrs={
        'placeholder': 'Enter population',
        'class': 'input-field',
        'min': '1'
    }))

    Address = forms.CharField(label="Location", max_length=100, widget=forms.TextInput(attrs={
        'placeholder': 'Enter address',
        'class': 'input-field'
    }))