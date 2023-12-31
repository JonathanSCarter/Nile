"""empty message

Revision ID: 92693bc81669
Revises:
Create Date: 2023-08-07 13:26:35.450794

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '92693bc81669'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
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

    op.create_table('items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('seller', sa.String(length=40), nullable=False),
    sa.Column('rating', sa.Float(precision=2), nullable=True),
    sa.Column('price', sa.Float(precision=7), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('discount', sa.Integer(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('category', sa.String(length=100), nullable=False),
    sa.Column('seller_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['seller_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE items SET SCHEMA {SCHEMA};")

    op.create_table('purchases',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('purchased_at', sa.DateTime(), nullable=True),
    sa.Column('item_name', sa.String(length=200), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('purchases', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_purchases_purchased_at'), ['purchased_at'], unique=False)

    if environment == "production":
        op.execute(f"ALTER TABLE purchases SET SCHEMA {SCHEMA};")

    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('item_id', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('purchased', sa.Boolean(), nullable=False),
    sa.Column('purchased_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_carts_purchased'), ['purchased'], unique=False)
        batch_op.create_index(batch_op.f('ix_carts_purchased_at'), ['purchased_at'], unique=False)

    if environment == "production":
        op.execute(f"ALTER TABLE carts SET SCHEMA {SCHEMA};")

    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=500), nullable=True),
    sa.Column('item_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_carts_purchased_at'))
        batch_op.drop_index(batch_op.f('ix_carts_purchased'))

    op.drop_table('carts')
    with op.batch_alter_table('purchases', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_purchases_purchased_at'))

    op.drop_table('purchases')
    op.drop_table('items')
    op.drop_table('users')
    # ### end Alembic commands ###
