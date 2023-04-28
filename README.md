# BYOB

**Team:**

- Edward Sohn - Software Developer
- Garrett Hoffman - Software Developer
- Timi Thompson - Software Developer
- David Jimenez - Software Developer

## Design

Project Link: https://byob1.gitlab.io/byob

Introducing BYOB, Bring your own backyard, a community-focused React application that aims to connect backyard gardeners with a platform to share their produce. BYOB is built using FastAPI and PostgreSQL to provide a robust and scalable backend architecture.

BYOB leverages Redux and RTK Query to manage state and provide efficient data fetching, ensuring a seamless front-end experience for users. The use of Tailwind also ensures a clean and modern user interface that is both responsive and user-friendly.

The application's main feature is the ability for users to create posts about the produce they grow in their backyards. The community-focused platform aims to promote sharing and community-building around the shared interest of homegrown produce. Users can create an account to join the community, create posts, and interact with other users by sharing each other's crops through a delivery system. (In construction now)

BYOB's backend architecture consists of a FastAPI server that provides endpoints for CRUD operations on the PostgreSQL database. The server's modularity allows for easy scaling and maintenance, while the use of database migrations ensures data consistency and schema updates.

Overall, BYOB provides a seamless user experience while promoting community building around the shared interest of homegrown produce.

## BYOB Wireframe Design

#### User Sign Up and Login

![User Sign Up and Login](https://i.gyazo.com/1a98b5fa7f344c06ed9243b50f0c9a0c.png)

#### List of Posts and Post Detail

![List of Posts and Post Detail](https://i.gyazo.com/3f124e450d9a2d18d75870845fdc04fb.png)

#### Create/Update Post/Produce Forms

![Create/Update Post/Produce Forms](https://i.gyazo.com/1c7a3a1c899efef62b892cf2e8cb9766.png)

#### Profile Page

![Profile Page](https://i.gyazo.com/0c89bbe89609c16aab9e4e2bc266e52e.png)

## Getting Started

Please have Docker Desktop downloaded before continuing with the following directions listed below.

#### Cloning the Repository

1. Inside your terminal, change to a directory that you would like to clone this project into.

2. In your terminal, type: `git clone https://gitlab.com/byob1/byob.git`

3. Switch into the project directory:

#### Starting up Docker

After running the commands above, type and press enter after each command listed below:

1. `docker volume create byob-data`

2. `docker volume create pg-admin`

3. `docker-compose build`

4. `docker-compose up`

After successfully following the steps outlined above, you should see all 4 containers running.

![Successful Docker containers](https://i.gyazo.com/7bb313354f6a532e06edbbec816f74ba.png)

#### Localhost Resources

- The port to view the React-based Front end is located at `http:localhost:3000`
- The port to view the FastAPI Documentation is located at `http:localhost:8000/docs`
- The port settings for the Database is located at `http:localhost:15432`

## API Outline

#### BYOB Endpoints

#### User

|       Action       | Method |                 URL                  |
| :----------------: | :----: | :----------------------------------: |
| Landing Page/Login |  GET   |        http://localhost:3000/        |
|      Sign Up       |  POST  |     http://localhost:3000/signup     |
| User Profile View  |  GET   | http://localhost:3000/users/:user_id |

#### Produce

|     Action     | Method |                               URL                               |
| :------------: | :----: | :-------------------------------------------------------------: |
|  List Produce  |  GET   |          http://localhost:3000/users/:user_id/produce           |
| Create Produce |  POST  |        http://localhost:3000/users/:user_id/produce/new         |
|  Produce View  |  GET   |    http://localhost:3000/users/:user_id/produce/:produce_id     |
| Update Produce |  PUT   | http://localhost:3000/users/:user_id/produce/:produce_id/update |

#### Posts

|    Action    | Method |                     URL                      |
| :----------: | :----: | :------------------------------------------: |
|  List Posts  |  GET   |         http://localhost:3000/posts          |
| Create Posts |  POST  |          http://localhost:3000/post          |
|  Posts View  |  GET   |    http://localhost:3000/posts/:posts_id     |
| Update Posts |  PUT   | http://localhost:3000/posts/:posts_id/update |
