from django.urls import path, include
from rest_framework import routers
from sskapp import views
from . import views
from .views import TablaClasificacionPDFView

router= routers.DefaultRouter()
router.register(r'clientesComp',views.clienteCompetitivoViewSet)
router.register(r'clientesCas', views.clienteCasualViewSet)
router.register(r'usuario', views.usuarioViewSet)
router.register(r'karts', views.kartViewSet)
router.register(r'clasificacion', views.tablaClasificacionViewSet)

urlpatterns=[
    path('', include(router.urls)),
    path('tabla-clasificacion-pdf/', TablaClasificacionPDFView.as_view(), name='tabla-clasificacion-pdf'),

]

'''  urlpatterns=[
    path('', include(router.urls)),
    path('api/v1/clasificacion/reporte/', views.ReporteClasificacion.as_view(), name='reporte_clasificacion'),
]   '''