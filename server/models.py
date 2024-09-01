from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt
from wtforms.validators import ValidationError
from datetime import datetime


# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False, index=True)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    is_admin = db.Column(db.Boolean)

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete')
    post_comments = db.relationship('PostComment', back_populates='user', cascade='all, delete')

    serialize_rules = ('-comments.user', )
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates
    def validate_username(self, key, username):
        if not username:
            raise ValueError('You must enter a username')
        if User.query.filter_by(username=username).first():
            raise ValidationError("Username already in use")
        return username
    
    @validates
    def validate_email(self, key, email):
        if not email:
            raise ValueError('You must enter a email')
        if User.query.filter_by(email=email).first():
            raise ValidationError("Email already in use")
        return email

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'
    
class Painting(db.Model, SerializerMixin):
    __tablename__ = 'paintings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    materials = db.Column(db.String)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    price = db.Column(db.String)
    sale_price = db.Column(db.Integer)
    image = db.Column(db.String)
    sold = db.Column(db.Boolean)

    comments = db.relationship('Comment', back_populates='painting', cascade='all, delete')

    folder_id = db.Column(db.Integer, db.ForeignKey('folders.id'))
    folder = db.relationship('Folder', back_populates='paintings')

    serialize_rules = ('-comments.painting', '-folder.paintings', '-polls.paintings', '-votes')

    def __repr__(self):
        return f'<Painting {self.id}>'
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)    
    comment = db.Column(db.String)
    date_added = db.Column(db.String)

    painting_id = db.Column(db.Integer, db.ForeignKey('paintings.id'))
    painting = db.relationship('Painting', back_populates='comments')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='comments')

    serialize_rules = ('-painting.comments', '-user.comments')

    def __repr__(self):
        return f'<Comment {self.id}>'
    
class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    image_url = db.Column(db.String)
    video_url = db.Column(db.String)
    date_added = db.Column(db.String)

    post_comments = db.relationship('PostComment', back_populates='post', cascade='all, delete')

    serialize_rules = ('-post_comments.post', '-user.posts')


    def __repr__(self):
        return f'<Post {self.id}>'
    
class PostComment(db.Model, SerializerMixin):
    __tablename__ = 'post_comments'

    id = db.Column(db.Integer, primary_key=True)    
    comment = db.Column(db.String)
    date_added = db.Column(db.String)

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post = db.relationship('Post', back_populates='post_comments')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='post_comments')

    serialize_rules = ('-post.post_comments', '-user.post_comments')

    def __repr__(self):
        return f'<Comment {self.id}>'  
    
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    venue = db.Column(db.String)
    location = db.Column(db.String)
    details = db.Column(db.String)
    image_url = db.Column(db.String)
    event_date = db.Column(db.String)
    event_link = db.Column(db.String)

    def __repr__(self):
        return f'<Event {self.id}>'
    

class Folder(db.Model, SerializerMixin):
    __tablename__ = 'folders'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    paintings = db.relationship('Painting', back_populates='folder')

    serialize_rules = ('-paintings.folder', )

    def __repr__(self):
        return f'<Folder {self.id}>'
    
    
class MailingListEntry(db.Model, SerializerMixin):
    __tablename__ = 'mailing_list_entries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    serialize_rules = ('-votes', '-polls')


class Poll(db.Model, SerializerMixin):
    __tablename__ = 'polls'
    
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=False)
    paintings = db.relationship('Painting', secondary='poll_paintings', backref=db.backref('polls', lazy=True))

    serialize_rules = ('-polls.paintings', '-votes' )


class Vote(db.Model, SerializerMixin):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True)
    painting_id = db.Column(db.Integer, db.ForeignKey('paintings.id'), nullable=False)
    poll_id = db.Column(db.Integer, db.ForeignKey('polls.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('mailing_list_entries.id'), nullable=False)

    serialize_rules = ('-painting.votes', '-poll.votes', '-user.votes')


poll_paintings = db.Table('poll_paintings',
    db.Column('poll_id', db.Integer, db.ForeignKey('polls.id'), primary_key=True),
    db.Column('painting_id', db.Integer, db.ForeignKey('paintings.id'), primary_key=True)
)