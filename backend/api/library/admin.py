from django.contrib import admin

from library import models


@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Book)
class BookAdmin(admin.ModelAdmin):
    pass
