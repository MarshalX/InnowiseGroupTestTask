from django.conf import settings
from django.conf.urls import url
from django.contrib import admin
from django.views.static import serve
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('library.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
        url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    ]
