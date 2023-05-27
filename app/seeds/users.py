from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        
        username='Demo', first_name='Doug', last_name='Lasfirr', email='demo@aa.io', password='password', profile_image="profile-pic.img",)
    marnie = User(
        
        username='marnie', first_name='Marnie', last_name='Meltzker', email='marnie@aa.io', password='password', profile_image="profile-pic.img")
    bobbie = User(
        username='bobbie', first_name='Bobbie', last_name='Bobbert', email='bobbie@aa.io', password='password', profile_image="profile-pic.img")
    john = User(
        username='john', first_name='John', last_name='Doe', email='john@aa.io', password='password', profile_image="profile-pic.img")

    jane = User(
        username='jane', first_name='Jane', last_name='Doe', email='jane@aa.io', password='password', profile_image="profile-pic.img")

    peter = User(
        username='peter', first_name='Peter', last_name='Parker', email='peter@aa.io', password='password', profile_image="profile-pic.img")

    mary = User(
        username='mary', first_name='Mary', last_name='Jane', email='mary@aa.io', password='password', profile_image="profile-pic.img")

    tony = User(
        username='tony', first_name='Tony', last_name='Stark', email='tony@aa.io', password='password', profile_image="profile-pic.img")

    steve = User(
        username='steve', first_name='Steve', last_name='Rogers', email='steve@aa.io', password='password', profile_image="profile-pic.img")

    bruce = User(
        username='david', first_name='David', last_name='Banner', email='david@aa.io', password='password', profile_image="profile-pic.img")

    clark = User(
        username='clark', first_name='Clark', last_name='Kent', email='clark@aa.io', password='password', profile_image="profile-pic.img")

    diana = User(
        username='diana', first_name='Diana', last_name='Prince', email='diana@aa.io', password='password', profile_image="profile-pic.img")

    barry = User(
        username='barry', first_name='Barry', last_name='Allen', email='barry@aa.io', password='password', profile_image="profile-pic.img")

    oliver = User(
        username='oliver', first_name='Oliver', last_name='Queen', email='oliver@aa.io', password='password', profile_image="profile-pic.img")

    bruce_wayne = User(
        username='bruce_wayne', first_name='Bruce', last_name='Wayne', email='bruce_wayne@aa.io', password='password', profile_image="profile-pic.img")

    arthur = User(
        username='arthur', first_name='Arthur', last_name='Curry', email='arthur@aa.io', password='password', profile_image="profile-pic.img")

    hal = User(
        username='hal', first_name='Hal', last_name='Jordan', email='hal@aa.io', password='password', profile_image="profile-pic.img")


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(john)
    db.session.add(jane)
    db.session.add(peter)
    db.session.add(mary)
    db.session.add(tony)
    db.session.add(steve)
    db.session.add(bruce)
    db.session.add(clark)
    db.session.add(diana)
    db.session.add(barry)
    db.session.add(oliver)
    db.session.add(bruce_wayne)
    db.session.add(arthur)
    db.session.add(hal)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()