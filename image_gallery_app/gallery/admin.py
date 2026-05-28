from django.contrib import admin
from .models import GalleryImage, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'order', 'created_at']
    list_editable = ['order']
    list_filter = ['category']
    search_fields = ['title', 'description']
