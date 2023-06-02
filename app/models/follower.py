from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import Column, DateTime, func

class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    follower_user = db.relationship('User', back_populates='following', foreign_keys=[follower_id])
    author_user = db.relationship('User', back_populates='followers', foreign_keys=[author_id])

    def to_dict(self):
        return {
            "id": self.id,
            "followerId": self.follower_id,
            "authorId": self.author_id
        }

    # def follow(self, follower_id, author_id):
    #     new_follower = Follower(follower_id=follower_id, author_id=author_id)
    #     db.session.add(new_follower)
    #     db.session.commit()
