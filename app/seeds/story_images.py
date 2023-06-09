from app.models import db, StoryImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_story_images():
    StoryImage.query.delete() 

    story_image1 = StoryImage(story_id=1, url='https://hips.hearstapps.com/hmg-prod/images/how-to-write-a-love-letter-1608316069.png', position=835, alt_tag='love letter')
    story_image2 = StoryImage(story_id=1, url='https://images.pexels.com/photos/356372/pexels-photo-356372.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=2676, alt_tag='pen writing a letter')

    story_image3 = StoryImage(story_id=2, url='https://images.pexels.com/photos/4906289/pexels-photo-4906289.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=1374, alt_tag='woman smiling')
    story_image4 = StoryImage(story_id=2, url='https://images.pexels.com/photos/3062597/pexels-photo-3062597.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=2706, alt_tag='couple walking')

    story_image5 = StoryImage(story_id=3, url='https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=1248, alt_tag='software engineer helping another engineer')
    story_image6 = StoryImage(story_id=3, url='https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=4079, alt_tag='software engineer working from home')

    story_image7 = StoryImage(story_id=4, url='https://images.pexels.com/photos/4974920/pexels-photo-4974920.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=1656, alt_tag='two software engineers')
    story_image8 = StoryImage(story_id=4, url='https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=4109, alt_tag='code blocks')

    story_image9 = StoryImage(story_id=5, url='https://media.cnn.com/api/v1/images/stellar/prod/180927122050-apple-logo-gfx.jpg?q=w_3000,h_2250,x_0,y_0,c_fill', position=848, alt_tag='apple store')
    story_image10 = StoryImage(story_id=5, url='https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-iPhone-14-Plus-hero-220907.jpg.landing-big_2x.jpg', position=3216, alt_tag='picture of iphones')

    story_image11 = StoryImage(story_id=6, url='https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=3000', position=2354, alt_tag='people talking at a table')
    story_image12 = StoryImage(story_id=6, url='https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=3000', position=3531, alt_tag='phones hanging')

    story_image13 = StoryImage(story_id=7, url='https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=1043, alt_tag='woman reading offer letter')
    story_image14 = StoryImage(story_id=7, url='https://images.pexels.com/photos/1139319/pexels-photo-1139319.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=2883, alt_tag='woman that just graduated')

    story_image15 = StoryImage(story_id=8, url='https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=840, alt_tag='software engineer at work')
    story_image16 = StoryImage(story_id=8, url='https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=3512, alt_tag='software engineer on laptop')

    story_image17 = StoryImage(story_id=9, url='https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=830, alt_tag='wireframes zoomed in')
    story_image18 = StoryImage(story_id=9, url='https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=3254, alt_tag='wireframes with pen and phone')

    story_image19 = StoryImage(story_id=10, url='https://images.pexels.com/photos/267399/pexels-photo-267399.jpeg?auto=compress&cs=tinysrgb&w=3000', position=1355, alt_tag='facebook app')
    story_image20 = StoryImage(story_id=10, url='https://images.pexels.com/photos/927629/pexels-photo-927629.jpeg?auto=compress&cs=tinysrgb&w=3000', position=2283, alt_tag='facebook login page')

    story_image21 = StoryImage(story_id=11, url='https://images.pexels.com/photos/2821823/pexels-photo-2821823.jpeg?auto=compress&cs=tinysrgb&w=3000', position=952, alt_tag="board saying 'self care isn't selfish'")
    story_image22 = StoryImage(story_id=11, url='https://images.pexels.com/photos/3601097/pexels-photo-3601097.jpeg?auto=compress&cs=tinysrgb&w=3000', position=2825, alt_tag='person distraught')

    story_image23 = StoryImage(story_id=12, url='https://images.pexels.com/photos/3656855/pexels-photo-3656855.jpeg?auto=compress&cs=tinysrgb&w=3000', position=1377, alt_tag="scrabble pieces spelling out the word 'anxiety'")
    story_image24 = StoryImage(story_id=12, url='https://images.pexels.com/photos/4672710/pexels-photo-4672710.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=3321, alt_tag='two people holding hands')

    story_image25 = StoryImage(story_id=13, url='https://images.pexels.com/photos/4458554/pexels-photo-4458554.jpeg?auto=compress&cs=tinysrgb&w=3000', position=530, alt_tag='software engineer working from home')
    story_image26 = StoryImage(story_id=13, url='https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=3000', position=1094, alt_tag='engineer with multiple monitors')

    story_image27 = StoryImage(story_id=14, url='https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=1021, alt_tag='coding laptop')
    story_image28 = StoryImage(story_id=14, url='https://images.pexels.com/photos/52608/pexels-photo-52608.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=2130, alt_tag='confused software engineer')

    story_image29 = StoryImage(story_id=15, url='https://images.pexels.com/photos/4790264/pexels-photo-4790264.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=328, alt_tag='amazon alexa')
    story_image30 = StoryImage(story_id=15, url='https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=1764, alt_tag='tall office building')

    story_image31 = StoryImage(story_id=16, url='https://images.pexels.com/photos/4247724/pexels-photo-4247724.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=909, alt_tag='person moving into new house')
    story_image32 = StoryImage(story_id=16, url='https://images.pexels.com/photos/5427920/pexels-photo-5427920.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=1476, alt_tag='pregnant woman')

    story_image33 = StoryImage(story_id=17, url='https://images.pexels.com/photos/6670149/pexels-photo-6670149.jpeg?auto=compress&cs=tinysrgb&w=3000', position=796, alt_tag='woman distraught')
    story_image34 = StoryImage(story_id=17, url='https://images.pexels.com/photos/6670313/pexels-photo-6670313.jpeg?auto=compress&cs=tinysrgb&w=3000', position=1651, alt_tag='great image')

    story_image35 = StoryImage(story_id=18, url='https://images.pexels.com/photos/4550435/pexels-photo-4550435.jpeg?auto=compress&cs=tinysrgb&w=3000', position=1099, alt_tag='transit map')
    story_image36 = StoryImage(story_id=18, url='https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=3000', position=2629, alt_tag='glasses in front of coding computer')

    story_image37 = StoryImage(story_id=19, url='https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=3000', position=1162, alt_tag='wireframe planning')
    story_image38 = StoryImage(story_id=19, url='https://images.pexels.com/photos/4463588/pexels-photo-4463588.jpeg?auto=compress&cs=tinysrgb&w=3000', position=2381, alt_tag='person drawing on whiteboard')

    story_image39 = StoryImage(story_id=20, url='https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=1284, alt_tag='engineer looking at vertical monitor')
    story_image40 = StoryImage(story_id=20, url='https://images.pexels.com/photos/3861967/pexels-photo-3861967.jpeg?auto=compress&cs=tinysrgb&w=3000&h=3000&dpr=1', position=3055, alt_tag='software engineer at workstation')

    story_image41 = StoryImage(story_id=21, url='https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=3000', position=916, alt_tag='woman doing yoga with dog')
    story_image42 = StoryImage(story_id=21, url='https://images.pexels.com/photos/312839/pexels-photo-312839.jpeg?auto=compress&cs=tinysrgb&w=3000', position=1952, alt_tag='stones balancing on top of each other')

    story_image43 = StoryImage(story_id=22, url='https://images.pexels.com/photos/5255560/pexels-photo-5255560.jpeg?auto=compress&cs=tinysrgb&w=3000', position=805, alt_tag='tired woman')
    story_image44 = StoryImage(story_id=22, url='https://images.pexels.com/photos/5699866/pexels-photo-5699866.jpeg?auto=compress&cs=tinysrgb&w=3000', position=2212, alt_tag='confused woman')

    story_image45 = StoryImage(story_id=23, url='https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=3000', position=788, alt_tag='software engineer working on whiteboard')
    story_image46 = StoryImage(story_id=23, url='https://images.pexels.com/photos/4458418/pexels-photo-4458418.jpeg?auto=compress&cs=tinysrgb&w=3000', position=2591, alt_tag='software engineer at a cafe')

    story_image47 = StoryImage(story_id=24, url='https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80', position=820, alt_tag='figurine in front of code block')
    story_image48 = StoryImage(story_id=24, url='https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80', position=2570, alt_tag='engineer thinking')

    story_image49 = StoryImage(story_id=25, url='https://images.unsplash.com/photo-1632180807550-5a46d458b5a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80', position=845, alt_tag='pen and ink')
    story_image50 = StoryImage(story_id=25, url='https://images.unsplash.com/photo-1559678478-1839b04e292b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80', position=1968, alt_tag='pencil')



    story_image_list = [
        story_image1, story_image2, story_image3, story_image4,  # Add the first four StoryImage instances
        story_image5, story_image6, story_image7, story_image8,  # Add the StoryImage instances for story_id 3 and 4
        story_image9, story_image10, story_image11, story_image12,
        story_image13, story_image14, story_image15, story_image16,
        story_image17, story_image18, story_image19, story_image20,
        story_image21, story_image22, story_image23, story_image24,
        story_image25, story_image26, story_image27, story_image28,
        story_image29, story_image30, story_image31, story_image32,
        story_image33, story_image34, story_image35, story_image36,
        story_image37, story_image38, story_image39, story_image40,
        story_image41, story_image42, story_image43, story_image44,
        story_image45, story_image46, story_image47, story_image48,
        story_image49, story_image50
    ]

    for story_image_item in story_image_list:
        db.session.add(story_image_item)

    db.session.commit()

def undo_story_images():
    if environment == "production":
        db.session.execute(f'TRUNCATE table {SCHEMA}.story_images RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM story_images'))
        
    db.session.commit()
