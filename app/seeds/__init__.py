from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tags import seed_tags, undo_tags
from .comments import seed_comments, undo_comments
from .stories import seed_stories, undo_stories
from .followers import seed_followers, undo_followers
from .claps import seed_claps, undo_claps
from .story_images import seed_story_images, undo_story_images
from .story_tags import seed_story_tags, undo_story_tags

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    seed_tags()
    seed_stories()
    seed_comments()
    seed_followers()
    seed_claps()
    # seed_story_images()
    # seed_story_tags()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_tags()
    undo_stories()
    undo_comments()
    undo_followers()
    undo_claps()
    # undo_story_images()
    # undo_story_tags()

    
    


    # Add other undo functions here
