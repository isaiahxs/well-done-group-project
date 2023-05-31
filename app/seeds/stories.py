from app.models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other stories here if you want
def seed_stories():
    Story.query.delete() 


    stories = [
        {
            'author_id': 1,
            'title': 'First Story',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            'author_id': 2,
            'title': 'Second Story',
            'content': 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ]

    for story in stories:
        new_story = Story(
            author_id=story['author_id'],
            title=story['title'],
            content=story['content'],
        )
        db.session.add(new_story)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the stories table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))
        
    db.session.commit()

