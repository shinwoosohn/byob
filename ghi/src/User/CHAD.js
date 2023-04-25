import React from "react";
import { useState } from "react";
import { useGetUsersQuery, useGetAllProduceQuery } from "../store/usersApi"; // Import the missing API hook
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function UserProfile() {
  const { data: userData, isError, isLoading } = useGetUsersQuery(); // Add the missing brackets
  const [produceList, setProduceList] = useState([]);
  const [produce, setProduce] = useState("");
  const handleProduceChange = (event) => {
    setProduce(event.target.value);
  };
  const { data: produceData } = useGetAllProduceQuery();
  useEffect(() => { // Use the useEffect hook to set the produceList state after the API call
    setProduceList(produceData);
  }, [produceData]);

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

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
    <div>
      <Card className="w-96">
        <CardHeader floated={false} className="h-80">
          <img src={userData.avatar_url} alt="profile-picture" />
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
          <p>Footer here, can add whatever, icons tooltips etc</p>
        </CardFooter>
      </Card>
      <div>
        <p> List of Produce</p>
        <div>
          {produceList.map((produce, index) => (
            <Accordion
              key={index}
              open={open === index}
              icon={<Icon id={index} open={open} />}
            ></Accordion>
