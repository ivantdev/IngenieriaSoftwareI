# Generated by Django 5.1.5 on 2025-03-02 03:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("occupancy", "0002_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="occupancyhistory",
            options={
                "verbose_name": "Occupancy History",
                "verbose_name_plural": "Occupancy History",
            },
        ),
    ]
