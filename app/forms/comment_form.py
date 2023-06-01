from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


from app.models import Comment


class CommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    story_id = IntegerField('story_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])


