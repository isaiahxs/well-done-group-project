from flask import Blueprint, jsonify, session, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Story, Tag, StoryImage, StoryTag
from app.forms import StoryForm
from app.forms import StoryImageForm
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
    if story is None:
        return {"error": "Story not found"}, 404

    story_dict = story.to_dict()
    return story_dict



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
def create_story():
    """
    Creates a new story
    """

    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit(): 

      print(form.errors)

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



@story_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_story(id):
    """
    Updates an existing story
    """
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      data = form.data
      story = Story.query.get(id)

      if story is None:
          return {"error": "Story not found"}, 404
      if current_user.id != story.author_id:
          return {"error": "You do not have permission to edit this story"}, 403

      story.author_id = data['author_id']
      story.title = data['title']
      story.content = data['content']
      db.session.commit()
      return story.to_dict()

    if form.errors:
      return "Bad Data"  


@story_routes.route('/<int:id>/image', methods=['POST'])
def create_story_image(id):
    """
    Creates a new story image
    """

    form = StoryImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit(): 

      print(form.errors)

    if form.validate_on_submit():
      data = form.data
      story = Story.query.get(id)

      if story is None:
          return {"error": "Story not found"}, 404
      if current_user.id != story.author_id:
          return {"error": "You do not have permission to edit this story"}, 403


      new_story_image = StoryImage(
          story_id=story.id,
          url=data['url'],
          position=data['position'],
          altTag=data['altTag']
      )
      db.session.add(new_story_image)
      db.session.commit()
      return new_story_image.to_dict()

    if form.errors:
      return "Bad Data"