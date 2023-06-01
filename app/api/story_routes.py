from flask import Blueprint, jsonify, session, render_template, request, redirect
from flask_login import login_required
from app.models import db, Story
from app.forms import StoryForm
story_routes = Blueprint('stories', __name__)


@story_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of story dictionaries
    """

    stories = Story.query.all()
    return {'stories': [story.to_dict() for story in stories]}


@story_routes.route('/<int:id>')
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)
    return story.to_dict()



@story_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_story(id):
    """
    Deletes a story by id
    """
    story = Story.query.get(id)
    if story is None:
        return {"error": "Story not found"}, 404

    db.session.delete(story)
    db.session.commit()

    return {"message": "Story deleted successfully"}



@story_routes.route('/', methods=['POST'])
@login_required
def create_story():
    """
    Creates a new story
    """
    form = StoryForm
    if form.validate_on_submit():
      data = form.data
      new_story = Story(
          author_id=data['author_id'],
          title=data['title'],
          content=data['content']
      )
      db.session.add(new_story)
      db.session.commit()
      return new_story.to_dict()
      return redirect("/story/<int:id>")

    if form.errors:
      return "Bad Data"

 