#!/usr/bin/env python3
# Standard library imports
# Remote library imports
from flask import (
    request,
    abort,
    make_response,
    jsonify,
    request,
    session,
    redirect,
    render_template,
    send_from_directory,
    url_for,
    flash,
)
from werkzeug.utils import secure_filename
from werkzeug.exceptions import NotFound, Unauthorized, UnprocessableEntity
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from flask_cors import CORS
import random
from sqlalchemy import func


# Local imports
from config import app, db, api, os

# Add your model imports
from models import User, Painting, Comment, Post, Event, PostComment, Folder, Poll, MailingListEntry, Vote, poll_paintings

CORS(app)


# Views go here!
@app.route("/", defaults={'path': ''})
@app.route("/<string:path>")
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")

class Users(Resource):
    def post(self):
        try:
            form_json = request.get_json()
            if form_json["password"] == form_json["password_confirmation"]:
                new_user = User(
                    username=form_json["username"],
                    password_hash=form_json["password"],
                    email=form_json["email"],
                    is_admin=False,
                )
                db.session.add(new_user)
                db.session.commit()
                session["user_id"] = new_user.id
                response = make_response(
                    new_user.to_dict(rules=("-_password_hash",)), 201
                )
            else:
                raise AttributeError("Passwords must match")
        except IntegrityError:
            raise UnprocessableEntity(
                "The username or email is is already in use, please try again."
            )

        return response


class UpdateUser(Resource):
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                form_json = request.get_json()
                setattr(user, "username", form_json["username"])
                setattr(user, "password_hash", form_json["password"])
                setattr(user, "email", form_json["email"])
                db.session.commit()
                response = make_response(user.to_dict(rules=("-_password_hash",)), 200)
            except IntegrityError:
                raise UnprocessableEntity(
                    "The username or email is is already in use, please try again."
                )
        else:
            raise Unauthorized
        return response


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(rules=("-_password_hash",)), 200
        return make_response({"errors": "You must be logged in"}, 401)


class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        password = request.get_json()["password"]
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return make_response(user.to_dict(rules=("-_password_hash",)), 200)
        else:
            raise Unauthorized(
                "The username and/or password you have entered is incorrect. Please try again."
            )


class Logout(Resource):
    def delete(self):
        if session["user_id"] == None:
            return {"error": "No user found"}, 401
        session["user_id"] = None
        return {}, 204


api.add_resource(Users, "/users", endpoint="signup")
api.add_resource(UpdateUser, "/update_user/<int:id>", endpoint="update_user")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")


class Paintings(Resource):
    def get(self):
        paintings = [painting.to_dict() for painting in Painting.query.all()]
        reponse = make_response(paintings, 200)
        return reponse

    def post(self):
        try:
            sold_response = eval(request.get_json()["sold"].title())
            form_json = request.get_json()
            new_painting = Painting(
                title=form_json["title"],
                materials=form_json["materials"],
                width=form_json["width"],
                height=form_json["height"],
                sale_price=form_json["sale_price"],
                image=form_json["image"],
                folder_id=form_json["folder_id"],
                sold=sold_response,
            )
            db.session.add(new_painting)
            db.session.commit()
            response = make_response(new_painting.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 422)

        return response


class PaintingsById(Resource):
    def get(self, id):
        painting = Painting.query.filter_by(id=id).first()
        if painting:
            response = make_response(painting.to_dict(), 200)
        else:
            response = make_response({"error": "Painting not found"}, 404)
        return response

    def patch(self, id):
        painting = Painting.query.filter_by(id=id).first()
        if painting:
            try:
                sold_response = eval(request.get_json()["sold"].title())
                setattr(painting, "title", request.get_json()["title"])
                setattr(painting, "materials", request.get_json()["materials"])
                setattr(painting, "width", request.get_json()["width"])
                setattr(painting, "height", request.get_json()["height"])
                setattr(painting, "sale_price", request.get_json()["sale_price"])
                setattr(painting, "image", request.get_json()["image"])
                setattr(painting, "folder_id", request.get_json()["folder_id"])
                setattr(painting, "sold", sold_response)

                db.session.commit()
                response = make_response(painting.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Power not found"}, 404)

        return response

    def delete(self, id):
        painting = Painting.query.filter_by(id=id).first()
        if not painting:
            abort(404, "The painting you were looking for was not found")
        db.session.delete(painting)
        db.session.commit()
        response = make_response("", 204)
        return response


api.add_resource(Paintings, "/painting")
api.add_resource(PaintingsById, "/painting/<int:id>")


class Comments(Resource):
    def get(self):
        comments = [comment.to_dict() for comment in Comment.query.all()]
        reponse = make_response(comments, 200)
        return reponse

    def post(self):
        try:
            form_json = request.get_json()
            new_comment = Comment(
                comment=form_json["comment"],
                date_added=form_json["date_added"],
                painting_id=form_json["painting_id"],
                user_id=form_json["user_id"],
            )
            db.session.add(new_comment)
            db.session.commit()
            response = make_response(new_comment.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 422)

        return response


class CommentsById(Resource):
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            abort(404, "The comment was not found")
        db.session.delete(comment)
        db.session.commit()
        response = make_response("", 204)
        return response


api.add_resource(Comments, "/comment")
api.add_resource(CommentsById, "/comment/<int:id>")


class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        reponse = make_response(posts, 200)
        return reponse

    def post(self):
        now = datetime.now()
        date = now.date()
        try:
            form_json = request.get_json()
            new_post = Post(
                title=form_json["title"],
                content=form_json["content"],
                image_url=form_json["image_url"],
                video_url=form_json["video_url"],
                date_added=date,
            )
            db.session.add(new_post)
            db.session.commit()
            response = make_response(new_post.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 422)

        return response


class PostsById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            response = make_response(post.to_dict(), 200)
        else:
            response = make_response({"error": "Post not found"}, 404)
        return response

    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            try:
                for attr in request.get_json():
                    setattr(post, attr, request.get_json()[attr])
                    db.session.commit()
                    response = make_response(post.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Post not found"}, 404)
        return response

    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            abort(404, "The post you were looking for was not found")
        db.session.delete(post)
        db.session.commit()
        response = make_response("", 204)
        return response


api.add_resource(Posts, "/post")
api.add_resource(PostsById, "/post/<int:id>")

class PostComments(Resource):
    def get(self):
        comments = [comment.to_dict() for comment in PostComment.query.all()]
        reponse = make_response(comments, 200)
        return reponse

    def post(self):
        try:
            form_json = request.get_json()
            new_comment = PostComment(
                comment=form_json["comment"],
                date_added=form_json["date_added"],
                post_id=form_json["post_id"],
                user_id=form_json["user_id"],
            )
            db.session.add(new_comment)
            db.session.commit()
            response = make_response(new_comment.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 422)

        return response

class PostCommentsById(Resource):
    def delete(self, id):
        comment = PostComment.query.filter_by(id=id).first()
        if not comment:
            abort(404, "The comment was not found")
        db.session.delete(comment)
        db.session.commit()
        response = make_response("", 204)
        return response


api.add_resource(PostComments, "/post_comments")
api.add_resource(PostCommentsById, "/post_comments/<int:id>")


class Events(Resource):
    def get(self):
        events = [event.to_dict() for event in Event.query.all()]
        reponse = make_response(events, 200)
        return reponse

    def post(self):
        try:
            form_json = request.get_json()
            new_event = Event(
                name=form_json["name"],
                venue=form_json["venue"],
                location=form_json["location"],
                details=form_json["details"],
                image_url=form_json["image_url"],
                event_date=form_json["event_date"],
                event_link=form_json["event_link"],
            )
            db.session.add(new_event)
            db.session.commit()
            response = make_response(new_event.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 422)

        return response


class EventsById(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            response = make_response(event.to_dict(), 200)
        else:
            response = make_response({"error": "Post not found"}, 404)
        return response

    def patch(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            try:
                for attr in request.get_json():
                    setattr(event, attr, request.get_json()[attr])
                    db.session.commit()
                    response = make_response(event.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Event not found"}, 404)
        return response

    def delete(self, id):
        event = Event.query.filter_by(id=id).first()
        if not event:
            abort(404, "The event you were looking for was not found")
        db.session.delete(event)
        db.session.commit()
        response = make_response("", 204)
        return response


api.add_resource(Events, "/event")
api.add_resource(EventsById, "/event/<int:id>")


class Folders(Resource):
    def get(self):
        folders = [folder.to_dict() for folder in Folder.query.all()]
        reponse = make_response(folders, 200)
        return reponse

    def post(self):
        try:
            form_json = request.get_json()
            new_folder = Folder(
                name=form_json["name"],
            )
            db.session.add(new_folder)
            db.session.commit()
            response = make_response(new_folder.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 422)

        return response


class FoldersById(Resource):
    def delete(self, id):
        folder = Folder.query.filter_by(id=id).first()
        if not folder:
            abort(404, "The folder was not found")
        db.session.delete(folder)
        db.session.commit()
        response = make_response("", 204)
        return response
    
    def patch(self, id):
        folder = Folder.query.filter_by(id=id).first()
        if folder:
            try:
                for attr in request.get_json():
                    setattr(folder, attr, request.get_json()[attr])
                    db.session.commit()
                    response = make_response(folder.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Folder not found"}, 404)
        return response


api.add_resource(Folders, "/folder")
api.add_resource(FoldersById, "/folder/<int:id>")


class VoteResource(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        painting_id = data.get('painting_id')

        user = MailingListEntry.query.filter_by(email=email).first()
        if not user:
            user = MailingListEntry(name=name, email=email)
            db.session.add(user)
            db.session.commit()

        poll = Poll.query.filter(Poll.start_date <= datetime.utcnow(), Poll.end_date >= datetime.utcnow()).first()
        if not poll:
            return {'message': 'No active poll'}, 400

        vote = Vote(painting_id=painting_id, poll_id=poll.id, user_id=user.id)
        db.session.add(vote)
        db.session.commit()

        return {'message': 'Vote submitted successfully'}, 201
api.add_resource(VoteResource, '/vote')

    
@app.route('/check_vote', methods=['POST'])
def check_vote():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    try:
        # Assuming you have a way to get the current poll ID
        current_poll = Poll.query.filter(Poll.start_date <= datetime.utcnow(), Poll.end_date >= datetime.utcnow()).first()

        if not current_poll:
            return jsonify({'error': 'No active poll found'}), 404

        # Find the mailing list entry for the given email
        mailing_list_entry = MailingListEntry.query.filter_by(email=email).first()

        if not mailing_list_entry:
            return jsonify({'hasVoted': False})  # If the email is not in the mailing list, they haven't voted

        # Check if there is an existing vote for the mailing list entry in the current poll
        existing_vote = Vote.query.filter_by(user_id=mailing_list_entry.id, poll_id=current_poll.id).first()

        if existing_vote:
            return jsonify({'hasVoted': True})
        else:
            return jsonify({'hasVoted': False})
    except Exception as e:
        print(f'Error checking vote: {e}')
        return jsonify({'error': 'Internal server error'}), 500
    
@app.route('/api/polls/check_dates', methods=['POST'])
def check_dates():
    data = request.get_json()
    start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d')
    end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d')

    if not start_date or not end_date:
        return jsonify({'error': 'Start date and end date are required'}), 400

    try:
        existing_poll = Poll.query.filter(
            (Poll.start_date <= end_date) & (Poll.end_date >= start_date)
        ).first()

        if existing_poll:
            return jsonify({'exists': True})
        else:
            return jsonify({'exists': False})
    except Exception as e:
        print(f'Error checking poll dates: {e}')
        return jsonify({'error': 'Internal server error'}), 500

    

class AdminPollResource(Resource):
    def get(self):
        polls = [poll.to_dict() for poll in Poll.query.all()]
        reponse = make_response(polls, 200)
        return reponse

    def post(self):
        data = request.get_json()
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
        painting_ids = data['painting_ids']

        new_poll = Poll(start_date=start_date, end_date=end_date)
        db.session.add(new_poll)
        db.session.commit()

        for painting_id in painting_ids:
            db.session.execute(poll_paintings.insert().values(poll_id=new_poll.id, painting_id=painting_id))

        db.session.commit()
        response = make_response(new_poll.to_dict(), 201)

        return response


    def delete(self, poll_id):
        poll = Poll.query.get(poll_id)
        if not poll:
            return jsonify({'message': 'Poll not found'}), 404

        # Delete all related votes
        Vote.query.filter_by(poll_id=poll_id).delete()

        # Delete the poll
        db.session.delete(poll)
        db.session.commit()
        return jsonify({'message': 'Poll deleted successfully'})

api.add_resource(AdminPollResource, '/poll', '/poll/<int:poll_id>')


@app.route('/current_poll', methods=['GET'])
def get_current_poll():
    current_date = datetime.utcnow()
    current_poll = Poll.query.filter(Poll.start_date <= current_date, Poll.end_date >= current_date).first()
    if current_poll:
        response = make_response(current_poll.to_dict(), 201)
    else:
        response = jsonify({'message': 'No active poll found'}), 404
    return response

@app.route('/polls', methods=['GET'])
def get_polls():
    polls = Poll.query.all()
    result = []
    for poll in polls:
        poll_data = {
            'id': poll.id,
            'start_date': poll.start_date.strftime('%Y-%m-%d'),
            'end_date': poll.end_date.strftime('%Y-%m-%d'),
            'paintings': []
        }
        for painting in poll.paintings:
            vote_total = db.session.query(func.count(Vote.id)).filter_by(painting_id=painting.id, poll_id=poll.id).scalar()
            poll_data['paintings'].append({
                'id': painting.id,
                'title': painting.title,
                'image': painting.image,
                'vote_total': vote_total
            })
        result.append(poll_data)
    return jsonify(result)


@app.route('/api/polls/<int:poll_id>/random_vote', methods=['GET'])
def get_random_vote(poll_id):
    vote = db.session.query(Vote, MailingListEntry).join(MailingListEntry, Vote.user_id == MailingListEntry.id).filter(Vote.poll_id == poll_id).order_by(func.random()).first()
    if vote:
        vote, user = vote
        return jsonify({
            'voter_name': user.name,
            'voter_email': user.email
        })
    else:
        return jsonify({'message': 'No votes found for this poll'}), 404

@app.route('/next_poll_start_date', methods=['GET'])
def get_next_poll_start_date():
    next_poll = Poll.query.filter(Poll.start_date > datetime.utcnow()).order_by(Poll.start_date).first()
    if next_poll:
        return jsonify({'start_date': next_poll.start_date.isoformat()})
    else:
        return jsonify({'message': 'No upcoming polls found'}), 404


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        {"message": "Not Found: Sorry the resource you are looking for does not exist"},
        404,
    )
    return app.send_static_file('index.html')


@app.errorhandler(Unauthorized)
def handle_unauthorized(e):
    response = make_response(
        {"message": "Unauthorized: you must be logged in to make that request."},
        401,
    )
    return response


@app.errorhandler(UnprocessableEntity)
def handle_unprocessable_entity(e):
    response = make_response(
        {"message": "Unprocessable Entity: Username is already in use."},
        422,
    )
    return response


if __name__ == "__main__":
    app.run(port=5555, debug=True)
