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

    story_image51 = StoryImage(story_id=26, url='https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='athletic performance')
    story_image52 = StoryImage(story_id=26, url='https://media.istockphoto.com/id/1405057333/photo/soccer-stadium-corridor.webp?b=1&s=170667a&w=0&k=20&c=L9gnXo3y9a3TBC6ny_va56V9dIg4gAYps8CPyEi3jWs=', position=55555, alt_tag='fitness goals')

    story_image53 = StoryImage(story_id=27, url='https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVubmlzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='personal growth')
    story_image54 = StoryImage(story_id=27, url='https://media.istockphoto.com/id/1405057333/photo/soccer-stadium-corridor.webp?b=1&s=170667a&w=0&k=20&c=L9gnXo3y9a3TBC6ny_va56V9dIg4gAYps8CPyEi3jWs=', position=55555, alt_tag='self-improvement journey')

    story_image55 = StoryImage(story_id=28, url='https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60', position=0, alt_tag='healthy lifestyle')
    story_image56 = StoryImage(story_id=28, url='https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='balanced living')

    story_image57 = StoryImage(story_id=29, url='https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BvcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='self-development')
    story_image58 = StoryImage(story_id=29, url='https://media.istockphoto.com/id/1405057333/photo/soccer-stadium-corridor.webp?b=1&s=170667a&w=0&k=20&c=L9gnXo3y9a3TBC6ny_va56V9dIg4gAYps8CPyEi3jWs=', position=55555, alt_tag='personal growth mindset')

    story_image59 = StoryImage(story_id=30, url='https://images.unsplash.com/photo-1529229504105-4ea795dcbf59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='wellness')
    story_image60 = StoryImage(story_id=30, url='https://images.unsplash.com/photo-1550026593-f369f98df0af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='healthy habits')

    story_image61 = StoryImage(story_id=31, url='https://plus.unsplash.com/premium_photo-1664369473300-092cc0178416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoJTIwYW5kJTIwd2VsbG5lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='health and fitness')
    story_image62 = StoryImage(story_id=31, url='https://images.unsplash.com/photo-1501747315-124a0eaca060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoJTIwYW5kJTIwd2VsbG5lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='well-being')

    story_image63 = StoryImage(story_id=32, url='https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhbHRoJTIwYW5kJTIwd2VsbG5lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='travel destinations')
    story_image64 = StoryImage(story_id=32, url='https://images.unsplash.com/photo-1444312645910-ffa973656eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlYWx0aCUyMGFuZCUyMHdlbGxuZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='adventure')

    story_image65 = StoryImage(story_id=33, url='https://media.istockphoto.com/id/1347628652/photo/heartbeat-line-on-red-apple-and-stethoscope-healthy-heart-diet-concept.webp?b=1&s=170667a&w=0&k=20&c=wujdoAMyZvyZL0YJ5CHnKwcRlr1lYNofZ5QNxpT73bI=', position=0, alt_tag='lifestyle choices')
    story_image66 = StoryImage(story_id=33, url='https://media.istockphoto.com/id/628504820/photo/they-keep-each-other-going.webp?b=1&s=170667a&w=0&k=20&c=vTa0zP-PpYCOMfEpKESbpfXz69Y8CUDg2LnauTP5WIw=', position=55555, alt_tag='healthy living')

    story_image67 = StoryImage(story_id=34, url='https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhpbG9zb3BoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='philosophical thoughts')
    story_image68 = StoryImage(story_id=34, url='https://images.unsplash.com/photo-1604931668626-ab49cb27d952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhpbG9zb3BoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='deep thinking')

    story_image69 = StoryImage(story_id=35, url='https://images.unsplash.com/photo-1502700807168-484a3e7889d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhpbG9zb3BoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='creative photography')
    story_image70 = StoryImage(story_id=35, url='https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0JTIwY3JlYXRpdmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='artistic design')

    story_image71 = StoryImage(story_id=36, url='https://images.unsplash.com/photo-1485546784815-e380f3297414?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXJ0JTIwY3JlYXRpdmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='inspiration')
    story_image72 = StoryImage(story_id=36, url='https://images.unsplash.com/photo-1488274319148-051ed60a9404?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJ0JTIwY3JlYXRpdmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='creativity')

    story_image73 = StoryImage(story_id=37, url='https://images.unsplash.com/photo-1634621389197-d5f3b0056861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBoaWxvc29waHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='philosophy')
    story_image74 = StoryImage(story_id=37, url='https://images.unsplash.com/photo-1532007195987-bb4ddeaf052d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2lzZG9tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='wisdom')

    story_image75 = StoryImage(story_id=38, url='https://images.unsplash.com/photo-1528217580778-96e570819666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBoaWxvc29waHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='design inspiration')
    story_image76 = StoryImage(story_id=38, url='https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5ub3ZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='innovation')

    story_image77 = StoryImage(story_id=39, url='https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zcGlyYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='lifestyle inspiration')
    story_image78 = StoryImage(story_id=39, url='https://media.istockphoto.com/id/1405057333/photo/soccer-stadium-corridor.webp?b=1&s=170667a&w=0&k=20&c=L9gnXo3y9a3TBC6ny_va56V9dIg4gAYps8CPyEi3jWs=', position=55555, alt_tag='positive living')

    story_image79 = StoryImage(story_id=40, url='https://images.unsplash.com/photo-1508169351866-777fc0047ac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBoaWxvc29waHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='writing inspiration')
    story_image80 = StoryImage(story_id=40, url='https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9saXRpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='political analysis')

    story_image81 = StoryImage(story_id=41, url='https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlmZXN0eWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='storytelling')
    story_image82 = StoryImage(story_id=41, url='https://images.unsplash.com/photo-1494797262163-102fae527c62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBoaWxvc29waHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='narrative')

    story_image83 = StoryImage(story_id=42, url='https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9saXRpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='political insights')
    story_image84 = StoryImage(story_id=42, url='https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9saXRpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='current affairs')

    story_image85 = StoryImage(story_id=43, url='https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBoaWxvc29waHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='creative writing')
    story_image86 = StoryImage(story_id=43, url='https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvbGl0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='expressive words')

    story_image87 = StoryImage(story_id=44, url='https://images.unsplash.com/photo-1528217580778-96e570819666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBoaWxvc29waHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='writing ideas')
    story_image88 = StoryImage(story_id=44, url='https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9saXRpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='political commentary')

    story_image89 = StoryImage(story_id=45, url='https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60', position=0, alt_tag='writing inspiration')
    story_image90 = StoryImage(story_id=45, url='https://images.unsplash.com/photo-1508169351866-777fc0047ac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBoaWxvc29waHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', position=55555, alt_tag='political discourse')

    story_image91 = StoryImage(story_id=46, url='https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='data science')
    story_image92 = StoryImage(story_id=46, url='https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60', position=92, alt_tag='machine learning')

    story_image93 = StoryImage(story_id=47, url='https://images.unsplash.com/photo-1561548474-2ad2d3e58e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29jaW9sb2d5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='sociology')

    story_image94 = StoryImage(story_id=48, url='https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='JavaScript')
    story_image95 = StoryImage(story_id=48, url='https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60', position=95, alt_tag='Python')

    story_image96 = StoryImage(story_id=49, url='https://images.unsplash.com/photo-1564053489984-317bbd824340?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2NpZW5jZSUyMGhpc3Rvcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60', position=96, alt_tag='science')
    story_image97 = StoryImage(story_id=49, url='https://images.unsplash.com/photo-1576670262859-72c27ea017f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2NpZW5jZSUyMGhpc3Rvcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60', position=97, alt_tag='history')

    story_image98 = StoryImage(story_id=50, url='https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='music')

    story_image99 = StoryImage(story_id=51, url='https://images.unsplash.com/photo-1631556097152-c39479bbff93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlvbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='biology')

    story_image100 = StoryImage(story_id=52, url='https://images.unsplash.com/photo-1561548475-0630129ec294?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29jaW9sb2d5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='sociology')

    story_image101 = StoryImage(story_id=53, url='https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW50ZXJ0YWlubWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='entertainment')

    story_image102 = StoryImage(story_id=54, url='https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='cooking')

    story_image103 = StoryImage(story_id=55, url='https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='fashion')

    story_image104 = StoryImage(story_id=56, url='https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60', position=0, alt_tag='architecture')






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
        story_image49, story_image50, story_image51, story_image52, 
        story_image53, story_image54, story_image55, story_image56,
        story_image57, story_image58, story_image59, story_image60, 
        story_image61, story_image62, story_image63, story_image64, 
        story_image65, story_image66, story_image67, story_image68, 
        story_image69, story_image70, story_image71, story_image72, 
        story_image73, story_image74, story_image75, story_image76, 
        story_image77, story_image78, story_image79, story_image80, 
        story_image81, story_image82, story_image83, story_image84, 
        story_image85, story_image86, story_image87, story_image88, 
        story_image89, story_image90, story_image91, story_image92, 
        story_image93, story_image94, story_image95, story_image96,
        story_image97, story_image98, story_image99, story_image100, 
        story_image101, story_image102, story_image103, story_image104
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
