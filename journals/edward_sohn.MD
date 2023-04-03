## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.

## 4/3/23

I added the get user and get all users method in router and queries for API endpoint.

## 3/30/23

As a group, we implemented the users query schema. I was the driver and everyone else helped me create the UsersIn, UsersOut, and UsersOutWithPassword models. I also added the pool.py file in queries.

As a group, we implemented the authenticator and the users.py in routers. Garrett was the driver and we helped him create the UsersRepository in /queries/users. We followed along Curtis' lecture to help us and we changed the appropriate names to match our project. We also added the signup authentication tokens in /routers/users.

## 3/29/23

As a group, we implemented our first migration table for users. David was the driver and we helped navigate him to create a user table with rows: id, first_name, last_name, email, phone_number, address, city, state, username, password, avatar_url, is_driver, car_model, license_plate, and DL_number. The appropriate parameters were included as well. We assigned the primary key to the user.id as user_id.
