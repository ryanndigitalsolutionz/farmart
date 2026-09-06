"""add is_active to users, add platform_settings

Revision ID: ba429230e862
Revises: 00f0b7888971
Create Date: 2026-09-06 21:30:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ba429230e862'
down_revision = '00f0b7888971'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'platform_settings',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('commission_rate', sa.Numeric(precision=5, scale=2), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )


def downgrade():
    op.drop_table('platform_settings')
    op.drop_column('users', 'is_active')
