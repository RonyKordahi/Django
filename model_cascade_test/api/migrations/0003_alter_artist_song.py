# Generated by Django 4.2.3 on 2023-07-19 15:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_artist_song'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artist',
            name='song',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.song'),
        ),
    ]