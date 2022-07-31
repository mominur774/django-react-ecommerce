from re import I
from django.urls import path
from product.api.v1 import views

app_name = 'products'

urlpatterns = [
    path('product-list/', views.ProductList.as_view(), name="product-list"),
    path('product-details/<str:slug>/',
         views.ProductDetails.as_view(), name="product-details"),
    path('add-to-cart/', views.AddToCart.as_view(), name="add-to-cart"),
    path('decrease/', views.DecreaseQuentity.as_view(), name="decrease"),
    path('cart-details/<int:pk>/', views.CartDetails.as_view(), name="cart-details"),
    path('cart-list/', views.CartListView.as_view(), name="cart-list"),
]
