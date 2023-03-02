# Backend

## Setup

### Install dependencies

```bash
pip install -r requirements.txt
```

### Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

### Create superuser

```bash
python manage.py createsuperuser
```

### Run server

```bash
python manage.py runserver
```

> To use the api for data extraction from license, you need to install tesseract. You can find the installation guide [here](https://tesseract-ocr.github.io/tessdoc/Home.html) 