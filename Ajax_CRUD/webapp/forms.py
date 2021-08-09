from django import forms
from django.forms import widgets
from webapp.models import User

class StudentRegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'email']
        widgets = {
            'name':forms.TextInput(attrs={'class':'form-control form-control-sm', 'id':'nameid'}),
            'email':forms.EmailInput(attrs={'class':'form-control form-control-sm', 'id':'emailid'}),
            #'password':forms.PasswordInput(attrs={'class':'form-control form-control-sm', 'id':'passwordid'}),
        }
