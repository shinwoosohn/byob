import React from "react";
import { useGetUsersQuaery } from "../store/usersApi";
import produceList from "../Produce/ProduceList";

return (
    <div class="big boi">

        <div class="text-gray-900 font-bold text-xl mb-2">
            <p>Name: {user.first_name + " " + user.last_name}</p>
            <p>Loction: {user.state + ", " + user.city}</p>
            <p>Address: {user.address}</p>
            <p>Email: {user.email}</p>
            <p>Phone number: {user.phone_number}</p>
        </div>

        <div>
            <p> List of Produce</p>
                <produceList />
            {/* for each produce in produce list, create a item row
            if item row is clicked on, expand and show buttons to
            1)create a post for that produce
            2) create a delivery request for that produce
            3) delete that produce */}
        </div>

        <div>
            <p> Active Delivery Requests</p>
            {/* posts by user */}
            <PostsList />
        </div>

        <div>
            <p> history</p>
            {/* get all posts, filter by isCompleted ? */}
        </div>





    </div>
)
