# Farmart — Team Roles

## Backend (farmart-backend/)

| Member | Files | Notes |
|---|---|---|
| **Ryan** | `extensions.py`, `config.py`, `models/user.py`, `models/profile.py`, `resources/auth_resource.py`, `resources/google_callback_resource.py`, `resources/user_resource.py`, `schemas/user_schema.py`, `schemas/profile_schema.py` | OAuth, SMTP, user/profile models, and final wiring of backend with frontend once everyone's individual pieces are done |
| **Shadrack** | `app.py`, `seed.py`, `models/livestock.py`, `resources/livestock_resource.py`, `schemas/livestock_schema.py`, `models/exchange_rate.py`, `resources/exchange_rate_resource.py`, `schemas/exchange_rate_schema.py` | Shared models used by both buyer and farmer flows. `app.py` gets touched twice — once now for what exists, again later to register everyone else's models |
| **Faith** | `models/order.py`, `models/order_item.py`, `models/payment.py`, `models/wishlist.py`, `models/review.py` + matching resources/schemas | Every buyer-role file and the buyer profile structure |
| **Martin** | `models/revenue_record.py` + matching resources/schemas | Every farmer-role file and the farmer profile structure |
| **Joshua** | `models/announcement.py`, `models/report.py` + matching resources/schemas | Every admin-role file and the admin profile structure |

## Notes

- Ryan's `extensions.py` and `config.py` are already written — no one else touches these.
- Shadrack's models are cross-role (livestock is browsed by buyers and listed by farmers; exchange_rate is a shared utility), so his work isn't blocked on anyone else's role-specific models.
- Ryan's user/profile/auth work needs OAuth + SMTP knowledge, so it stays separate from Shadrack's slice.
- Final backend-frontend wiring happens last, once Faith, Martin, and Joshua's role-specific models are in place.

### Farmart backend structure

farmart-backend/
│
├── models/
│   ├── __init__.py
│   ├── announcement.py
│   ├── exchange_rate.py
│   ├── livestock.py
│   ├── order.py
│   ├── order_item.py
│   ├── payment.py
│   ├── profile.py
│   ├── report.py
│   ├── revenue_record.py
│   ├── review.py
│   ├── user.py
│   └── wishlist.py
│
├── resources/
│   ├── __init__.py
│   ├── announcement_resource.py
│   ├── auth_resource.py
│   ├── exchange_rate_resource.py
│   ├── google_callback_resource.py
│   ├── livestock_resource.py
│   ├── order_resource.py
│   ├── order_item_resource.py
│   ├── payment_resource.py
│   ├── profile_resource.py
│   ├── report_resource.py
│   ├── revenue_record_resource.py
│   ├── review_resource.py
│   ├── user_resource.py
│   └── wishlist_resource.py
│
├── schemas/
│   ├── __init__.py
│   ├── announcement_schema.py
│   ├── exchange_rate_schema.py
│   ├── livestock_schema.py
│   ├── order_schema.py
│   ├── order_item_schema.py
│   ├── payment_schema.py
│   ├── profile_schema.py
│   ├── report_schema.py
│   ├── revenue_record_schema.py
│   ├── review_schema.py
│   ├── user_schema.py
│   └── wishlist_schema.py
│
├── app.py
├── config.py
├── extensions.py
├── seed.py
├── .env
├── Pipfile
└── Pipfile.lock
