# Generated by Django 4.2.5 on 2023-10-25 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0002_alter_books_bookname'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReturnedBooks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bookname', models.CharField(max_length=255)),
                ('studentname', models.CharField(max_length=255)),
                ('ishueed', models.CharField(max_length=255)),
                ('returnd', models.CharField(max_length=255)),
            ],
        ),
    ]
