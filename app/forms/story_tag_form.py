from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


from app.models import StoryImage


class StoryTagForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])


