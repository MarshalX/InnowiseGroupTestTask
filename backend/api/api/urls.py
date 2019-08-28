from django.conf import settings
from django.conf.urls import url
from django.contrib import admin
from django.views.static import serve
from django.urls import path, include

from v1.urls import v1


urlpatterns = [
    path('api/', include(v1)),
    path('api/v1/', include(v1)),
    path('admin/', admin.site.urls),

    path('api/', include('djoser.urls.authtoken')),
    path('api-auth/', include('rest_framework.urls')),
]

urlpatterns += [
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
