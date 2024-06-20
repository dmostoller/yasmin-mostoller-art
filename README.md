# Social Artist Portfolio 

## Introduction
This project is an artist portfolio that allows users to signup and leave comments, allowing for a bit of social media style interactivity in what would otherwise be a traditional art portfolio.

'Normal' users can only view the various pages in the site, and add comments. The artist/owner/manager of the website has Admin level
access which allows them to Add, Delete and Edit resources as well as view them.

There are three main sections of the website:
A Blog on the homepage of the site, an Events page showing past and future events and exhibitions, and the Paintings page which is essentially an online gallery. 
From there, users can view individual paintings and if they are logged in they can leave comments on the paintings, otherwise they can only view the paintings and comments.
They also have the ability to delete their own comments, but not the comments of other users.
Finally, there is a simple about me section, as well as an email contact form. 

### Technology Used

This application was created with a React frontend, and a Python Flask-Restful / SQLAlchemy backend. Flask-Bycrypt is used for password hashing, Formik & Yup are used for form validation, the contact form uses EmailJS, and Fomantic-UI is used for styling.

### Models & Routes
There are 5 tables: Users, Paintings, Comments, Posts, and Events.
There are two one-to-many relationships that form a many to many relationship: Users---<Comments>----Paintings.
The Posts and Events tables are only accesible by the admins and therefor are self contained.

Every resource has two Flask-Resful classes for all routes, with every resource having GET, POST PATCH, and DELETE routes except users and comments. There are also authentication routes: Signup(POST), CheckSession(GET), Login(POST), and Logout(DELETE).


### Future Expansions
I plan to add a few features and then deploy the site, those include:
- Enabling the direct upload of photos instead of just linking to already hosted files
- Add PATCH route for user and a view to see or edit or delete the user.
- Fix the error handling of the login/signup forms
- Allow the Admin to be able to delete comments from any user
- Dark Mode or just a darker theme
- Integrate Formik validation with EmailJS
- Comments on posts as well as paintings
