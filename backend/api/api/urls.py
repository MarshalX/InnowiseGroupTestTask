from django.conf import settings
from django.conf.urls import url
from django.contrib import admin
from django.views.static import serve
from django.urls import path, include

from v1.urls import router as v1


urlpatterns = [
    path('api/', include(v1.urls)),
    path('api/v1/', include(v1.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]

urlpatterns += [
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
]
