# Generated by Django 4.2.5 on 2023-10-16 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='bookname',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
