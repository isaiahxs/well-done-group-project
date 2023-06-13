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
        'Sports', 'Programming', 'Data Science', 'Technology',
        'Self Improvement', 'Writing', 'Relationships', 'Machine Learning',
        'Productivity', 'Web Development', 'JavaScript', 'Python',
        'Software Development', 'Health', 'Lifestyle', 'Travel', 'Education',
        'Business', 'Science', 'History', 'Music', 'Books', 'Entertainment',
        'Politics', 'Design', 'Art', 'Photography', 'Cooking', 'Environment',
        'Psychology', 'Economics', 'Philosophy', 'Culture', 'Fashion',
        'Personal Development', 'Architecture', 'Film', 'Biology', 'Sociology'
    ]

    for tag in tags:
        db.session.add(Tag(tag=tag))

    db.session.commit()


tags = {
'Sports': 1,
'Programming': 2,
'Data Science': 3,
'Technology': 4,
'Self Improvement': 5,
'Writing': 6,
'Relationships': 7,
'Machine Learning': 8,
'Productivity': 9,
'Web Development': 10,
'JavaScript': 11,
'Python': 12,
'Software Development': 13,
'Health': 14,
'Lifestyle': 15,
'Travel': 16,
'Education': 17,
'Business': 18,
'Science': 19,
'History': 20,
'Music': 21,
'Books': 22,
'Entertainment': 23,
'Politics': 24,
'Design': 25,
'Art': 26,
'Photography': 27,
'Cooking': 28,
'Environment': 29,
'Psychology': 30,
'Economics': 31,
'Philosophy': 32,
'Culture': 33,
'Fashion': 34,
'Personal Development': 35,
'Architecture': 36,
'Film': 37,
'Biology': 38,
'Sociology': 39
} 

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

