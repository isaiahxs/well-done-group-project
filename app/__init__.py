import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User, Story, Follower, Clap, Comment, StoryImage, Tag, StoryTag
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.story_routes import story_routes
from .api.comment_routes import comment_routes
from .api.follow_routes import follow_routes
from .seeds import seed_commands
from .config import Config
from sqlalchemy import or_

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(story_routes, url_prefix='/api/story')
app.register_blueprint(comment_routes, url_prefix='/api/comment')
app.register_blueprint(follow_routes, url_prefix='/api/follow')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list



@app.route("/api/init")
def initial_load():
    """
    Eager Load data upon initialization 
    """
    stories = Story.query.all()
    # tags = Tag.query.all()
    return {
        'stories': [story.to_dict() for story in stories],
        # 'tags': [tag.to_dict() for tag in tags],
    }

# from .models import db, User, Story, Follower, Clap, Comment, StoryImage, Tag, StoryTag

@app.route("/api/search")
def search():
    """
    Search db based a string 
    """
    # Get search query from the request args
    search_query = request.args.get('q')

    stories = []
    if search_query:

        search_terms = search_query.split()

        conditions = [Story.title.ilike(f'%{term}%') for term in search_terms]
        author_conditions = [User.first_name.ilike(f'%{term}%') | User.last_name.ilike(f'%{term}%') for term in search_terms]

        # last_names = [Story.author.lastName.ilike(f'%{term}%') for term in search_terms]

        stories = Story.query.filter(or_(*conditions)).all()
        authors = User.query.filter(or_(*author_conditions)).all()
        # author1 = Story.query.filter(or_(*first_names)).all()
        # author2 = Story.query.filter(or_(*last_names)).all()

    return {
        'search': search_query,
        'stories': [story.safe_dict() for story in stories],
        'length': len(stories),
        'authors': [author.safe_dict() for author in authors]
        # 'authors': [*author1,*author2]

    }








@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')