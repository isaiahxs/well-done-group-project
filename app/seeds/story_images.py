from app.models import db, StoryImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_story_images():
    StoryImage.query.delete() 

    story_image1 = StoryImage(story_id=3,url='image.jpg',position=646,altTag='great image')
   
    story_image_list = [
        story_image1
    ]

    for story_image_item in story_image_list:
        db.session.add(story_image_item)

    db.session.commit()

def undo_story_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.story_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM story_images"))
        
    db.session.commit()
