# Generated by Django 4.2.5 on 2023-10-28 14:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0005_remove_returnedbooks_authorname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='returnedbooks',
            name='returnd',
        ),
    ]
