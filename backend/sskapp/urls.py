from django.urls import path, include
from rest_framework import routers
from sskapp import views
from . import views
from .views import TablaClasificacionPDFView, ClientesPDFView, TotalClientesRecurrentesPDFView

router= routers.DefaultRouter()
router.register(r'clientesComp',views.clienteCompetitivoViewSet)
router.register(r'clientesCas', views.clienteCasualViewSet)
router.register(r'usuario', views.usuarioViewSet)
router.register(r'karts', views.kartViewSet)
router.register(r'clasificacion', views.tablaClasificacionViewSet)

urlpatterns=[
    path('', include(router.urls)),
    path('tabla-clasificacion-pdf/', TablaClasificacionPDFView.as_view(), name='tabla-clasificacion-pdf'),
    path('clientes-pdf/', ClientesPDFView.as_view(), name='clientes_pdf'),
    path('total-clientes-recurrentes/<int:year>/', TotalClientesRecurrentesPDFView.as_view(), name='total_clientes_recurrentes_por_ano'),
]

'''  urlpatterns=[
    path('', include(router.urls)),
    path('api/v1/clasificacion/reporte/', views.ReporteClasificacion.as_view(), name='reporte_clasificacion'),
]   '''