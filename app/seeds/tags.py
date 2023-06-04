from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other tags here if you want
def seed_tags():
    Tag.query.delete() 

    # tags = [
    #     'sports', 'programming', 'data_science', 'technology', 
    #     'self_improvement', 'writing', 'relationships', 'machine_learning',
    #     'productivity', 'web_development', 'javaScript', 'python', 
    #     'software_development', 'health', 'lifestyle', 'travel', 'education',
    #     'business', 'science', 'history', 'music', 'books', 'entertainment',
    #     'politics', 'design', 'art', 'photography', 'cooking', 'environment',
    #     'psychology', 'economics', 'philosophy', 'culture', 'fashion',
    #     'personal_development', 'architecture', 'film', 'biology', 'sociology'
    # ]
    tags = [
        'sports', 'programming', 'dataScience', 'technology', 
        'selfImprovement', 'writing', 'relationships', 'machineLearning',
        'productivity', 'webDevelopment', 'javaScript', 'python', 
        'softwareDevelopment', 'health', 'lifestyle', 'travel', 'education',
        'business', 'science', 'history', 'music', 'books', 'entertainment',
        'politics', 'design', 'art', 'photography', 'cooking', 'environment',
        'psychology', 'economics', 'philosophy', 'culture', 'fashion',
        'personalDevelopment', 'architecture', 'film', 'biology', 'sociology'
    ]

    for tag in tags:
        db.session.add(Tag(tag=tag))

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the tags table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))
        
    db.session.commit()

