# Generated by Django 4.2.5 on 2023-10-28 11:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0004_returnedbooks_authorname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='returnedbooks',
            name='authorname',
        ),
    ]