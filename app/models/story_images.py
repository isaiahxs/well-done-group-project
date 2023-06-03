from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import Column, DateTime, func


class StoryImage(db.Model):
    __tablename__ = 'storyImages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    position = db.Column(db.Integer, nullable=False)
    altTag = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'story_id': self.story_id,
            'url': self.url,
            'position': self.position,
            'altTag': self.altTag
        }