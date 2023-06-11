from flask import Blueprint, jsonify
from app.models import User, Follower, Story, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follows', __name__)




@follow_routes.route('/<int:id>', methods=["POST"])
@login_required
def follow(id):
    """
    POST - FOLLOW AN AUTHOR BY AUTHOR ID
    """
    user = User.query.get(id)
    curr_user = current_user.id

    if user and curr_user:
        new_follower = Follower(follower_id=curr_user, author_id=user.id)
        db.session.add(new_follower)
        db.session.commit()

        # getting all author ids for the current user's following list
        followed_author_ids = [follow.author_id for follow in Follower.query.filter_by(follower_id=curr_user).all()]
        return jsonify({'message': 'successfully followed user', 'followedAuthorIds': followed_author_ids}), 201

        # return jsonify({'message': 'successfully followed user'}), 201
    else:
        return jsonify({'message': "user could not be found"}), 404




@follow_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def unfollow(id):
    """
    DELETE - UNFOLLOW AN AUTHOR BY AUTHOR ID
    """
    user = User.query.get(id)
    curr_user = current_user.id

    if user and curr_user:
        follower = Follower.query.filter_by(follower_id=curr_user, author_id=user.id).first()

        if follower:
            db.session.delete(follower)
            db.session.commit()
            # getting all author ids for the current user's following list
            followed_author_ids = [follow.author_id for follow in Follower.query.filter_by(follower_id=curr_user).all()]
            return jsonify({'message': 'successfully unfollowed user', 'followedAuthorIds': followed_author_ids}), 201
            # return jsonify({'message': 'successfully unfollowed user'}), 201

    return jsonify({'error': 'No releationship found'}), 400





@follow_routes.route('/<int:id>/following')
@login_required
def get__users_followings(id):
    """
    GET FOLLOWING LIST BY USER ID
    """
    user = User.query.get(id)
    if not user:
        return {'error': 'User not found'}, 404
    # if user.id is not current_user.id:
    #     return {'error': 'unauthorized'}

    following = Follower.query.filter_by(follower_id=user.id).all()
    # for follow in following:
    #     follow.to_dict()

    return {'following': [follow.to_dict() for follow in following]}


@follow_routes.route('/following')
@login_required
def get_curr_user_followings():
    """
    GET CURRENT USERS FOLLOWING LIST
    """
    user = User.query.get(current_user.id)
    if not user:
        return {'error': 'User not found'}, 404

    # following = Follower.query.filter_by(follower_id=user.id).all()
    following = Follower.query.filter_by(follower_id=current_user.id).all()
    following_ids = [follow.author_id for follow in following]


    # return {'following': [follow.to_dict() for follow in following]}
    return jsonify({'followedAuthorIds': following_ids}), 201



# GET FOLLOWER LIST BY USER ID
#would like for anyone can see who follows an author
@follow_routes.route('/<int:id>/followers')
def get_followers(id):
    """
    Query for target user's list of followers
      and returns them in a list of follow dictionaries
    """
    user = User.query.get(id)
    if not user:
        return {'error': 'User not found'}, 404

    followers = Follower.query.filter_by(author_id=user.id).all()

    return {'followers': [follow.to_dict() for follow in followers], 'followerCount': len(followers)}