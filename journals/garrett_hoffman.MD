[TOC]

# Journals

## 4/4/2023 - Morning FINAL fix to SignUp BE endpoint bug / Worked on frontend signup and CORS bug fixing

Today, I worked on:

- Morning bug fixing with an instructor and fellow peer and cleared issue in 20 min.
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
