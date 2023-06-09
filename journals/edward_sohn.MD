## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.

## 4/28/23

We made final bug fix changes, including the one where posts list would not populate with the new post after creation. We then made preparations for the presentation.

## 4/27/23

I debugged a problem where the login and logout were not navigating correctly. I needed to create a logout action in the user slice and dispatch it in the authAPI. I also needed to pass the token through the routes in App by using prop drilling. I updated the README.

## 4/26/23

We fixed the profile page bug where produce list and post list were not populating correctly. We also fixed the update forms for post and produce as well.

## 4/25/23

We finished deployment with caprover with the assistance of Rosheen. I finished the conditional navbar feature and the driver signup overlay form feature. It was a bandaid fix because the solution requires mapping out an entire new backend, which we do not have time for.

## 4/24/23

I wrote a unit test for the get all users feature. I also worked on the conditional navbar that shows different links depending on if you are logged in (user/driver) or logged out.

## 4/23/23

I finished setting up the landing page, so we can just add any other components if we need to.

## 4/22/23

I continued working on the front end landing page and components. I also worked on a carousel feature that can showcase anything we need to.

## 4/21/23

I fixed the avatar_url bug and finished up the top navbar. I started on creating landing components like the footer and about us section.

## 4/20/23

We ended up removing the sidebar and integrating its element into the top navbar. I encountered a bug where the avatar_url was not populating as the profile icon on the right of the navbar.

## 4/19/23

I debugged the two click login problem. I needed to use hasOwnProperty("error") to check if login response was successful.

## 4/18/23

I edited and designed the landing page and login form to look like our wireframe (with a few minor changes). I also added an error message if a user inputs a wrong username or password.

## 4/17/23

We continued working on the redux setup because it would not show user token. We created a user slice to sets the token to the specific user which fixed our problem.

## 4/13/23

I continued to work on the sidebar, but inevitably scrapped it because we decided that it was unnecessary and it can all fit on the nav bar. I went back to the wireframes to make more changes I needed to.

## 4/12/23

David and I made the top navbar front end component. We used the default one from the Tailwind docs and we edited it to make it look like how it does in our figma wireframes. We added our logo, searchbar, and a profile image that navigates to the profile page (not finished). We also started on creating the sidebar with buttons that take users to different API endpoints.

## 4/11/23

Garrett and I went over the redux setup and found where the problem was. We decided how we would split off the tasks to make the changes and then each worked on our respective redux api store.

## 4/10/23

I made edits to the wireframe due to changes in development and design ideas.

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
