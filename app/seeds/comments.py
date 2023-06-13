from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    Comment.query.delete()

    comment1 = Comment(user_id=3, content='Love this story!', story_id=1)
    comment2 = Comment(user_id=4, content='Good golly, I have not seen writing like this in ages', story_id=1)
    comment3 = Comment(user_id=5, content='Nice', story_id=1)
    comment4 = Comment(user_id=3, content='Good insights', story_id=2)
    comment5 = Comment(user_id=1, content='Thank you for this inspiring tale!', story_id=2)
    comment6 = Comment(user_id=4, content='Thank you!', story_id=2)
    comment7 = Comment(user_id=2, content='Good insights', story_id=3)
    comment8 = Comment(user_id=1, content='Thank you!', story_id=3)
    comment9 = Comment(user_id=5, content='Thank you!', story_id=4)
    comment10 = Comment(user_id=2, content='Great job!', story_id=4)
    comment11 = Comment(user_id=3, content='Really enjoyed this!', story_id=4)
    comment12 = Comment(user_id=1, content='Well-written!', story_id=5)
    comment13 = Comment(user_id=4, content='Impressive story!', story_id=5)
    comment14 = Comment(user_id=3, content='Thank you for sharing!', story_id=5)
    comment15 = Comment(user_id=2, content='Incredible storytelling!', story_id=6)
    comment16 = Comment(user_id=3, content='Could not put it down!', story_id=6)
    comment17 = Comment(user_id=4, content='Bravo!', story_id=7)
    comment18 = Comment(user_id=5, content='Beautifully written!', story_id=7)
    comment19 = Comment(user_id=1, content='This touched my heart.', story_id=8)
    comment20 = Comment(user_id=2, content='Captivating!', story_id=8)
    comment21 = Comment(user_id=3, content='Wow, what a plot twist!', story_id=9)
    comment22 = Comment(user_id=5, content='I could not stop reading!', story_id=9)
    comment23 = Comment(user_id=1, content='Well done!', story_id=10)
    comment24 = Comment(user_id=4, content='This story kept me on the edge of my seat!', story_id=10)
    comment25 = Comment(user_id=3, content='Masterfully crafted!', story_id=11)
    comment26 = Comment(user_id=4, content='I am in awe of your storytelling skills!', story_id=11)
    comment27 = Comment(user_id=5, content='This is a true gem!', story_id=12)
    comment28 = Comment(user_id=1, content='Thank you for sharing your talent!', story_id=12)
    comment29 = Comment(user_id=2, content='I am deeply moved by this story.', story_id=13)
    comment30 = Comment(user_id=4, content='An absolute page-turner!', story_id=13)
    comment31 = Comment(user_id=3, content='This story deserves all the praise!', story_id=14)
    comment32 = Comment(user_id=5, content='Im blown away!', story_id=14)
    comment33 = Comment(user_id=2, content='You have a gift for storytelling.', story_id=15)
    comment34 = Comment(user_id=1, content='Im hooked!', story_id=15)
    comment35 = Comment(user_id=3, content='Brilliantly written!', story_id=16)
    comment36 = Comment(user_id=4, content='I cant wait to read more of your work!', story_id=16)
    comment37 = Comment(user_id=5, content='This story captivated me from the beginning.', story_id=17)
    comment38 = Comment(user_id=1, content='You have a unique voice as an author.', story_id=17)
    comment39 = Comment(user_id=2, content='Thank you for this amazing story!', story_id=18)
    comment40 = Comment(user_id=4, content='Im in awe of your storytelling skills!', story_id=18)
    comment41 = Comment(user_id=1, content='Im speechless. This story is a masterpiece!', story_id=19)
    comment42 = Comment(user_id=2, content='You have a talent for creating immersive worlds.', story_id=19)
    comment43 = Comment(user_id=3, content='Im completely engrossed in this story.', story_id=20)
    comment44 = Comment(user_id=4, content='This is storytelling at its finest.', story_id=20)
    comment45 = Comment(user_id=2, content='Your writing has a magical quality to it.', story_id=21)
    comment46 = Comment(user_id=5, content='Im moved by the emotions conveyed in this story.', story_id=21)
    comment47 = Comment(user_id=1, content='You have a gift for creating memorable characters.', story_id=22)
    comment48 = Comment(user_id=3, content='Thank you for sharing your imagination with us!', story_id=22)
    comment49 = Comment(user_id=4, content='This story has touched my soul.', story_id=23)
    comment50 = Comment(user_id=5, content='Im eagerly awaiting your next story!', story_id=23)
    comment51 = Comment(user_id=5, content='This story has touched my soul.', story_id=24)
    comment52 = Comment(user_id=1, content='Im eagerly awaiting your next story!', story_id=24)
    comment53 = Comment(user_id=2, content='This story has touched my soul.', story_id=25)
    comment54 = Comment(user_id=1, content='Im eagerly awaiting your next story!', story_id=25)
    comment55 = Comment(user_id=6, content='Great insights!', story_id=26)
    comment56 = Comment(user_id=7, content='Inspiring!', story_id=26)
    comment57 = Comment(user_id=8, content='Well said!', story_id=27)
    comment58 = Comment(user_id=9, content='Love it!', story_id=27)
    comment59 = Comment(user_id=10, content='Informative!', story_id=28)
    comment60 = Comment(user_id=11, content='Short and sweet!', story_id=28)
    comment61 = Comment(user_id=12, content='Motivating!', story_id=29)
    comment62 = Comment(user_id=13, content='Excellent points!', story_id=29)
    comment63 = Comment(user_id=14, content='Interesting read!', story_id=30)
    comment64 = Comment(user_id=15, content='Well done!', story_id=30)
    comment65 = Comment(user_id=6, content='Great tips!', story_id=31)
    comment66 = Comment(user_id=7, content='Useful information!', story_id=31)
    comment67 = Comment(user_id=8, content='Amazing destinations!', story_id=32)
    comment68 = Comment(user_id=9, content='Travel goals!', story_id=32)
    comment69 = Comment(user_id=10, content='Healthy habits!', story_id=33)
    comment70 = Comment(user_id=11, content='Good advice!', story_id=33)
    comment71 = Comment(user_id=12, content='Inspiring story!', story_id=34)
    comment72 = Comment(user_id=13, content='Great message!', story_id=34)
    comment73 = Comment(user_id=14, content='Interesting insights!', story_id=35)
    comment74 = Comment(user_id=15, content='Well written!', story_id=35)
    comment75 = Comment(user_id=6, content='Impressive shots!', story_id=36)
    comment76 = Comment(user_id=7, content='Great composition!', story_id=36)
    comment77 = Comment(user_id=8, content='Deep thoughts!', story_id=37)
    comment78 = Comment(user_id=9, content='Philosophical insights!', story_id=37)
    comment79 = Comment(user_id=10, content='Stylish design!', story_id=38)
    comment80 = Comment(user_id=11, content='Innovative ideas!', story_id=38)
    comment81 = Comment(user_id=12, content='Inspiring lifestyle!', story_id=39)
    comment82 = Comment(user_id=13, content='Thought-provoking!', story_id=39)
    comment83 = Comment(user_id=14, content='Creative designs!', story_id=40)
    comment84 = Comment(user_id=15, content='Well-crafted!', story_id=40)
    comment85 = Comment(user_id=6, content='Great storytelling!', story_id=41)
    comment86 = Comment(user_id=7, content='Engaging narrative!', story_id=41)
    comment87 = Comment(user_id=8, content='Thought-provoking insights!', story_id=42)
    comment88 = Comment(user_id=9, content='Important topic!', story_id=42)
    comment89 = Comment(user_id=10, content='Creative writing!', story_id=43)
    comment90 = Comment(user_id=11, content='Impressive analysis!', story_id=43)
    comment91 = Comment(user_id=12, content='Informative piece!', story_id=44)
    comment92 = Comment(user_id=13, content='Insightful perspectives!', story_id=44)
    comment93 = Comment(user_id=14, content='Thoughtful writing!', story_id=45)
    comment94 = Comment(user_id=15, content='Well-argued points!', story_id=45)

    comment_list = [
        comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10,
        comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20,
        comment21, comment22, comment23, comment24, comment25, comment26, comment27, comment28, comment29, comment30,
        comment31, comment32, comment33, comment34, comment35, comment36, comment37, comment38, comment39, comment40,
        comment41, comment42, comment43, comment44, comment45, comment46, comment47, comment48, comment49, comment50,
        comment51, comment52, comment53, comment54, comment55, comment56, comment57, comment58, comment59, comment60,
        comment61,
        comment62, comment63, comment64, comment65, comment66, comment67, comment68,
        comment69, comment70, comment71, comment72, comment73, comment74, comment75,
        comment76, comment77, comment78, comment79, comment80, comment81, comment82,
        comment83, comment84, comment85, comment86, comment87, comment88, comment89,
        comment90, comment91, comment92, comment93, comment94
    ]

    for comment_item in comment_list:
        db.session.add(comment_item)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
