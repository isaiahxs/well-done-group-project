from flask import Blueprint, jsonify, session, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Story, Tag, StoryImage, StoryTag, Comment, User, Clap, Follower
from app.forms import StoryForm
from app.forms import StoryImageForm
from app.forms import CommentForm
from sqlalchemy.orm import joinedload
from werkzeug.utils import secure_filename
import os
import json

from ..aws3 import s3, bucket
import boto3


story_routes = Blueprint('stories', __name__)


@story_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of story dictionaries
    """
    stories = Story.query.all()
    return {'stories': [story.to_dict() for story in stories]}



@story_routes.route('/initialize')
def initial_load():
    """
    Eager Load data upon initialization 
    """

    stories = Story.query.all()
    tags = Tag.query.all()

    return {
        'stories': [story.to_dict() for story in stories],
        'tags': [tag.tag for tag in tags],
    }




@story_routes.route('/curr')
@login_required
def curr_user_stories():
    """
    Query for current user's stories and returns them in a list of story dictionaries
    """
    stories = Story.query.filter_by(author_id=current_user.id).all()
    if stories is None:
        return {"error": "No stories found"}, 404
    return {'stories': [story.to_dict() for story in stories]}




@story_routes.route('/subscribed')
@login_required
def subscribed_stories():
    """
    Query for all stories from  user's followed authors and returns them in a list of story dictionaries
    """

    followings = Follower.query.filter_by(follower_id=current_user.id).all()
    followed_authors_ids = [following.author_id for following in followings]
    subscribed_stories = Story.query.options(joinedload(Story.author)).filter(Story.author_id.in_(followed_authors_ids)).all()
    

    if subscribed_stories is None:
        return {"error": "No stories found"}, 404
    return {'subscribedStories': [story.to_dict() for story in subscribed_stories],}






@story_routes.route('/<int:id>')
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)

    if story is None:
        return {"error": "Story not found"}, 404
    
    #we need to check if current user has clapped this story if we want to hide Unclap button
    has_clapped = False
    if current_user.is_authenticated:
        has_clapped = Clap.query.filter_by(user_id=current_user.id, story_id=story.id).first() is not None

    story_dict = story.to_dict()
    story_dict['hasClapped'] = has_clapped
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
    if current_user.id != story.author_id:
        return {"error": "You do not have permission to edit this story"}, 403

    db.session.delete(story)
    db.session.commit()
    return {"message": "Story deleted successfully"}, 201



@story_routes.route('/<int:id>/image', methods=['POST'])
def create_story_image(id):
    """
    Creates a new story image
    """

    if 'images' in request.files:
        files = request.files.getlist('images')
        for file in files:
            if file.filename == '':
                return {"error": "No file selected"}, 400
            filename = secure_filename(file.filename)
            file.save(filename)
            s3.upload_file(
                Bucket='well-done-proj',
                Filename=filename,
                Key=filename
            )
            url = f"https://{bucket}.s3.us-east-2.amazonaws.com/{filename}"

    if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                return {"error": "No file selected"}, 400

            filename = secure_filename(file.filename)
            file.save(filename)

            s3.upload_file(
                Bucket='well-done-proj',
                Filename=filename,
                Key=filename
            )

            url = f"https://{bucket}.s3.us-east-2.amazonaws.com/{filename}"

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
          alt_tag=data['alt_tag']
      )
      db.session.add(new_story_image)
      db.session.commit()
      # return new_story_image.to_dict()
      return jsonify({**new_story_image.to_dict(), 'message': 'Story image successfully created'}), 201

    if form.errors:
      return {'error': "Bad Data"}


@story_routes.route('/', methods=['POST'])
@login_required
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
          author_id=current_user.id,
          title=data['title'],
          content=data['content']
      )
      db.session.add(new_story)
      db.session.commit()
      return new_story.to_dict()

    if form.errors:
      return "Bad Data"


@story_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_story(id):
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data
        story = Story.query.get(id)

        if story is None:
            return {"error": "Story not found"}, 404
        if current_user.id != story.author_id:
            return {"error": "You do not have permission to edit this story"}, 403


        images_to_update = json.loads(request.form.get('imagesToUpdate')) 
        print(images_to_update)


        id_to_position = {int(id): int(img['position']) for id, img in images_to_update.items()}

        existing_images = StoryImage.query.filter_by(story_id=story.id).all()

        for img in existing_images:
            if img.id in id_to_position:
                img.position = id_to_position[img.id]

        files = request.files.getlist('images')

        for i, file in enumerate(files):
            if file.filename == '':
                return {"error": "No file selected"}, 400

            filename = secure_filename(file.filename)
            file.save(filename)
            s3.upload_file(Bucket='well-done-proj', Filename=filename, Key=filename)
            url = f"https://{bucket}.s3.us-east-2.amazonaws.com/{filename}"

            new_story_image = StoryImage(
                story_id=story.id,
                url=url,
                file_name=filename,
                position=request.form.get(f'position{i}'),
                alt_tag=request.form.get(f'altTag{i}')
            )
            db.session.add(new_story_image)
            

        db.session.commit()

        story.title = data['title']
        story.content = data['content']
        db.session.commit()

        return story.to_dict()

    else:
        return {"error": "Bad Data"}, 400





@story_routes.route('/create', methods=['POST'])
@login_required
def create_story_with_images():
    """
    Creates a new story with included images
    """

    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data
        new_story = Story(
            author_id=current_user.id,
            title=data['title'],
            content=request.form.get('content'),
            time_to_read=request.form.get('time_to_read'),
            sliced_intro=request.form.get('sliced_intro'),
        )
        db.session.add(new_story)
        db.session.commit()

        # Handle story images
        files = request.files.getlist('images')

        for i, file in enumerate(files):
            if file.filename == '':
                return {"error": "No file selected"}, 400

            filename = secure_filename(file.filename)
            file.save(filename)
            s3.upload_file(
                Bucket='well-done-proj',
                Filename=filename,
                Key=filename
            )
            url = f"https://{bucket}.s3.us-east-2.amazonaws.com/{filename}"

            alt_tag = request.form.get(f'altTag{i}')
            position = request.form.get(f'position{i}')

            new_story_image = StoryImage(
                story_id=new_story.id,
                url=url,
                file_name=filename,
                position=position,
                alt_tag=alt_tag
            )
            db.session.add(new_story_image)
            db.session.commit()
            try:
                os.remove(filename)
            except Exception as e:
                print(f"Error occurred while deleting file: {e}")

        # Handle story tags
        tags = request.form.getlist('tags')
        for tag in tags:
            new_story_tag = StoryTag(
                story_id=new_story.id,
                tag_id=tag
            )
            db.session.add(new_story_tag)
            db.session.commit()

        return new_story.to_dict()
    else:
        print(form.errors)

    return {"error": "Bad Data"}







@story_routes.route('/<int:id>/comment', methods=['POST'])
@login_required
def create_comment(id):
    """
    Creates a new story comment
    """

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit(): 

      print(form.errors)

    if form.validate_on_submit():
      data = form.data
      story = Story.query.get(id)

      for comment in story.comments:
        if comment.user_id == current_user.id:
            return{"error": "User has already commented on this story."}, 403

      if story is None:
          return {"error": "Story not found"}, 404

      new_comment = Comment(
          user_id=current_user.id,
          story_id=id,
          content=data['content'],

      )
      db.session.add(new_comment)
      db.session.commit()
      story = Story.query.get(comment.story_id)
      return story.to_dict()

    if form.errors:
      return "Bad Data"



@story_routes.route('/feed')
@login_required
def feed():
    """
    GET - FEED OF STORIES FOR CURR USER
    """

    following_list = [author.author_id for author in current_user.following]

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
    print(len(feed_data))

    return jsonify({'feed': feed_data}), 200




@story_routes.route('/<int:id>/clap', methods=['POST'])
@login_required
def create_clap(id):
    """
    Creates a new clap on a story
    """

    story = Story.query.get(id)
    if story is None:
        return {"error": "Story not found"}, 404
    if story.author_id == current_user.id:
        return {"error": "Cannot clap own story"}, 400
            

    new_clap = Clap(
        user_id=current_user.id,
        story_id=id,
    )

    db.session.add(new_clap)
    db.session.commit()

    return story.to_dict()



@story_routes.route('/<int:id>/clap', methods=['DELETE'])
@login_required
def remove_clap(id):
    """
    Removes a clap on a story
    """

    story = Story.query.get(id)
    if story is None:
        return {"error": "Story not found"}, 404
    if story.author_id == current_user.id:
        return {"error": "Cannot remove clap from own story"}, 400

    clap_to_remove = Clap.query.filter_by(user_id=current_user.id, story_id=id).first()
    if clap_to_remove is None:
        return {"message": "No claps found"}, 400

    db.session.delete(clap_to_remove)
    db.session.commit()

    has_clapped = Clap.query.filter_by(user_id=current_user.id, story_id=id).first() is not None

    return story.to_dict()
