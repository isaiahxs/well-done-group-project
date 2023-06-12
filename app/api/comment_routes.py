from flask import Blueprint, jsonify, session, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Story, Tag, StoryImage, StoryTag, Comment, CommentClap
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
    #will try soon
    # return {**comment.to_dict(), "author": {"firstName": comment.user.firstName, "lastName": comment.user.lastName}}


@comment_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_comment(id):
    """
    Create a new comment
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            story_id=id,
            content=form.data['content']
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
        return {'error': form.errors}, 422


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    """
    Update a comment by id
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
    Deletes a comment by id
    """
    comment = Comment.query.get(id)
    if comment is None:
        return {"error": "Comment not found"}, 404
    if current_user.id != comment.user_id:
        return {"error": "You do not have permission to delete this comment"}, 403

    db.session.delete(comment)
    db.session.commit()
    return {"message": "Comment deleted successfully"}


@comment_routes.route('/<int:id>/clap', methods=['POST'])
@login_required
def create_comment_clap(id):
    """
    Create a new clap for a comment
    """
    comment = Comment.query.get(id)
    if comment is None:
        return {"error": "Comment not found"}, 404
    if comment.user_id == current_user.id:
        return {"error": "You cannot clap for your own comment"}, 403
    
    clap = CommentClap.query.filter_by(user_id=current_user.id, comment_id=id).first()
    if clap is None:
        new_clap = CommentClap(user_id=current_user.id, comment_id=id)
        db.session.add(new_clap)
        db.session.commit()
        story = Story.query.get(comment.story_id)
        return story.to_dict()
        # return {"newClap": new_clap.to_dict(),
        #         "commentId": id}
    else:
        return {"error": "You have already clapped for this comment"}, 403
    

@comment_routes.route('/<int:id>/clap', methods=['DELETE'])
@login_required
def delete_comment_clap(id):
    """
    Delete a clap for a comment
    """
    comment = Comment.query.get(id)
    if comment is None:
        return {"error": "Comment not found"}, 404
    
    clap = CommentClap.query.filter_by(user_id=current_user.id, comment_id=id).first()
    if clap is not None:
        db.session.delete(clap)
        db.session.commit()
        story = Story.query.get(comment.story_id)
        return story.to_dict()
        # return {"message": "Clap deleted successfully"}
    else:
        return {"error": "You have not clapped for this comment"}, 403