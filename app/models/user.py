from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import Column, DateTime, func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    hashed_password = db.Column(db.String(255), nullable=False)

    following = db.relationship('Follower', back_populates='follower_user', foreign_keys='Follower.follower_id')
    followers = db.relationship('Follower', back_populates='author_user', foreign_keys='Follower.author_id')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'profileImage': self.profile_image,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'followers': [follower.to_dict() for follower in self.followers],
            'numFollowers': len(self.followers)

        }
    def safe_dict(self):
        return {
            'firstName': self.first_name,
            'lastName': self.last_name,
            'followers': [follower.to_dict() for follower in self.followers],
            'numFollowers': len(self.followers)
        }