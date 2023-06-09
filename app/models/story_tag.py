from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import Column, DateTime, func


class StoryTag(db.Model):
    __tablename__ = 'story_tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), nullable=False)

    story = db.relationship('Story', backref='story_tags')
    tag = db.relationship('Tag', backref='story_tags')

    def to_dict(self):
        return {
            'id': self.id,
            'storyId': self.story_id,
            'tagId': self.tag_id
        }