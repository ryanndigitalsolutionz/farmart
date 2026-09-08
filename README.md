
## Project Overview

Farmart is a full-stack agricultural marketplace application. It connects buyers with farmers and allows users to browse products and livestock, manage carts and orders, and make payments through M-Pesa.

The application consists of a React frontend and a Flask backend connected to a database and Safaricom Daraja payment services.

## Features

- Buyer and farmer authentication
- Google authentication
- Password recovery
- Farmer product and livestock management
- Product and livestock marketplace
- Shopping cart and checkout
- Order creation and tracking
- M-Pesa STK Push payments
- M-Pesa callback processing
- Protected buyer, farmer, and administrator routes
- Farmer approval and rejection workflows
- Email functionality for authentication and notifications

## Technology Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- Tailwind CSS
- Deployed on Vercel

### Backend

- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-CORS
- Flask sessions
- Requests
- Deployed on Railway

### Integrations

- Safaricom Daraja API
- Google OAuth
- SMTP email service
- Relational database

## Project Structure

```text
farmart/
├── farmart-backend/
│   ├── app.py
│   ├── config.py
│   ├── models/
│   ├── resources/
│   ├── services/
│   ├── migrations/
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── .env
└── `README.md`
```

## Setup and Installation

### Prerequisites

- Python 3.10 or later
- Node.js and npm
- A relational database
- Safaricom Daraja credentials for M-Pesa testing
- Google OAuth credentials, if Google login is enabled

### Clone the Repository

```bash
git clone <repository-url>
cd farmart
```

### Backend Setup

```bash
cd farmart-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file using the variable names listed below. Do not commit this file.

Run database migrations if required:

```bash
flask db upgrade
```

Start the Flask backend:

```bash
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

## Environment Variables

Never commit secret values to source control. Configure these variables locally and in the deployment platform.

### Backend Variables

```text
DATABASE_URL
SECRET_KEY
FRONTEND_URL
VERCEL_URL
RAILWAY_URL

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URL

SMTP_USERNAME
SMTP_PASSWORD
SMTP_SERVER
SMTP_PORT
SMTP_USE_TLS
MAIL_FROM_NAME
MAIL_FROM_ADDRESS

MPESA_CONSUMER_KEY
MPESA_CONSUMER_SECRET
MPESA_SHORTCODE
MPESA_PASSKEY
MPESA_BASE_URL
MPESA_CALLBACK_URL
```

For Daraja, use the appropriate base URL for the selected environment:

```text
Sandbox: https://sandbox.safaricom.co.ke
Production: https://api.safaricom.co.ke
```

The callback URL must be publicly reachable over HTTPS and must match the backend callback route:

```text
/payments/mpesa/callback
```

### Frontend Variables

Vite variables must use the `VITE_` prefix. Configure the actual variable names used by the frontend service code, for example:

```text
VITE_API_BASE_URL
```

The frontend API base URL should point to the deployed Railway backend in production and the local Flask server during development.

## Running the Project Locally

Start the backend in one terminal:

```bash
cd farmart-backend
source venv/bin/activate
python app.py
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the local Vite URL in a browser and verify that the frontend API configuration points to the local Flask server.

## API and Payment Flow

The payment flow is:

1. The buyer opens the payment page for an order.
2. The frontend sends the order ID and Kenyan phone number to `POST /payments`.
3. The Flask backend requests a Daraja OAuth access token.
4. The backend submits an STK Push request.
5. Safaricom sends the payment prompt to the buyer's phone.
6. Safaricom posts the result to:
   `POST /payments/mpesa/callback`
7. The backend updates the payment and order status.
8. The frontend checks the payment status and displays the result.

Important payment requirements:

- Phone numbers must be normalized to Kenyan international format, such as `2547XXXXXXXX`.
- The amount must be a valid positive whole-number amount accepted by Daraja.
- The shortcode and passkey must belong to the same Daraja environment.
- The callback URL must be public, HTTPS-enabled, and configured in Railway.
- Credentials, access tokens, and passkeys must never be logged or committed.

## Deployment

### Backend on Railway

1. Create a Railway service for `farmart-backend`.
2. Configure the required backend environment variables.
3. Ensure the start command runs the Flask application using a production WSGI server, such as Gunicorn.
4. Run database migrations.
5. Copy the public Railway URL into the frontend API configuration.
6. Configure the Daraja callback URL using the public Railway URL.
7. Review Railway logs for startup, API, and payment errors.

Example production command:

```bash
gunicorn app:app
```

### Frontend on Vercel

1. Import the repository into Vercel.
2. Set the frontend root directory.
3. Configure the required `VITE_` environment variables.
4. Set the API base URL to the deployed Railway backend.
5. Deploy the application.
6. Add the Vercel URL to the backend CORS and authentication configuration where required.

After changing Vercel environment variables, redeploy the frontend.

## Security

- Keep `.env` files out of Git.
- Rotate credentials immediately if they are exposed.
- Do not log consumer secrets, passkeys, access tokens, passwords, or full phone numbers.
- Use HTTPS in deployed environments.
- Restrict CORS to trusted frontend origins.
- Validate order ownership, payment amounts, and authenticated users on the backend.

## Troubleshooting

Check the following when an API or payment request fails:

- Browser Network tab for the request URL and response body
- Railway deployment and application logs
- Backend environment variable names
- Frontend API base URL
- Daraja environment and credentials
- Phone-number normalization
- Callback URL reachability
- Database connection and migration status

For payment failures, log only non-sensitive status information such as HTTP status codes, Daraja error messages, order IDs, amounts, and masked phone-number suffixes.
```

# Farmart Checklist

AUTH
[ ] Buyer signup
[ ] Buyer login
[ ] Farmer signup
[ ] Farmer login
[ ] Google login
[ ] Forgot password

FARMER
[ ] Farmer dashboard
[ ] Create livestock
[ ] Edit livestock
[ ] Delete livestock
[ ] Create product
[ ] Edit product
[ ] Delete product

BUYER
[ ] Marketplace
[ ] Product details
[ ] Add livestock to cart
[ ] Add product to cart
[ ] Checkout
[ ] Delivery
[ ] Create backend order
[ ] M-Pesa payment
[ ] Order confirmation

ADMIN
[ ] Dashboard
[ ] Farmer approval
[ ] Farmer rejection
[ ] Admin routing protected

INTEGRATION
[ ] Frontend → backend
[ ] Backend → database
[ ] Payment → Daraja
[ ] Callback → payment status

```markdown
# Farmart Checklist

AUTH
[ ] Buyer signup
[ ] Buyer login
[ ] Farmer signup
[ ] Farmer login
[ ] Google login
[ ] Forgot password

FARMER
[ ] Farmer dashboard
[ ] Create livestock
[ ] Edit livestock
[ ] Delete livestock
[ ] Create product
[ ] Edit product
[ ] Delete product

BUYER
[ ] Marketplace
[ ] Product details
[ ] Add livestock to cart
[ ] Add product to cart
[ ] Checkout
[ ] Delivery
[ ] Create backend order
[ ] M-Pesa payment
[ ] Order confirmation

ADMIN
[ ] Dashboard
[ ] Farmer approval
[ ] Farmer rejection
[ ] Admin routing protected

INTEGRATION
[ ] Frontend → backend
[ ] Backend → database
[ ] Payment → Daraja
[ ] Callback → payment status

---
