import mimetypes
import smtplib
from email.message import EmailMessage
from pathlib import Path

from config import Config


LOGO_PATH = (
    Path(__file__).resolve().parent.parent
    / "assets"
    / "farmart_full_logo_testing.png"
)


def send_email(
    to_email,
    subject,
    text_body,
    html_body,
):
    """
    Send a professional HTML email through
    the Farmart Gmail SMTP account.

    The Farmart logo is embedded directly
    into the email using Content-ID.
    """

    message = EmailMessage()


    message["From"] = (
        f"{Config.MAIL_FROM_NAME} "
        f"<{Config.MAIL_FROM_ADDRESS}>"
    )

    message["To"] = to_email
    message["Subject"] = subject

    message.set_content(text_body)

    message.add_alternative(
        html_body,
        subtype="html",
    )

    # Embed Farmart logo
    if LOGO_PATH.exists():

        image_data = LOGO_PATH.read_bytes()

        mime_type, _ = mimetypes.guess_type(
            LOGO_PATH.name
        )

        if mime_type:
            maintype, subtype = mime_type.split(
                "/",
                1,
            )
        else:
            maintype = "image"
            subtype = "png"

        message.get_payload()[1].add_related(
            image_data,
            maintype=maintype,
            subtype=subtype,
            cid="<farmart_logo>",
        )

    with smtplib.SMTP(
        Config.SMTP_SERVER,
        Config.SMTP_PORT,
    ) as smtp:

        if Config.SMTP_USE_TLS:
            smtp.starttls()

        smtp.login(
            Config.SMTP_USERNAME,
            Config.SMTP_PASSWORD,
        )

        smtp.send_message(message)

    return True

def _email_template(
    title,
    body,
    button_text=None,
    button_url=None,
):
    """
    Build the common Farmart email layout.
    """

    button = ""

    if button_text and button_url:
        button = f"""
        <div style="margin: 30px 0;">
            <a
                href="{button_url}"
                style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #2f6d3f;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 14px;
                "
            >
                {button_text}
            </a>
        </div>
        """

    return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
</head>

<body style="
    margin: 0;
    padding: 40px 20px;
    background-color: #f4f7f5;
    font-family: Arial, Helvetica, sans-serif;
">

    <div style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 4px 18px rgba(22, 52, 32, 0.08);
    ">

        <div style="
            padding: 32px 30px 20px;
            text-align: center;
            border-bottom: 1px solid #e3ebe5;
        ">

            <img
                src="cid:farmart_logo"
                alt="Farmart"
                width="190"
                style="
                    display: block;
                    width: 190px;
                    max-width: 80%;
                    height: auto;
                    margin: 0 auto;
                    border: 0;
                "
            >

        </div>

        <div style="
            padding: 35px 32px;
            color: #26392c;
        ">

            <h1 style="
                margin: 0 0 20px;
                color: #163420;
                font-size: 25px;
                line-height: 1.3;
            ">
                {title}
            </h1>

            {body}

            {button}

        </div>

        <div style="
            padding: 20px 30px;
            background-color: #f4f7f5;
            text-align: center;
            color: #718078;
            font-size: 12px;
            line-height: 1.6;
        ">

            <strong style="color: #31523d;">
                Farmart
            </strong>

            <br>

            Livestock and farm produce,
            straight from the farm.

        </div>

    </div>

</body>
</html>
"""

def send_farmer_application_received(
    farmer_name,
    farmer_email,
):
    """
    Tell a farmer that their application
    has been received and is awaiting review.
    """

    subject = "Farmart farmer application received"

    text_body = f"""
Hello {farmer_name},

Your Farmart farmer application has been
successfully received.

Our administrators will review your application.
You will receive another email when a decision
has been made.

Thank you for choosing Farmart.

Farmart
Livestock and farm produce, straight from the farm.
"""

    html_body = _email_template(
        title="Application received",
        body=f"""
        <p>
            Hello <strong>{farmer_name}</strong>,
        </p>

        <p>
            Your Farmart farmer application has
            been successfully received.
        </p>

        <p>
            Our administrators will review your
            application. You will receive another
            email when a decision has been made.
        </p>

        <p>
            Thank you for choosing Farmart.
        </p>
        """,
    )

    return send_email(
        to_email=farmer_email,
        subject=subject,
        text_body=text_body,
        html_body=html_body,
    )

def send_farmer_approved(
    farmer_name,
    farmer_email,
):
    """
    Tell a farmer that their application
    has been approved.
    """

    subject = "Your Farmart farmer account is approved"

    text_body = f"""
Hello {farmer_name},

Congratulations!

Your Farmart farmer application has been approved.
You can now access your farmer account and begin
using Farmart.

Welcome to Farmart.

Farmart
Livestock and farm produce, straight from the farm.
"""

    html_body = _email_template(
        title="You're approved! 🎉",
        body=f"""
        <p>
            Hello <strong>{farmer_name}</strong>,
        </p>

        <p>
            Congratulations!
        </p>

        <p>
            Your Farmart farmer application has
            been approved.
        </p>

        <p>
            You can now access your farmer account
            and begin using Farmart.
        </p>

        <p>
            Welcome to Farmart.
        </p>
        """,
    )

    return send_email(
        to_email=farmer_email,
        subject=subject,
        text_body=text_body,
        html_body=html_body,
    )

def send_farmer_rejected(
    farmer_name,
    farmer_email,
    reason,
):
    """
    Tell a farmer that their application
    has been rejected.
    """

    subject = "Update on your Farmart farmer application"

    text_body = f"""
Hello {farmer_name},

We are sorry to inform you that your Farmart
farmer application was not approved.

Reason:
{reason}

If you believe this decision was made in error,
please contact the Farmart administration team.

Farmart
Livestock and farm produce, straight from the farm.
"""

    html_body = _email_template(
        title="Application update",
        body=f"""
        <p>
            Hello <strong>{farmer_name}</strong>,
        </p>

        <p>
            We are sorry to inform you that your
            Farmart farmer application was not approved.
        </p>

        <div style="
            margin: 22px 0;
            padding: 16px;
            background-color: #fff5f2;
            border: 1px solid #f0c9c1;
            border-radius: 8px;
        ">

            <strong>
                Reason:
            </strong>

            <p style="margin-bottom: 0;">
                {reason}
            </p>

        </div>

        <p>
            If you believe this decision was made
            in error, please contact the Farmart
            administration team.
        </p>
        """,
    )

    return send_email(
        to_email=farmer_email,
        subject=subject,
        text_body=text_body,
        html_body=html_body,
    )

def send_password_reset_otp(
    user_name,
    user_email,
    otp,
):
    """
    Send a 6-digit email verification OTP.
    """

    subject = "Your Farmart verification code"

    text_body = f"""
Hello {user_name},

Your Farmart verification code is:

{otp}

Enter this 6-digit code on the Farmart
verification page to verify your email address.

This code is temporary. If you did not request
this verification, you can safely ignore this email.

Farmart
Livestock and farm produce, straight from the farm.
"""

    html_body = _email_template(
        title="Verify your Farmart email",
        body=f"""
        <p>
            Hello <strong>{user_name}</strong>,
        </p>

        <p>
            Use the verification code below to
            verify your Farmart email address:
        </p>

        <div style="
            margin: 28px 0;
            padding: 20px;
            background-color: #f4f7f5;
            border: 1px solid #dce7df;
            border-radius: 10px;
            text-align: center;
        ">

            <div style="
                font-size: 32px;
                font-weight: 700;
                letter-spacing: 8px;
                color: #2f6d3f;
            ">
                {otp}
            </div>

        </div>

        <p>
            Enter this 6-digit code on the
            Farmart verification page.
        </p>

        <p style="
            color: #718078;
            font-size: 13px;
        ">
            This code is temporary. If you did not
            request this verification, you can
            safely ignore this email.
        </p>
        """,
    )

    return send_email(
        to_email=user_email,
        subject=subject,
        text_body=text_body,
        html_body=html_body,
    )