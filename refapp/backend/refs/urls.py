from rest_framework import routers
from .views import RefViewSet

router = routers.DefaultRouter()
router.register(r"refs", RefViewSet )

urlpatterns = router.urls