from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


from app.models import StoryImage


class StoryImageForm(FlaskForm):
    story_id = IntegerField('story_id', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])
    position = IntegerField('position', validators=[DataRequired()])
    altTag = StringField('altTag', validators=[DataRequired()])

