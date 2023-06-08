from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField, TextAreaField, IntegerField, FieldList, FormField
from wtforms.validators import DataRequired, Email, ValidationError
from .story_image_form import StoryImageForm
from .story_tag_form import StoryTagForm


from app.models import Story


class StoryForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired()])
    images = FieldList(FormField(StoryImageForm))
    tags = FieldList(FormField(StoryTagForm))


