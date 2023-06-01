from flask import Blueprint, jsonify, session, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Story, Tag, StoryImage, StoryTag, Comment
from app.forms import StoryForm
from app.forms import StoryImageForm
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>')
def get_comment(id):
    """
    Get comment by Id
    """
    comment = Comment.query.get(id)

    if comment is None:
        return {"error": "Comment not found"}, 404

    return comment.to_dict()






@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
    """
    Update a story comment
    """

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = form.data
    comment = Comment.query.get(id)
    if comment is None:
        return {"error": "Comment not found"}, 404
    if current_user.id != comment.user_id:
        return {"error": "You do not have permission to edit this comment"}, 403
    comment.user_id = current_user.id
    comment.story_id = comment.story_id
    comment.content = data['content']
    db.session.commit()
    return comment.to_dict()



@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """
    Deletes a story by id
    """
    comment = Comment.query.get(id)
    if comment is None:
        return {"error": "Comment not found"}, 404

    db.session.delete(comment)
    db.session.commit()
    return {"message": "Comment deleted successfully"}

