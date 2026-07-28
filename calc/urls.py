# calc/urls.py
from django.urls import path
from . import views

app_name = 'calc'

urlpatterns = [
    path('', views.home, name='home'),                    # 홈
    path('infusion/', views.infusion_view, name='infusion'),  # 수액 계산
    path('drug/', views.drug_view, name='drug'),              # 약물 계산(추후)
    path('formulas/', views.formulas_view, name='formulas'),  # 공식 모음(추후)
    path('ivtime/', views.ivtime_view, name='ivtime'),  # iv_time
    

]
