import React from "react";
import { useGetUsersQuery } from "../store/usersApi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
// import produceList from "../Produce/ProduceList";



export default function UserProfile(){
    const { data: userData, isError, isLoading } = useGetUsersQuery
    const [produceList, setProduceList] = useState([])
    const [produce, setProduce] = useState('')
    const handleProduceChange = (event) => {
        setProduce(event.target.value)
    }
    const { data: produceData} = useGetAllProduceQuery();
        setProduceList(produceData)



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
                        {userData.first_name + " " + userData.last_name}
                    </Typography>
                </CardHeader>
                <CardBody className="text-center">
                    <Typography color="blue" className="font-medium" textGradient>
                    Location: {userData.state + ", " + userData.city}
                    </Typography>
                    <Typography color="blue" className="font-medium" textGradient>
                        Address: {userData.address}
                    </Typography>
                    <Typography color="blue" className="font-medium" textGradient>
                        Phone number: {userData.phone_number}
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2">
                    <p>Footer here</p>
                </CardFooter>
            </Card>
            // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            <div>
                <p> List of Produce</p>
                {/* use this to populate accordian not dropdown select menu */}
                {/* <select value={produce.description} onChange={handleProduceChange} required id="produce" name="produce" className="form-select">
                    <option value="">Choose from your produce</option>
                    {produceList.map(singleProduce => {
                        return (
                            <option value={singleProduce.name} key={singleProduce.produce_id}>
                                {singleProduce.name}
                            </option>
                        );
                    })};
                </select> */}
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
