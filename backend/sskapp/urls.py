from django.urls import path, include
from rest_framework import routers
from sskapp import views
from . import views

router= routers.DefaultRouter()
router.register(r'clientesComp',views.clienteCompetitivoViewSet)
router.register(r'clientesCas', views.clienteCasualViewSet)
router.register(r'usuario', views.usuarioViewSet)
router.register(r'karts', views.kartViewSet)
router.register(r'clasificacion', views.tablaClasificacionViewSet)

urlpatterns=[
    path('', include(router.urls)),
    path('api/v1/clasificacion/reporte/', views.ReporteClasificacion.as_view(), name='reporte_clasificacion')

]

'''  urlpatterns=[
    path('', include(router.urls)),
    path('api/v1/clasificacion/reporte/', views.ReporteClasificacion.as_view(), name='reporte_clasificacion'),
]   '''