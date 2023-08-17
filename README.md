# Well-Done

Well-Done is a collaborative and dynamic story-sharing social media application inspired by Medium. It offers users a platform to create, view, update, and delete stories, along with engaging features such as comments, likes, and follows. With personalized story feeds based on user follows and selected tags, Well-Done provides a tailored storytelling experience.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Usage](#usage)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [License](#license)

## Technologies Used
- JavaScript
- Python
- Flask
- SQLAlchemy
- AWS S3
- PostgreSQL
- Redux
- React

## Features
- CRUD (create, read, update, delete) stories
- CRUD comments on stories
- CRUD likes on stories and comments
- Follow and unfollow other users
- Personalized story feeds based on follows and selected tags
- User-friendly image upload using AWS S3
- Secure user authentication and authorization

## Usage
1. Clone the repository: `git clone https://github.com/yourusername/well-done.git`
2. Install dependencies for the frontend and backend: `npm install` in both `frontend` and `backend` directories.
3. Set up your environment variables for AWS S3 credentials and database connection.
4. Start the backend server: `npm start` in the `backend` directory.
5. Start the frontend development server: `npm start` in the `frontend` directory.
6. Access the application in your web browser at `http://localhost:3000`.

## Challenges and Solutions
### Asynchronous Data Handling
Handling asynchronous data fetching and updating the application state was a challenge. We used Redux combined with Redux Thunk to manage the global state and asynchronous actions. This allowed us to efficiently update the state after data was retrieved from the API.

### User Feed Personalization
Creating personalized story feeds based on user follows and selected tags required thoughtful design. We implemented a system to track user follows and preferences, allowing us to dynamically generate user-specific feeds.

### Secure Image Upload with AWS S3
Integrating AWS S3 for secure and efficient image upload added complexity. We ensured secure image handling by properly configuring AWS credentials and utilizing pre-signed URLs for image uploads.

### User Authentication and Authorization
Implementing secure user authentication and authorization was a critical aspect. We used Flask-Login for backend session management and Redux for frontend user sessions, adding layers of security like hashed passwords and input validation.

### Data Persistence
Maintaining data persistence across user sessions was crucial. We employed techniques like state management to store user settings, improving user experience by minimizing unnecessary data fetches.

## Code Snippets

### Story Page Component

#### Clap Section with Conditional Rendering

This section allows users to interact with the story's claps. It renders different buttons based on whether the current user is the author of the story or not. Users are also allowed to clap more than once on a story.

```
<div className="clap-container">
  {/* Unclap button */}
  {user?.id !== story?.authorInfo?.id && (
    <button className="unclap-button" onClick={handleUnclapClick}>
      -
    </button>
  )}
  <div className="clap-content">
    <img src={claps} alt="claps" className="claps-icon" />
    <div className="claps-count">{story.claps}</div>
  </div>
  {/* Clap button */}
  {user?.id !== story?.authorInfo?.id && (
    <button className="clap-button" onClick={handleClapClick}>
      +
    </button>
  )}
</div>
```

#### Author follow and unfollow

This section displays the author's information and provides functionality to follow or unfollow them. The feed of the current user will be tailored based on who they follow. We can also see approximately how much time it takes to read an article based on what the author's estimation.

```
<div className="author-section flex">
  <img
    src={story?.authorInfo?.profileImage}
    alt="author profile icon"
    className="author-image"
    onClick={() => navToFeed(`${story?.authorInfo?.firstName} ${story?.authorInfo?.lastName}`, 'authors')}
  />
  <div className="author-information memo-text">
    <div className='author-name-and-follow'>
      <div onClick={() => navToFeed(`${story?.authorInfo?.firstName} ${story?.authorInfo?.lastName}`, 'authors')}>
        {story?.authorInfo?.firstName} {story?.authorInfo?.lastName}
      </div>

      {user && user?.id !== story?.authorInfo?.id && (
        <button
          className="follow-unfollow-button"
          onClick={handleFollow}
        >
          {following ? ' · Unfollow' : ' · Follow'}
        </button>
      )}
    </div>
    <div>
      <div className="story-author">
        <p className="time">
          {story.timeToRead} min read · {date}
        </p>
      </div>
    </div>
  </div>
</div>
```

#### Story Content Rendering (Text and Images):

This section renders the story's content, both text and images, using the sorted content array. We're using parsing so that the boldened and italicized characters render properly.

```
<div className="story-content">
  {sortedContent &&
    sortedContent.map((item, index) => (
      <div key={index}>
        {item.text && (
          <div className={`memo-text`}>{parse(item.text)}</div>
        )}
        {item.image && (
          <img
            src={item.image}
            alt={item?.altTag}
            className={`story-image`}
          />
        )}
      </div>
    ))}
</div>
```

## Future Enhancements
- Enhanced user profiles with more personalized details
- Interactive notifications for likes, comments, and follows
- Option for public and private stories
- Integration with external APIs for rich media content

## Contributors
- [Donovan Crader](https://github.com/dcraderdev)
- [Isaiah Sinnathamby](https://github.com/isaiahxs)

## License
This project is licensed under the [MIT License](LICENSE).

---
**Disclaimer:** This project is inspired by Medium and is not affiliated with Medium or any related entities.

## Additional Installation & Deployment Methods

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/