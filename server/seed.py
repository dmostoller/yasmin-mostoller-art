#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import datetime 
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Painting, Event, Post

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing tables...")
        User.query.delete()
        Comment.query.delete()
        Painting.query.delete()
        Event.query.delete()
        Post.query.delete()

        print("Seeding users...")
        users = [
            User(username="Dave", email="dmostoller@gmail.com", password_hash="bass", is_admin=True),
            User(username="Yasi", email="yasmin.nunsy@gmail.com", password_hash="lily", is_admin=True)
        ]

        db.session.add_all(users)

        print("Seeding paintings")
        paintings = [
            Painting(title="Infinity Prolonged", 
                     materials="Mixed Media on Canvas", 
                     width=62, 
                     height=77, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_1f2db3f1efae41e692e98fcef5e11e0d~mv2.jpg/v1/fill/w_365,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-43.jpg", 
                     sold=False),
            Painting(title="Nirvana", 
                     materials="Mixed Media on Canvas", 
                     width=62, 
                     height=78, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_fad375d839b643c98c5e2955a65a1414~mv2.jpg/v1/fill/w_344,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-42.jpg", 
                     sold=False),
            Painting(title="Samsara", 
                     materials="Mixed Media on Canvas", 
                     width=62, 
                     height=77, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_2ed238bf0e47489f83c3063229952328~mv2.jpg/v1/fill/w_370,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Untitled%2062x77_edited.jpg", 
                     sold=False),
            Painting(title="Untitled", 
                     materials="Mixed Media on Canvas", 
                     width=48, 
                     height=52, 
                     sale_price=5000, 
                     image="https://previews.dropbox.com/p/thumb/ACLoEyOE5EgBDb2Bl5lcGHzdn0TNriCg-2EQcF3a0Bga5Mm5oPkSpa-8z7NBk62Ct6heGca09Hz2CMngrvguVBOi9wi_pVGwxX45nhrWObttWKJsF-9ZVHxg2Q1qE_pLZ1lO78CCejT_mJwB6xgHyd7Fjf7XbZogeGHD-Fo2nUmeNIuIRWuu4Ol0zcsR1y2vZshsPwXHq6upsB_BIDV1oAnIpK2IinXyCBk2-h5RUfxP7ZKrskJ8iP8avvU_1HxPSekkQlj31sb0kSkRdDBiXM_Pyef0uD33AyewwD9WfYqE4xUPUrMHnxXQ69KiTXWu5D2eBRjywymE6jTjoMGejxur/p.jpeg", 
                     sold=True),
            Painting(title="Guided by Gaudi", 
                     materials="Mixed Media on Canvas", 
                     width=24, 
                     height=48, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_546882f81c334a8f8c75cc1a40981cf9~mv2.jpg/v1/fill/w_217,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-46.jpg", 
                     sold=True),
            Painting(title="Galaxy 1", 
                     materials="Mixed Media on Canvas", 
                     width=30, 
                     height=48, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_0d86638c0dfd4e2899f67af022647612~mv2.jpg/v1/fill/w_272,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-26.jpg", 
                     sold=False),
            Painting(title="Abstract Ape", 
                     materials="Mixed Media on Canvas", 
                     width=24, 
                     height=24, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_d05e2d8f44a94ad58f184d785195f808~mv2.jpg/v1/fill/w_438,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-47.jpg", 
                     sold=True),
            Painting(title="Nebulae", 
                     materials="Mixed Media on Canvas", 
                     width=30, 
                     height=48, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_2f5da1d2760f4a8f865c01bb9ccf2656~mv2.jpg/v1/fill/w_272,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-36.jpg", 
                     sold=False),
            Painting(title="Ancestral Spirit", 
                     materials="Mixed Media on Canvas", 
                     width=22, 
                     height=28, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_8d65293fb2944084ab5dfb0ac171535a~mv2.jpg/v1/fill/w_342,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-31.jpg", 
                     sold=False),
            Painting(title="Blue Dream", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=36, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_14e0512e00d0477eb829f9a824dbaa46~mv2.jpg/v1/fill/w_441,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-25.jpg", 
                     sold=True),
            Painting(title="Sleeping Giants", 
                     materials="Mixed Media on Canvas", 
                     width=48, 
                     height=60, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_6e0969959277475b9f075c02bdb82d5e~mv2.jpg/v1/fill/w_344,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-27.jpg", 
                     sold=True),
            Painting(title="Interplanetary", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=36, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_7ab7a3fe0fc94d5fb684de05d7ff3948~mv2.jpg/v1/fill/w_439,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-28.jpg", 
                     sold=True),
            Painting(title="Butterfly", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=36, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_c77d79de1819431ab52708f005c67560~mv2.jpg/v1/fill/w_438,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Butterfly.jpg", 
                     sold=False),
            Painting(title="Volcano", 
                     materials="Mixed Media on Canvas", 
                     width=30, 
                     height=48, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_aaa775c24f14420e925e9086a0c685a9~mv2.jpg/v1/fill/w_275,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-37.jpg", 
                     sold=True),
            Painting(title="Sol System", 
                     materials="Mixed Media on Canvas", 
                     width=48, 
                     height=43, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_42b0f1a68623472a8e6a9ef51f1b057c~mv2.jpg/v1/fill/w_491,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-33.jpg", 
                     sold=True),
            Painting(title="Sun Scene I", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=48, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_57d029fd43ad49b5acba4d427b1de9c0~mv2.jpg/v1/fill/w_328,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-38.jpg", 
                     sold=False),
            Painting(title="Sun Scene II", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=48, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_858ae03bceb04012ab3f117d7b2499ab~mv2.jpg/v1/fill/w_329,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Sun%20Scene%20II.jpg", 
                     sold=False),
            Painting(title="Windows", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=48, 
                     sale_price=5000, 
                     image="https://static.wixstatic.com/media/1d469b_51aab7836d6e4315ac3f01b31117cd88~mv2.jpg/v1/fill/w_328,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-35.jpg", 
                     sold=False)
        ]

        db.session.add_all(paintings)
        
        print("Seeding posts")
        posts = [
            Post(title="My first post", 
                 content=fake.text(), 
                 image_url="./images/YASI_PAINTINGS_WEB-3.jpg", 
                 date_added=datetime.datetime.now()
                 ),
            Post(title="My second post", 
                 content=fake.text(), 
                 image_url="./images/slider-4.jpg", 
                 date_added=datetime.datetime.now()
                 ),
            Post(title="My third post", 
                 content=fake.text(), 
                 image_url="./images/slider-3.jpg", 
                 date_added=datetime.datetime.now()
                 )
        ]
        
        db.session.add_all(posts)

        print("Seeding events")
        events = [
            Event(name="Dream Gallery",
                  venue="Illuminate Collective",
                  location="1714 N. Mascher St, Philadelphia, PA",
                  details="!Special Announcement Coming in Hot! Excited to announce our road to lucid dream festival “Dream Gallery” first Friday weekend event! We will be featuring artists involved with lucid dream festival directly supporting and from the Philadelphia area! Come check out so amazing art installations and a special interactive gallery show with special musical guests followed by a intimate music show on Saturday featuring some of Philadelphia's staples in the dance music community!",
                  image_url = "./images/illuminate-1.jpeg",
                  event_date="03/01/2024",
                  event_link="https://www.instagram.com/illuminate_collective_phl/"
            ),
            Event(name="Dream Gallery 2",
                  venue="Illuminate Collective",
                  location="1714 N. Mascher St, Philadelphia, PA",
                  details="!Special Announcement Coming in Hot! Excited to announce our road to lucid dream festival “Dream Gallery” first Friday weekend event! We will be featuring artists involved with lucid dream festival directly supporting and from the Philadelphia area! Come check out so amazing art installations and a special interactive gallery show with special musical guests followed by a intimate music show on Saturday featuring some of Philadelphia's staples in the dance music community!",
                  image_url = "./images/illuminate-2.jpeg",
                  event_date="03/02/2024",
                  event_link="https://www.instagram.com/illuminate_collective_phl/"
            )
        ]
        
        db.session.add_all(events)
        
        db.session.commit()

        print("Done seeding.")