# Generated by Django 3.2.4 on 2021-08-09 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0003_user_createdate'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='createdatetime',
            field=models.CharField(max_length=50, null=True),
        ),
    ]