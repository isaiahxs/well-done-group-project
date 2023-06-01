from app.models import db, StoryTag, environment, SCHEMA
from sqlalchemy.sql import text


def seed_story_tags():
    StoryTag.query.delete() 

    story_tags = [
        (1, ['5', '33']),  # A Love Letter to Gen Z
        (2, ['30', '5']),  # Happiness, a myth?
        (3, ['2', '10', '13']),  # My Top GitHub Repos To Make You a Better Developer. Guaranteed
        (4, ['10', '4', '25']),  # Front-end Development Trends to Follow This Summer
        (5, ['2', '4', '18']),  # My interview experience at Apple
        (6, ['5', '30']),  # You Can’t Always Get Closure from People You Want It From
        (7, ['5', '9']),  # Stop Trying To Do - Start Doing
        (8, ['2', '13', '4']),  # How to Become a Good Backend Engineer (Fundamentals)
        (9, ['25', '4']),  # Dear designers, it is not enough to just do UX design
        (10, ['2', '4', '18']),  # My interview experience at Facebook
        (11, ['5', '30']),  # It’s ok to cut people out of your life
        (12, ['5', '30']),  # The slowly life-draining implications of living the victim life
        (13, ['2', '4']),  # Modern Android Development
        (14, ['10', '2']),  # Front end schmunt end
        (15, ['2', '13', '18']),  # How I Prepared Coding Interviews and Got Amazon Offer
        (16, ['5', '32']),  # The Only Thing That is Constant is Change
        (17, ['7', '30']),  # The Ending of a Narcissistic Relationship?
        (18, ['2', '10', '13']),  # Ultimate Roadmap To Become Full Stack Developer
        (19, ['25', '26']),  # Clean UI Guide: White Space Design Tips
        (20, ['2', '13']),  # Be an Engineer, not a Frameworker
        (21, ['5', '30']),  # 4 Secrets of Emotionally Stable People
        (22, ['5', '30']),  # You Can Live Unashamed?
        (23, ['2', '4']),  # How I Optimized An API Endpoint To Make It 10x Faster
        (24, ['2', '13', '18']),  # Junior Software Engineer to Senior Software Engineer in 7 months
        (25, ['17', '35']),  # Interview Question — Prove that a pen is a pencil.
    ]

    story_tag_list = []
    for story_id, tag_ids in story_tags:
        for tag_id in tag_ids:
            story_tag = StoryTag(story_id=story_id, tag_id=int(tag_id))
            story_tag_list.append(story_tag)

    for story_tag_item in story_tag_list:
        db.session.add(story_tag_item)

    db.session.commit()

def undo_story_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.story_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM story_tags"))
        
    db.session.commit()
