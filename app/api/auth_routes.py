from flask import Blueprint, jsonify, session, request
from app.models import User, db, Follower, Story
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        followings = Follower.query.filter_by(follower_id=current_user.id).all()
        followed_authors_ids = [following.author_id for following in followings]
        subscribed_stories = Story.query.options(joinedload(Story.author)).filter(Story.author_id.in_(followed_authors_ids)).all()
        user_stories = Story.query.filter_by(author_id=current_user.id).all()

        # followed_authors = User.query.filter(User.author_id.in_(followed_authors_ids)).all()


        return {
            'user': current_user.to_dict(),
            'status': 200,
            'subscribedStories': [story.to_dict() for story in subscribed_stories],
            'userStories': [story.to_dict() for story in user_stories],
            'followedAuthorIds': followed_authors_ids
        }
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)


        followings = Follower.query.filter_by(follower_id=current_user.id).all()
        followed_authors_ids = [following.author_id for following in followings]
        subscribed_stories = Story.query.options(joinedload(Story.author)).filter(Story.author_id.in_(followed_authors_ids)).all()
        user_stories = Story.query.filter_by(author_id=current_user.id).all()
        
        return {
            'user': user.to_dict(),
            'status': 200,
            'subscribedStories': [story.to_dict() for story in subscribed_stories],
            'userStories': [story.to_dict() for story in user_stories],
            'followedAuthorIds': followed_authors_ids

            }
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout', methods=['DELETE'])
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_image=form.data['profile_image']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return {'user': user.to_dict(), 'status': 202}
    return {'errors': validation_errors_to_error_messages(form.errors), 'status': 401}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401