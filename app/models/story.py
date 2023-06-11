from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .story_tag import StoryTag
# from .comment import Comment
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import Column, DateTime, func


class Story(db.Model):
    __tablename__ = 'stories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.String(6000), nullable=False)
    time_to_read = db.Column(db.Integer, nullable=True, default=10)
    sliced_intro = db.Column(db.String(255), nullable=True,default='Click to continue reading')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    author = db.relationship('User', backref='stories')
    claps = db.relationship('Clap', back_populates='story', cascade="all, delete-orphan")
    tags = db.relationship('StoryTag', back_populates='story', overlaps='story_tags', cascade="all, delete-orphan")
    images = db.relationship('StoryImage', back_populates='story', cascade="all, delete-orphan")
    comments = db.relationship('Comment', back_populates='story', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'authorInfo': self.author.to_dict(),
            'title': self.title,
            'content': self.content,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'tags': [tag.tag.to_dict() for tag in self.tags],
            'images': [image.to_dict() for image in self.images],
            'comments': [comment.to_dict() for comment in self.comments],
            'claps': len(self.claps),
            'timeToRead': self.time_to_read,
            'slicedIntro': self.sliced_intro
        }

        