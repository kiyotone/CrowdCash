from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(LoanRequest)
admin.site.register(Deal)
admin.site.register(KYC)