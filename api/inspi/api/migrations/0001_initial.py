from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('body', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Plantilla',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('descripcion', models.TextField(blank=True, default=None, null=True)),
                ('deleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Pregunta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('descripcion', models.TextField()),
                ('requerido', models.BooleanField()),
                ('detalle', models.TextField()),
                ('deleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Programa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('fecha_inicio', models.DateField()),
                ('fecha_fin', models.DateField()),
                ('fecha_envio_paquete', models.DateField()),
                ('fecha_envio_resultados', models.DateField()),
                ('estado', models.BooleanField(default=True)),
                ('deleted', models.BooleanField(default=False)),
                ('plantilla', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.Plantilla')),
            ],
        ),
        migrations.CreateModel(
            name='Seccion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('deleted', models.BooleanField(default=False)),
                ('plantilla', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Plantilla')),
            ],
        ),
        migrations.CreateModel(
            name='TipoDeDato',
            fields=[
                ('tipo_de_dato_id', models.CharField(default='', max_length=50, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=200)),
                ('detalle', models.TextField(blank=True)),
                ('deleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.AddField(
            model_name='pregunta',
            name='seccion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Seccion'),
        ),
        migrations.AddField(
            model_name='pregunta',
            name='tipo_de_dato',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.TipoDeDato'),
        ),
    ]
