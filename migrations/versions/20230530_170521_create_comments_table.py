
"""Create comments table

Revision ID: fa33b20b04f4
Revises: bcdd7f12f0a5
Create Date: 2023-05-30 17:05:21.963153

"""
from alembic import op
import sqlalchemy as sa


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'fa33b20b04f4'
down_revision = 'bcdd7f12f0a5'
branch_labels = None
depends_on = None


def upgrade():

    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('stories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('time_to_read', sa.Integer(), nullable=True),
    sa.Column('sliced_intro', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE stories SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('stories')
    # ### end Alembic commands ###


    
    