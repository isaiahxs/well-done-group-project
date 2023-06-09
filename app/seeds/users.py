from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
# Adds a demo user, you can add other users here if you want
def seed_users():
    User.query.delete() 
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        profile_image='https://i.redd.it/ivaymc8wobo71.png',
        first_name='John',
        last_name='Doe'
    )

    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        profile_image='https://cdn-icons-png.flaticon.com/512/6833/6833605.png',
        first_name='Marnie',
        last_name='Smith'
    )

    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        profile_image='https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png',
        first_name='Bobbie',
        last_name='Johnson'
    )

    robbie = User(
        username='robbie',
        email='robbie@aa.io',
        password='password',
        profile_image='https://cdn-icons-png.flaticon.com/512/201/201634.png',
        first_name='Robbie',
        last_name='Williams'
    )

    doug = User(
        username='doug',
        email='doug@aa.io',
        password='password',
        profile_image='https://cdn-icons-png.flaticon.com/512/4128/4128349.png',
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
        profile_image='https://cdn.dribbble.com/users/318663/screenshots/4003999/ashley-wonderwoman-dribbble.jpg',
        first_name='Diana',
        last_name='Prince'
    )
    ironman = User(
        username='ironman',
        email='ironman@example.com',
        password='tonystark',
        profile_image='https://cdn.icon-icons.com/icons2/564/PNG/512/Iron_Man_icon-icons.com_54170.png',
        first_name='Tony',
        last_name='Stark'
    )
    superman = User(
        username='superman',
        email='superman@example.com',
        password='kryptonite',
        profile_image='https://static.vecteezy.com/system/resources/previews/014/414/705/original/superman-logo-on-transparent-background-free-vector.jpg',
        first_name='Clark',
        last_name='Kent'
    )
    batman = User(
        username='batman',
        email='batman@example.com',
        password='darkknight',
        profile_image='https://pixelbag.net/wp-content/uploads/2022/03/batman-vector-icon-symbol.jpg',
        first_name='Bruce',
        last_name='Wayne'
    )
    wolverine = User(
        username='wolverine',
        email='wolverine@example.com',
        password='logan',
        profile_image='https://cdn1.iconfinder.com/data/icons/people-avatars-23/24/people_avatar_head_wolverine_logan_xman_marvel-512.png',
        first_name='James',
        last_name='Howlett'
    )
    storm = User(
        username='storm',
        email='storm@example.com',
        password='weathergoddess',
        profile_image='https://pbs.twimg.com/media/FM2MyVqXsAwl_Ht.jpg',
        first_name='Ororo',
        last_name='Munroe'
    )
    captainamerica = User(
        username='captainamerica',
        email='captainamerica@example.com',
        password='shield123',
        profile_image='https://www.clipartmax.com/png/middle/355-3553556_collection-of-free-america-vector-captain-shield-captain-america-icon.png',
        first_name='Steve',
        last_name='Rogers'
    )
    hulk = User(
        username='hulk',
        email='hulk@example.com',
        password='smash123',
        profile_image='https://cdn1.iconfinder.com/data/icons/UltraBuuf/512/HULKfist.png',
        first_name='Bruce',
        last_name='Banner'
    )
    blackwidow = User(
        username='blackwidow',
        email='blackwidow@example.com',
        password='natasha123',
        profile_image='https://logowik.com/content/uploads/images/marvel-black-widow-new-20212567.jpg',
        first_name='Natasha',
        last_name='Romanoff'
    )
    thor = User(
        username='thor',
        email='thor@example.com',
        password='mjolnir',
        profile_image='https://icons-for-free.com/iconfiles/png/512/super+thor+wings+icon-1320166699905266736.png',
        first_name='Thor',
        last_name='Odinson'
    )
    flash = User(
        username='flash',
        email='flash@example.com',
        password='speedforce',
        profile_image='https://brutalgamer.com/wp-content/uploads/2015/05/Flash.jpg',
        first_name='Barry',
        last_name='Allen'
    )
    greenlantern = User(
        username='greenlantern',
        email='greenlantern@example.com',
        password='willpower',
        profile_image='https://logos-world.net/wp-content/uploads/2020/12/Green-Lantern-Emblem.png',
        first_name='Hal',
        last_name='Jordan'
    )
    aquaman = User(
        username='aquaman',
        email='aquaman@example.com',
        password='atlantis',
        profile_image='https://ikonthology.com/wp-content/uploads/edd/2022/08/Aquaman-bold-scifi.png',
        first_name='Arthur',
        last_name='Curry'
    )
    blackpanther = User(
        username='blackpanther',
        email='blackpanther@example.com',
        password='wakandaforever',
        profile_image='https://logos-world.net/wp-content/uploads/2021/08/Symbol-Black-Panther.png',
        first_name='T\'Challa',
        last_name='Chadwick'
    )
    doctorstrange = User(
        username='doctorstrange',
        email='doctorstrange@example.com',
        password='mysticarts',
        profile_image='https://image.pngaaa.com/931/477931-middle.png',
        first_name='Stephen',
        last_name='Strange'
    )
    vision = User(
        username='vision',
        email='vision@example.com',
        password='synthezoid',
        profile_image='https://cdn2.iconfinder.com/data/icons/heroes-villains-vol-2-colored-1/100/Vision-512.png',
        first_name='Vis',
        last_name='Ion'
    )
    scarletwitch = User(
        username='scarletwitch',
        email='scarletwitch@example.com',
        password='chaosmagic',
        profile_image='https://64.media.tumblr.com/8bf96fe7d1092b99185c0a3af0342e7b/0d6f9bc72839780b-58/s400x600/3b355d8f8808590c9d9416c56fb64b5fa0256a8f.png',
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