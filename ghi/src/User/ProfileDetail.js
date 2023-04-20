import React from "react";
import { useGetUsersQuery } from "../store/usersApi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
// import produceList from "../Produce/ProduceList";



export default function UserProfile(){
    const { data: userData, isError, isLoading } = useGetUsersQuery

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return (
            <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                role="alert"
            >
                <p className="font-bold">Something went wrong with loading data...</p>
            </div>
        );
    }
    return (
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        <div>
            <Card className="w-96">
                <CardHeader floated={false} className="h-80">
                    {/* <img src="/img/team-3.jpg" alt="profile-picture" /> */}
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {user.first_name + " " + user.last_name}
                    </Typography>
                </CardHeader>
                <CardBody className="text-center">
                    <Typography color="blue" className="font-medium" textGradient>
                    Location: {user.state + ", " + user.city}
                    </Typography>
                    <Typography color="blue" className="font-medium" textGradient>
                        Address: {user.address}
                    </Typography>
                    <Typography color="blue" className="font-medium" textGradient>
                        Phone number: {user.phone_number}
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2">
                    <p>Footer here</p>
                </CardFooter>
            </Card>
            // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            <div>
                <p> List of Produce</p>
                    {/* <produceList /> */}
                {/* for each produce in produce list, create a item row
                if item row is clicked on, expand and show buttons to
                1)create a post for that produce
                2) create a delivery request for that produce
                3) delete that produce */}
            </div>

            <div>
                <p> Active Delivery Requests</p>
                {/* posts by user */}
                {/* <PostsList /> */}
            </div>

            <div>
                <p> history</p>
                {/* get all posts, filter by isCompleted ? */}
            </div>
    </div>
    )
}
