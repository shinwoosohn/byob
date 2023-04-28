[TOC]

# Journals

## 4/28/2023 - Finalizing Deployment and Graded Walkthrough

Today, I worked on:

- Attempting to debug a deployment 404 random get to a /string - fail
- Finish Readme API outline

The project is finally done, but the website is still in heavy construction mode. Now that we don't
have a graded deadline hanging over and have a GLORY deadline, we need to focus much more.
FOR THE GLORY!!!

This project has taught me a lot, both about working in a team development environment and my own
passion for development. I really enjoy python backend and feel strongly about my ability to successfully
comprehend error codes and debug. I will do my best to explore my capability in this high focus
frontend final Stretch Goal week.

## 4/27/2023 - Finalizing Deployment

Today, I worked on:

- Clear routing bug on deployment related to using anchor tags - Success
- Full Test deployment with limited to no bugs or console errors - Success
- Write Readme API endpoints dropdowns with inputs/ outputs - Success
- Add Update buttons to detail cards to access the update forms - Success
- Add delete buttons to Update forms to delete the object - Success

We were able to clear all functionality bugs today and do a full deployment test without any minimal
bugs and it feels good. The CSS is still in a construction state, but the grading should only be done
on a level checking the CRUD functionality, so all our members are covered. It was a team effort where
SEIRs not having much redux experience came into play, so everyone get to test ideas.

The deployment bugs related to anchor tags which are hard href's, so switching to the JSX Link appropriate
tag solved all the issues. Initially thought it was an issue with the basename since it was replacing the portion
after our domain with blank; however it wraps all our links, so using the react hooks properly solved all issues.
There are still some small final updates for the walkthrough, but taking a break because we earned it.

## 4/26/2023 - Work on getting all MVP1 Forms - Create / Update

Today, I worked on:

- Debug and update the Create and Update produce forms with David
- Update the create post form and create the update post form ... lol
- Assist with teammates debugging other components
- Debug backend Update produce api method using an incorrect reference and not setting the update

I don't want to go into too much info. Such is life and I'm still learning a lot. I'm simply
trying to manage my attitude with working through the pain. With Alex - SEIR's help and James-Instructor,
we were able to debug most of our MVP1 bugs and have a fully functional SPA.

I'm going to try pushing it tonight because we only have 2 days left, but Friday should be dedicated to
deployment, so there's only one proper day left. I'll be working on the Delivery Create and Update
forms and see how far I get. We'd like a form to create a delivery request through another post, and
I think the best way would be a separate component and a new nested route.

## 4/25/2023 - Team worked on Deployment

Today, I worked on:

- Team worked on linting and clearing deployment issues
- Properly deploy, but with a bug related to URL routes not including the full basename
  - replaces '/byob/' with '/' for some reason

Working through the pain today. There's still a fair amount to do, so we're working on deployment
today to make sure we're able to view all our webpages properly. We discovered a bug related to
a portion of the basename gets replaced, but it may simply be prefixing '/byob/' to all our links.

Trying to remain positive, but stress and pain aren't a good mix. The SEIRs and instructors are awesome
and there's a lot of talented persons in our Cohort, so some other classmates assisted in our
deployment due to my situation. I'm very grateful.

## 4/24/2023 - Work on Delivery Related Redux Stores and go to ER

Today, I worked on:

- Practice final - went pretty well
- Debugging some frontend for team related to redux - success
- Finish creating the rest of the delivery related API stores
- Update other api stores for correct referencing relating to redux passing an obj as single param

Worked with James - Instructor to debug frontend issue. Always always always small issues, but
they are based in fundamentals, so working through the thought process was very beneficial. The issue
was structuring the data correctly and passing everything through the rtk query as an obj {}.

After taking a short break, I started experiencing severe pain 9/10 for multiple hours before making
the decision to go to the ER finding out I have a kidney stone. I had pretty big plans to get through
work, but this definitely threw a wrench in my plans. I'll be in constant pain the rest of the week
during this final stretch. Classic timing.

## 4/22/2023 - Finish debugging Backend and Attempt debugging Frontend

Today, I worked on:

- Attempted debugging some frontend for team related to redux - still fail
- Debug Delivery API endpoints - Success

I've run myself pretty ragged to get all this functionality flowing, but feels good. The frontend
bug continues to elude me since we're connecting everything to the proper url, passing correct
credentials. The issue is the connection is literally not there as there's no visible payload
using the redux queries and mutations, so we're posting as a blocker now and grabbing help.

It's almost the final stretch and I need to study for my practice final and save up energy for working
in the week, so I will take tomorrow Sunday off and just work as hard as possible for Monday - Friday.

## 4/21/2023 - Updated backend for authorization checks / FE Debug Authentication

Today, I worked on:

- Looking at others' HMU posts, we realized we're not using our token on FE
- Create userSlice to set the current user and have access to the token to protect webpages
- Attempted debugging some frontend for team related to redux - still fail

While debugging the frontend, we came across some Help Me Understand posts in slack and realized
we were missing a sizeable chunk of the FE authentication functionality. There's a react library
that can be used for regular react, but we are not using jwtdown-for-react because of redux,
so we needed to conceptualize what it was doing and apply a similar concept to our app using redux.

Realized our backend api endpoints do not have user checks to make sure only the author of an object
in our app has authorization to update or delete said object. Updating all backend endpoints for checks
that need it such as all updates, deletes, and delivery side checking for driver.

## 4/20/2023 - Hooking up Delivery Routers with Repo Methods

Today, I worked on:

- Attempted debugging some frontend for team related to redux - frontend to backend connection fail
- Update routers with a repo methods for all delivery api endpoints

Just another work day trying to get everything done. The rush is making everyone a little
faster, but also less attentive, so doing my best to keep communication going among the team
and making sure everyone knows what others are working on and what needs hands.

Still no luck with the frontend connection. This is becoming a blocker at this point. Testing all
backend api endpoints and everything is working well except the Deliveries. I know the bug is
something simple, but going to take a break and finish debugging tomorrow while I help my
team work on other frontend components. Anything to be productive at this point.

## 4/19/2023 - Updating Backend Delivery related API Endpoint and Repo Methods

Today, I worked on:

- ALL backend api endpoints for delivery related services
- Debugged some frontend for team related to redux - frontend to backend connection fail
- Create repo methods' SQL and Encoder for all delivery api endpoints

I'm about 90% done with the delivery backend and starting to go into panic mode
since we're not as far along on the frontend as I thought we'd be. Redux continues
to be a headache despite its awesome capabilities. Due to its nuances, I'm constantly
having to go back and review what was put in the api stores and how data is passed to
the redux endpoint builds because it needs to match the backend as well.

Between the backend heavily relying on myself and assisting with the frontend debugging,
I'm starting to be stretched a little thin. It's nothing I'm not used to from my work
history, but the frontend is not connecting to the backend, so it's a big issue we need to
solve.

## 4/18/2023 - MVP2 Delivery related API Endpoints and Repo Methods

Today, I worked on:

- ALL backend api endpoints for delivery related services
- Debugged some frontend for team related to redux - frontend to backend connection fail
- Updated for update driver api endpoint
- debug api for update user profile since it wasn't working as intended
- Create routers with a pass for all delivery api endpoints
- Create skeleton for repo methods

I decided to tackle the Delivery backend by myself because there's still a lot of frontend work
that needs to be done and the Delivery services are stretch goal related, so just doing
my part to make sure our project is as great as possible.

Thankfully a lot of the delivery endpoints are copy and paste and just require logical
planning first. I have created skeletons for all the work and vetted the parameters that
will be passed into endpoints and repo methods. Will continue working on this tomorrow.

## 4/17/2023 - DEBUG Frontend Authentication / Update PostsList component for updates to redux store

Today, I worked on:

- research redux docs for ways to attach a user state to the entire configure store
- create userSlice for redux store and update AuthAPI store login and get token endpoints
- Update PostsAPI for 'credentials: include' on create API
- Update PostsList for redux authentication instead of jwtdown-for-react

Our Frontend authentication was missing quite a few pieces, so I grouped up with Eddie and we went
through redux documentation and Learn RTK query videos. Although none specifically discussed the
authentication, the thought process isn't any different to setting up a regular APIstore specific
to token, a slice for current user, and a dependency on the store to run through the AuthAPI
before pathing to the other API reducers.

I'm feeling better now that our website is almost in a functional MVP state and we are officially moving
towards MVP2 related topics. This is specifically related to the Deliveries that help our project
stand out.

## 4/13/2023 - Worked during Spring Break on Public Feed (Get All Posts/Listings) React component

Today, I worked on:

- creating a react component using redux for our MVP main public feed webpage
- Research Tailwind CSS to figure out styling
- Create a sub component in the public feed for conditional rendering for each individual post
- Haven't tested yet

Because we are using react redux, it is taking some time to learn Tailwind and redux using the
frontend authentication. We have a lot of time going forward with our backend complete for our MVP,
so it should all be pair programming and working on styling in the future.

I learned that I have focused more on backend, but I'm extremely interested in frontend and how it all
works. I simply haven't found the same flow that is apparent in backend work. I will work on more personal
projects from now on in order to bridge the gap in my full stack skills.

## 4/12/2023 - Worked during Spring Break on MVP2 Delivery migration and schema

Today, I worked on:

- updating our schema for MVP2 Delivery side
- Correct Migration tables for User to User Interaction planning
- Skeleton Endpoints for later use
- Test creation and connection to Deliveries Tables in PG-admin

Our project is similar to others and our MVP2 is the best at helping us stand out,
so for my personal experience and our overall project as a portfolio piece, I wanted
to make sure we added this functionality.

There were a lot of complicated nuances that our group didn't think about such as the impact
of allowing users to order from other people. The app was originally an MVP related to having
your own goods delivered. With the new functionality, we'd have orders, but I'm doing a cheeky
way of getting around that for now just adding a producer_id for the owner of the produce
for easy referencing and utilizing the deliveries repo.

## 4/6/2023 - DEBUGGING / Pair program Update Post API endpoint and GET All posts API endpoint

Today, I worked on:

- pair programming update singular post/listing endpoint - success
- pair programming GET all posts/listings endpoint - success
- Debugging Produce endpoints - GET and UPDATE - success
- reviewing redux and frontend authentication

We have effectively completed the necessary backend for an MVP - minimum viable product.
We have not worked on the frontend yet, so it will be its own challenge, but it feels good
to have the backend done for a greater part of the project.

Debugging is life, something I know well. It's a skill set, so I'm glad to be going through the
process of learning new technologies within a group to support each other.

## 4/5/2023 - Work on CREATE and GET Posts api endpoints

Today, I worked on:

- Work on the CREATE api endpoint and repo method for the posts - success
- Work on the GET Post api endpoint /posts/{id} and method - success

The SQL required for the GET method requires a JOIN ON, which I understand well,
but we're struggling to apply the python without getting pydantic syntax errors.
We ran into an error because we tried to have a link from PostsOut in Produce.py and
vice versa, but it didn't like it and referenced it as an infinite loop.

After going through the motions of debugging, I was able to narrow down the issue and
updated the Posts/listing schema, so that there are no more issues in the JSON received and
returned in the 8000/docs. The Schema is very important for FastAPI as it's the way
our endpoints pass data, so the python structure also needs to match the wanted outcome.

## 4/4/2023 - Morning FINAL fix to SignUp BE endpoint bug / Worked on frontend signup and CORS bug fixing

Today, I worked on:

- Morning bug fixing with an instructor and fellow peer and cleared issue in 20 min. - success
- pair-programming in an effort to create a simple signup frontend form
- wanted to get to frontend authorization, but not enough time
- bug fixing a simple task, yet another nuance and workaround necessary
  - had to put our CORS allowed origin (single - localhost:3000) in a list variable and then call it to the .add_middleware() method

We ran into yet another bug fix related to yet another simple copy paste task and it feels normal.
Unfortunately this is another thing that follows no matter the industry, but the community is more
accessible, so I find it more enjoyable debugging.

The team was really helpful working on this and had a quick fix working with a SEIR.

## 4/3/2023 - Bug Fix User creation / signup

Today, I worked on:

- bug-fixing issues for creating user endpoint in 8000/docs
- boiled down to three small syntax items: Optional tag on 'is_driver', fetchone() capitalized 'O', 'old_data["hashed_password"] = hashed_password'

This debugging was more difficult since we needed to add print statements and track
where the bug originated before being able to debug. The other issue is simply the
nuances of executing the code and workarounds.

I narrowed down my search for the bug's origin, but had to resort to posting in HMU for assistance.

## 3/31/2023 - Bug Fix authentication

Today, I worked on:

- bug-fixing issues with docker compose migrations
- updating migration table for users unique items

This debugging wasn't a large job, but helped me get comfortable with connecting to
the database and migrations tables connected.

I debugged over the weekend since it wasn't overly complex and wanted to move on to
getting code into our files. I made sure my team was notified and kept updated with
new findings.

## 3/30/2023 - Work on authentication using HackR library and migration files

Today, I worked on:

- Worked on updating project for authentication files from jwtdown-fastapi library
- Made some small updates to query schema for hashed_password items we missed
- Updated migration tables to reflect changes in query schema

This was a big copy paste job, but also important to understand what is happening under the hood.
We have successfully added, but not tested, so I will likely attempt this weekend.

This has been a big week and my group taught me how to access and check settings in my vscode, so
I don't need to format as much, which I'm very grateful about.

## 3/29/2023 - Finalizing wireframe, API Endpoints

Today, I worked on:

- Worked on almost finalizing the api endpoints in team google xcel
- Made some small updates to query schema for date_created items we missed
- Updated migration tables to reflect changes in query schema

There have been some growing pains in what is expected from everyone on the team. We are
just starting the project, so everyone wants to be involved, but there's a layer of trust
that needs to be built among everyone. Once we get passed this project setup, I'm confident
we'll be able to perform more efficiently.

We tried to plan that we'd need extra education time on our own, but it doesn't seem to be
enough to grow confidence. I wish Hack reactor had an entire day to docker compose setup and
transitioning between a virtual environment to docker compose or vice versa. We only did it
during our microservicing a Django monolith and it's difficult to remember.

## 3/28/2023 - QuerySchema, Migration

Today, I worked on:

- Worked on almost finalizing the query schema in google sheets for our project
  with the team
- Worked on almost finalizing Migration tables in google sheets for our project

As a team, I think we learned a lot about workflow and already have lessons learned
on how we would start again. We thought the wireframe could be come up with as
we go along, but we found ourselves with a small blocker to what our actual deliverable
was, so we came full circle.

It's important to agree on a true MVP and wireframe deliverable, so everyone on the team
knows what we are working towards. Being Agile means to build the agreed upon deliverable
in working sections. I need to get better at testing code.
