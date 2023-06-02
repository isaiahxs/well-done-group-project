from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])


