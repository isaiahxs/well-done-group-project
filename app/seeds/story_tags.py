from app.models import db, StoryTag, environment, SCHEMA
from sqlalchemy.sql import text


def seed_story_tags():
    StoryTag.query.delete() 

    story_tag1 = StoryTag(story_id=3,tag_id=5)
   
    story_tag_list = [
        story_tag1
    ]

    for story_tag_item in story_tag_list:
        db.session.add(story_tag_item)

    db.session.commit()

def undo_story_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.story_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM story_tags"))
        
    db.session.commit()
