from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


from app.models import StoryImage, Story


class StoryWithImageForm(FlaskForm):
    author_id = IntegerField('author_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired()])
    
    url = StringField('url', validators=[DataRequired()])
    position = IntegerField('position', validators=[DataRequired()])
    altTag = StringField('altTag', validators=[DataRequired()])

