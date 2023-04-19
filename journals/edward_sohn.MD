## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.

## 4/18/23

I edited and designed the landing page and login form to look like our wireframe (with a few minor changes). I also added an error message if a user inputs a wrong username or password.

## 4/12/23

David and I made the top navbar front end component. We used the default one from the Tailwind docs and we edited it to make it look like how it does in our figma wireframes. We added our logo, searchbar, and a profile image that navigates to the profile page (not finished). We also started on creating the sidebar with buttons that take users to different API endpoints.

## 4/7/23

Timi and I both completed the DELETE API endpoint for produce and posts. Some minor syntax changes were made to the redux setup branch while I explained the front end auth to my group.

## 4/6/23

We split into pair programming. I was the driver and Garrett was helping me. We created the PUT and GET all posts API endpoints. We had to set some fields to Optional in our Posts schema and we encountered a fetch error where we got stuck on for a while. The problem was that we were getting an empty array back when we had the data in the database. We had a fetchall() print statement above the actual fetchall() statement which meant that all the data was being consumed from the cursor from the print statement. We learned a new complication that could arise when debugging. A bug from an attempt to debug!

I also started on implementing redux. We do not have most of our front end pages, so I was only able to get part of it done. The front end auth was completed and tested successfully through an example login form.

## 4/5/23

We split into pair programming. David was the driver and we worked on the POST produce endpoint.

## 4/4/23

I added the front end for the user sign up. We encountered a CORS policy error when test creating a sample user. Brandon(SEIR) advised us to set the origins into a list and not use os.environ.get. It looks at both CORS_HOST and localhost:3000 but CORS_HOST was never set in our dockerfile, so it gave us the CORS policy error.

## 4/3/23

I added the get user and get all users method in router and queries for API endpoint.

## 3/30/23

As a group, we implemented the users query schema. I was the driver and everyone else helped me create the UsersIn, UsersOut, and UsersOutWithPassword models. I also added the pool.py file in queries.

As a group, we implemented the authenticator and the users.py in routers. Garrett was the driver and we helped him create the UsersRepository in /queries/users. We followed along Curtis' lecture to help us and we changed the appropriate names to match our project. We also added the signup authentication tokens in /routers/users.

## 3/29/23

As a group, we implemented our first migration table for users. David was the driver and we helped navigate him to create a user table with rows: id, first_name, last_name, email, phone_number, address, city, state, username, password, avatar_url, is_driver, car_model, license_plate, and DL_number. The appropriate parameters were included as well. We assigned the primary key to the user.id as user_id.
