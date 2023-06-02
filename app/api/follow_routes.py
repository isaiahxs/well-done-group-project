from flask import Blueprint, jsonify
from app.models import User, Follower, Story, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follows', __name__)

# POST - FOLLOW AN AUTHOR
@follow_routes.route('/<int:user_id>', methods=["POST"])
def follow(user_id):

    user = User.query.get(user_id)
    curr_user = User.query.get(current_user.id)

    if user and curr_user:
        new_follower = Follower(follower_id=user.id, author_id=curr_user.id)
        db.session.add(new_follower)
        db.session.commit()

        return jsonify({'message': 'successfully followed user'}), 201
    else:
        return jsonify({'message': "user could not be found"}), 404

#DELETE - UNFOLLOW AN AUTHOR
@follow_routes.route('/<int:user_id>, methods=["DELETE"')
def un_follow(user_id):

    user = User.query.get(user_id)
    curr_user = User.query.get(current_user.id)

    if user and curr_user:
        follower = Follower.query.filter_by(follower_id=curr_user.id, author_id=user.id).first()

        if follower:
            db.session.delete(follower)
            db.session.commit()
            return jsonify({'message': 'successfully unfollowed user'}), 200

# GET - FEED OF STORIES BY USER ID
@follow_routes.route('/<int:user_id>')
def feed(user_id):
    """

    """
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    following_list = [follower.author_id for follower in user.followers]

    stories = Story.query.filter(Story.author_id.in_(following_list)).all()

    feed_data = []
    for story in stories:
        feed_data.append({
            'story_id': story.id,
            'title': story.title,
            'content': story.content,
            'author': {
                'author_id': story.author.id,
                'author_name': story.author.first_name
            }
        })

    return jsonify({'feed': feed_data}), 200


# Probably dont even need these bad boys below, just wanted to test that I was getting anything

# GET FOLLOWING LIST BY USER ID
# should require auth to see who you are following
@follow_routes.route('/<int:user_id>/following')
@login_required
def get_following(user_id):
    """
    Query for current user's list of authors they are following
    and returns them in a list of follow dictionaries
    """
    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404
    # if user.id is not current_user.id:
    #     return {'error': 'unauthorized'}

    following = Follower.query.filter_by(follower_id=user.id).all()
    # for follow in following:
    #     follow.to_dict()

    return {'following': [follow.to_dict() for follow in following]}

# GET FOLLOWER LIST BY USER ID
#would like for anyone can see who follows an author
@follow_routes.route('/<int:user_id>/followers')
def get_followers(user_id):
    """
    Query for target user's list of followers
      and returns them in a list of follow dictionaries
    """
    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404

    followers = Follower.query.filter_by(author_id=user.id).all()

    return {'followers': [follow.to_dict() for follow in followers]}
