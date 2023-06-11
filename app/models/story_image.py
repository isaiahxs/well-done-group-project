from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import Column, DateTime, func
from ..aws3 import s3, bucket

class StoryImage(db.Model):
    __tablename__ = 'story_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    file_name = db.Column(db.String(255), nullable=True, default=None)
    position = db.Column(db.Integer, nullable=False)
    alt_tag = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    story = db.relationship('Story', back_populates='images')

    def to_dict(self):

        
        if self.url.startswith('https://well-done'):
            final_url = s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': bucket, 'Key': self.file_name},
                ExpiresIn=3600  # The URL will be valid for 1 hour
            )
        else:
            final_url = self.url

        return {
            'id': self.id,
            'storyId': self.story_id,
            'url': final_url,
            'fileName': self.file_name,
            'position': self.position,
            'altTag': self.alt_tag,
        }
