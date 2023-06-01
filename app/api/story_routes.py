from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Story

story_routes = Blueprint('stories', __name__)


@story_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of story dictionaries
    """

    return {'stories': [story.to_dict() for story in stories]}
    # stories = Story.query.all()
    # return {'stories': [story.to_dict() for story in stories]}


@story_routes.route('/<int:id>')
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)
    return story.to_dict()