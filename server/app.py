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


# Local imports
from config import app, db, api, os

# Add your model imports
from models import User, Painting, Comment, Post, Event, PostComment

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
