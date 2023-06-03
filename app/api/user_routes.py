from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Story

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and return all of that user's stories in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/curr')
@login_required
def curr_user():
    """
    Query for a user by id and return all of that user's stories in a dictionary
    """
    user = User.query.get(current_user.id)
    return user.to_dict()    

@user_routes.route('/<int:id>/stories')
@login_required
def user_stories(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user:
        return {"error": "User not found"}, 404

    stories = Story.query.filter_by(author_id=id).all()
    return {"stories": [story.to_dict() for story in stories]}