import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../store/usersApi";
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
import PostsDetail from "../Posts/PostsDetail";
import ProduceDetail from "../Produce/ProduceDetail";
import { useGetAllPostsQuery } from "../store/postsApi";
import { useGetAllProduceQuery } from "../store/produceApi";

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

export default function ProfileDetail() {
  const { user_id } = useParams();
  const { data: userData, isError, isLoading } = useGetUsersQuery(user_id);
  const [produceList, setProduceList] = useState([]);

  const { data: produceData } = useGetAllProduceQuery(user_id, {
    skip: !user_id,
  });
  useEffect(() => {
    // Use the useEffect hook to set the produceList state after the API call
    if (produceData) {
      setProduceList(produceData);
    }
  }, [produceData]);

  const [openProduce, setOpenProduce] = useState(0);

  const handleOpenProduce = (value) => {
    setOpenProduce(openProduce === value ? 0 : value);
  };

  const { data: postsData } = useGetAllPostsQuery();

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const userId = user_id;

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
          <img src={userData.avatar_url} alt="profile-avatar" />
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
        <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
      </Card>
      <div>
        <p> List of your posts</p>
        <div>
          {postsData &&
            postsData
              .filter((singlePost) => {
                return singlePost.user.user_id == userId;
              })
              .map((singlePost, index) => (
                <Accordion
                  key={index}
                  open={open === index}
                  icon={<Icon id={index} open={open} />}
                >
                  <AccordionHeader onClick={() => handleOpen(index)}>
                    {singlePost.text}
                  </AccordionHeader>
                  <AccordionBody>
                    <PostsDetail singlePost={singlePost} />
                  </AccordionBody>
                </Accordion>
              ))}
        </div>
      </div>

      <div>
        <p> List of Produce</p>
        <div>
          {produceList.length > 0 &&
            produceList.map((singleProduce, index) => {
              return (
                <Accordion
                  key={index}
                  open={openProduce === index}
                  icon={<Icon id={index} open={openProduce} />}
                >
                  <AccordionHeader onClick={() => handleOpenProduce(index)}>
                    {singleProduce.name}
                  </AccordionHeader>
                  <AccordionBody>
                    <ProduceDetail singleProduce={singleProduce} />
                  </AccordionBody>
                </Accordion>
              );
            })}
        </div>
      </div>

      <div>
        <p> Active Delivery Requests</p>
      </div>

      <div>
        <p> history</p>
      </div>
    </div>
  );
}
