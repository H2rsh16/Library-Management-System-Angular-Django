# Generated by Django 4.2.5 on 2023-10-29 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0006_remove_returnedbooks_returnd'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='ishueedbooks',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='returnedbooks',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
