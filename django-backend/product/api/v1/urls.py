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
    path('cart-delete/<int:pk>/', views.DeleteCartView.as_view(), name="cart-delete"),
    path('add-to-favorite/', views.AddToFavorite.as_view(), name="add-to-favorite"),
    path('favorite-list/', views.FavoriteList.as_view(), name="favorite-list"),
    path('favorite-delete/<int:pk>/',
         views.DeleteFavoriteView.as_view(), name="favorite-delete"),
]
