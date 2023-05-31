from app.models import db, Follower, environment, SCHEMA
from sqlalchemy.sql import text


def seed_followers():
    Follower.query.delete() 

    follower1 = Follower(author_id=3,follower_id=3)
   
    follower_list = [
        follower1
    ]

    for follower_item in follower_list:
        db.session.add(follower_item)

    db.session.commit()

def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followers"))
        
    db.session.commit()
