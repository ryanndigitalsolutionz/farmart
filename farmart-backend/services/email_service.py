import smtplib
from email.message import EmailMessage

from flask import current_app


def send_email(to_email, subject, body):
    message = EmailMessage()

    message["Subject"] = subject
    message["From"] = (
        f"{current_app.config['MAIL_FROM_NAME']} "
        f"<{current_app.config['MAIL_FROM_ADDRESS']}>"
    )
    message["To"] = to_email

    message.set_content(body)

    smtp_server = current_app.config["SMTP_SERVER"]
    smtp_port = current_app.config["SMTP_PORT"]
    smtp_username = current_app.config["SMTP_USERNAME"]
    smtp_password = current_app.config["SMTP_PASSWORD"]

    with smtplib.SMTP(smtp_server, smtp_port) as server:

        if current_app.config["SMTP_USE_TLS"]:
            server.starttls()

        server.login(
            smtp_username,
            smtp_password,
        )

        server.send_message(message)