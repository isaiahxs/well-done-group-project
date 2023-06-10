from app.models import db, CommentClap, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comment_claps():
    CommentClap.query.delete()

    clap1 = CommentClap(user_id=1, comment_id=1)
    clap2 = CommentClap(user_id=2, comment_id=1)
    clap3 = CommentClap(user_id=4, comment_id=1)
    clap4 = CommentClap(user_id=5, comment_id=1)

    clap5 = CommentClap(user_id=1, comment_id=2)
    clap6 = CommentClap(user_id=2, comment_id=2)
    clap7 = CommentClap(user_id=3, comment_id=2)
    clap8 = CommentClap(user_id=5, comment_id=2)

    clap9 = CommentClap(user_id=1, comment_id=3)
    clap10 = CommentClap(user_id=2, comment_id=3)
    clap11 = CommentClap(user_id=3, comment_id=3)
    clap12 = CommentClap(user_id=4, comment_id=3)

    clap13 = CommentClap(user_id=1, comment_id=4)
    clap14 = CommentClap(user_id=2, comment_id=4)
    clap15 = CommentClap(user_id=4, comment_id=4)
    clap16 = CommentClap(user_id=5, comment_id=4)

    clap17 = CommentClap(user_id=2, comment_id=5)
    clap18 = CommentClap(user_id=3, comment_id=5)
    clap19 = CommentClap(user_id=4, comment_id=5)
    clap20 = CommentClap(user_id=5, comment_id=5)

    clap21 = CommentClap(user_id=1, comment_id=6)
    clap22 = CommentClap(user_id=2, comment_id=6)
    clap23 = CommentClap(user_id=3, comment_id=6)
    clap24 = CommentClap(user_id=5, comment_id=6)

    comment_clap_list = [
        clap1, clap2, clap3, clap4, clap5, clap6, clap7, clap8, clap9, clap10,
        clap11, clap12, clap13, clap14, clap15, clap16, clap17, clap18, clap19,
        clap20, clap21, clap22, clap23, clap24
    ]

    for comment_clap in comment_clap_list:
        db.session.add(comment_clap)

    db.session.commit()

def undo_comment_claps():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comment_claps RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comment_claps"))

    db.session.commit()