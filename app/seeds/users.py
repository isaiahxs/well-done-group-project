from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
# Adds a demo user, you can add other users here if you want
def seed_users():
    User.query.delete() 
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        profile_image='profile_image.jpg',
        first_name='John',
        last_name='Doe'
    )

    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        profile_image='https://cdn-icons-png.flaticon.com/512/1090/1090806.png',
        first_name='Marnie',
        last_name='Smith'
    )

    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        profile_image='profile_image.jpg',
        first_name='Bobbie',
        last_name='Johnson'
    )

    robbie = User(
        username='robbie',
        email='robbie@aa.io',
        password='password',
        profile_image='profile_image.jpg',
        first_name='Robbie',
        last_name='Williams'
    )

    doug = User(
        username='doug',
        email='doug@aa.io',
        password='password',
        profile_image='profile_image.jpg',
        first_name='Doug',
        last_name='Brown'
    )

    spiderman = User(
        username='spiderman',
        email='spiderman@example.com',
        password='spidey123',
        profile_image='https://cdn-icons-png.flaticon.com/512/1090/1090806.png',
        first_name='Peter',
        last_name='Parker'
    )
    wonderwoman = User(
        username='wonderwoman',
        email='wonderwoman@example.com',
        password='ww123',
        profile_image='profile_image.jpg',
        first_name='Diana',
        last_name='Prince'
    )
    ironman = User(
        username='ironman',
        email='ironman@example.com',
        password='tonystark',
        profile_image='profile_image.jpg',
        first_name='Tony',
        last_name='Stark'
    )
    superman = User(
        username='superman',
        email='superman@example.com',
        password='kryptonite',
        profile_image='profile_image.jpg',
        first_name='Clark',
        last_name='Kent'
    )
    batman = User(
        username='batman',
        email='batman@example.com',
        password='darkknight',
        profile_image='profile_image.jpg',
        first_name='Bruce',
        last_name='Wayne'
    )
    wolverine = User(
        username='wolverine',
        email='wolverine@example.com',
        password='logan',
        profile_image='profile_image.jpg',
        first_name='James',
        last_name='Howlett'
    )
    storm = User(
        username='storm',
        email='storm@example.com',
        password='weathergoddess',
        profile_image='profile_image.jpg',
        first_name='Ororo',
        last_name='Munroe'
    )
    captainamerica = User(
        username='captainamerica',
        email='captainamerica@example.com',
        password='shield123',
        profile_image='profile_image.jpg',
        first_name='Steve',
        last_name='Rogers'
    )
    hulk = User(
        username='hulk',
        email='hulk@example.com',
        password='smash123',
        profile_image='profile_image.jpg',
        first_name='Bruce',
        last_name='Banner'
    )
    blackwidow = User(
        username='blackwidow',
        email='blackwidow@example.com',
        password='natasha123',
        profile_image='profile_image.jpg',
        first_name='Natasha',
        last_name='Romanoff'
    )
    thor = User(
        username='thor',
        email='thor@example.com',
        password='mjolnir',
        profile_image='profile_image.jpg',
        first_name='Thor',
        last_name='Odinson'
    )
    flash = User(
        username='flash',
        email='flash@example.com',
        password='speedforce',
        profile_image='profile_image.jpg',
        first_name='Barry',
        last_name='Allen'
    )
    greenlantern = User(
        username='greenlantern',
        email='greenlantern@example.com',
        password='willpower',
        profile_image='profile_image.jpg',
        first_name='Hal',
        last_name='Jordan'
    )
    aquaman = User(
        username='aquaman',
        email='aquaman@example.com',
        password='atlantis',
        profile_image='profile_image.jpg',
        first_name='Arthur',
        last_name='Curry'
    )
    blackpanther = User(
        username='blackpanther',
        email='blackpanther@example.com',
        password='wakandaforever',
        profile_image='profile_image.jpg',
        first_name='T\'Challa',
        last_name='Chadwick'
    )
    doctorstrange = User(
        username='doctorstrange',
        email='doctorstrange@example.com',
        password='mysticarts',
        profile_image='profile_image.jpg',
        first_name='Stephen',
        last_name='Strange'
    )
    vision = User(
        username='vision',
        email='vision@example.com',
        password='synthezoid',
        profile_image='profile_image.jpg',
        first_name='Vis',
        last_name='Ion'
    )
    scarletwitch = User(
        username='scarletwitch',
        email='scarletwitch@example.com',
        password='chaosmagic',
        profile_image='profile_image.jpg',
        first_name='Wanda',
        last_name='Maximoff'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(robbie)
    db.session.add(doug)
    db.session.add(spiderman)
    db.session.add(wonderwoman)
    db.session.add(ironman)
    db.session.add(superman)
    db.session.add(batman)
    db.session.add(wolverine)
    db.session.add(storm)
    db.session.add(captainamerica)
    db.session.add(hulk)
    db.session.add(blackwidow)
    db.session.add(thor)
    db.session.add(flash)
    db.session.add(greenlantern)
    db.session.add(aquaman)
    db.session.add(blackpanther)
    db.session.add(doctorstrange)
    db.session.add(vision)
    db.session.add(scarletwitch)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built-in function to do this. With PostgreSQL in production, TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto-incrementing primary key. CASCADE deletes any dependent entities. With SQLite in development, you need to use DELETE to remove all data, and it will reset the primary keys as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()