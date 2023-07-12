"""empty message

Revision ID: c38308cd8946
Revises:
Create Date: 2023-07-12 15:46:40.036132

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'c38308cd8946'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('seller', sa.String(length=40), nullable=True),
    sa.Column('rating', sa.Float(precision=2), nullable=True),
    sa.Column('price', sa.Float(precision=7), nullable=True),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.Column('discount', sa.Integer(), nullable=True),
    sa.Column('img', sa.String(length=400), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('category', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE items SET SCHEMA {SCHEMA};")
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('item_id', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('purchased', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE carts SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('carts')
    op.drop_table('users')
    op.drop_table('items')
    # ### end Alembic commands ###
