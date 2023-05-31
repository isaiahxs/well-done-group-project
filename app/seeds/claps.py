from app.models import db, Clap, environment, SCHEMA
from sqlalchemy.sql import text


def seed_claps():
    Clap.query.delete() 

    clap1 = Clap(user_id=3,story_id=3)
   
    clap_list = [
        clap1
    ]

    for clap_item in clap_list:
        db.session.add(clap_item)

    db.session.commit()

def undo_claps():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.claps RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM claps"))
        
    db.session.commit()
