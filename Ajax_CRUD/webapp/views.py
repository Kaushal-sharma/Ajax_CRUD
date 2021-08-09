from django.http import request
from webapp.forms import StudentRegistrationForm
from django.http.response import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, HttpResponse
from webapp.models import User
from datetime import *

def home(request):
    form = StudentRegistrationForm()
    record = User.objects.all().order_by('-id')
    return render(request, 'webapp/home.html', {'form':form, 'record':record})

# Save Form Data
def save_data(request):
    if request.method == 'POST':
        form = StudentRegistrationForm(request.POST)
        if form.is_valid():
            fm_id = request.POST.get('id')
            fm_nm = request.POST['name'].title()
            fm_em = request.POST['email']

            if fm_id == '':
                td = datetime.now()
                cdt = td.strftime("%b %d %Y, %I:%M %p")
                usr = User(name=fm_nm, email=fm_em, createdatetime=cdt)
                msg = 1
            else:
                usr = User(id=fm_id, name=fm_nm, email=fm_em)
                msg = 0
            usr.save()
            take_data = User.objects.values().order_by('-id')
            user_data = list(take_data)         
            length = len(user_data)
                       
        return JsonResponse({'status':1, 'user_data':user_data, 'msg':msg, 'length':length})
    else:
        return JsonResponse({'status':0})


# Edit data
def edit_data(request):
    if request.method == 'POST':
        user_id = request.POST.get('id')
        user = User.objects.get(pk=user_id)
        fields = {'id':user.id, 'name':user.name, 'email':user.email}
        return JsonResponse({'status':1, 'fields':fields})
    else:
        return JsonResponse({'status':0})


# Delete Data 
def delete_data(request):
    if request.method == 'POST':
        user_id = request.POST.get('id')
        delete_one_record = User.objects.get(pk=user_id)
        delete_one_record.delete()
        take_data = User.objects.values().order_by('-id')
        user_data = list(take_data)
        length = len(user_data)
        return JsonResponse({'status':1})
    else:
        return JsonResponse({'status':0})
