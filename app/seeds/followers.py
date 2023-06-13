from app.models import db, Follower, environment, SCHEMA
from sqlalchemy.sql import text


def seed_followers():
    Follower.query.delete()



    for follower_id in range(6, 21):
        for author_id in range(1, 6):
            follower = Follower(author_id=author_id, follower_id=follower_id)
            db.session.add(follower)


    for author_id in range(6, 16):
        follower = Follower(author_id=author_id, follower_id=1)
        db.session.add(follower)

    db.session.commit()


def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followers"))

    db.session.commit()
