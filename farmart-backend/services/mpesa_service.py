import base64
from datetime import datetime

import requests
from flask import current_app


class MpesaService:

    @staticmethod
    def get_access_token():
        url = (
            f"{current_app.config['MPESA_BASE_URL']}"
            "/oauth/v1/generate"
            "?grant_type=client_credentials"
        )

        response = requests.get(
            url,
            auth=(
                current_app.config["MPESA_CONSUMER_KEY"],
                current_app.config["MPESA_CONSUMER_SECRET"],
            ),
            timeout=30,
        )

        response.raise_for_status()

        return response.json()["access_token"]

    @staticmethod
    def generate_password(timestamp):
        raw_password = (
            f"{current_app.config['MPESA_SHORTCODE']}"
            f"{current_app.config['MPESA_PASSKEY']}"
            f"{timestamp}"
        )

        return base64.b64encode(
            raw_password.encode()
        ).decode()

    @staticmethod
    def stk_push(
        phone_number,
        amount,
        account_reference,
        transaction_desc,
    ):
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        access_token = MpesaService.get_access_token()
        password = MpesaService.generate_password(timestamp)

        url = (
            f"{current_app.config['MPESA_BASE_URL']}"
            "/mpesa/stkpush/v1/processrequest"
        )

        payload = {
            "BusinessShortCode": current_app.config["MPESA_SHORTCODE"],
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(amount),
            "PartyA": phone_number,
            "PartyB": current_app.config["MPESA_SHORTCODE"],
            "PhoneNumber": phone_number,
            "CallBackURL": current_app.config["MPESA_CALLBACK_URL"],
            "AccountReference": account_reference,
            "TransactionDesc": transaction_desc,
        }

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        response = requests.post(
            url,
            json=payload,
            headers=headers,
            timeout=30,
        )

        response.raise_for_status()

        return response.json()
