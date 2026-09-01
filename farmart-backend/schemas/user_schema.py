from extensions import ma
from models.user import User


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

    password_hash = ma.auto_field(
        load_only=True,
    )

    google_id = ma.auto_field(
        load_only=True,
    )


user_schema = UserSchema()
users_schema = UserSchema(many=True)