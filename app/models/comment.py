from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import Column, DateTime, func
from .user import User
from .story import Story

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='comments')
    story = db.relationship('Story', back_populates='comments')
    claps = db.relationship('CommentClap', back_populates='comment', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'storyId': self.story_id,
            'content': self.content,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'author': {
                'firstName': self.user.first_name,
                'lastName': self.user.last_name,
                'profileImage': self.user.profile_image,
            },
            'clapCount': len(self.claps),
            'claps': [clap.to_dict() for clap in self.claps]
        }