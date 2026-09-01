from extensions import ma
from models.profile import Profile


class ProfileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
        load_instance = True


profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)