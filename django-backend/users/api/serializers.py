from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _


from rest_framework import serializers

from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from rest_auth.serializers import PasswordResetSerializer


# It's customizable for both UID/TOKEN and URL
from django.contrib.auth.forms import PasswordResetForm
# from allauth.account.forms import ResetPasswordForm # Allauth's which provide only alluth urls to reset password

from users.models import User


class RESTPasswordSerializer(PasswordResetSerializer):
    # solved reset password error
    # password_reset_form_class = ResetPasswordForm # Only URL to reset password
    # counter part of django which provide UID/TOKEN even URL, which is customizeable
    password_reset_form_class = PasswordResetForm


class RESTSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        help_text='Leave empty if no change needed',
        style={'input_type': 'password', 'placeholder': 'Password'}
    )

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password')

    def validate_email(self, email):
        # DRF convention to validate fields
        """
            More details can be found here:
            from allauth.account import app_settings as account_settings
            from allauth.account.models import EmailAddress
        """
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("This e-mail address already asigned for another users."))
        return email

    def validated_full_name(self, full_name):
        # write here validation for full_name that solve your case
        return full_name

    def create(self, validated_data):
        # Create record in User table
        instance = self.Meta.model(
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            username=generate_unique_username(
                [
                    validated_data.get('first_name'),
                    validated_data.get('last_name'),
                    validated_data.get('email'),
                ]
            ),
            # user_type = 'author' # Place more built-in or custom fields there: is_staff=True etc
        )
        instance.set_password(validated_data.get('password'))
        instance.save()
        request = request = self.context.get('request')
        setup_user_email(request, instance, [])
        return instance

    def save(self, request=None):
        # Must override it to save the request data by rest_auth
        return super().save()


class CustomUserDetailSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = User
        fields = (
            'pk',
            'email',
            'first_name',
            'last_name',
            'email',
            'avatar',
        )
