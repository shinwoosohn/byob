import { useParams } from "react-router-dom";
import {
    Avatar,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import {
    CurrencyDollarIcon,
    CalendarDaysIcon,
    ScaleIcon,
    HashtagIcon,
    CheckBadgeIcon,
    PhotoIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../store/postsApi";


function PostsDetail(){

    const { posts_id } = useParams();
    console.log(posts_id, "this is posts_id")
    const { data: posts, isError, isLoading} = useGetPostsQuery(posts_id);

    console.log(posts, "this is posts")
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

// post with a produce (wireframe 6)
    if (posts.produce.produce_id !== null) {
        return (
            <Card className="w-full max-w-[26rem] shadow-lg">
                <CardHeader floated={false} color="blue-gray">
                    <img
                    src={posts.postimage_url}
                    alt="ui/ux review check"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        <span>{posts.produce ? posts.produce.name : ""}</span>
                    </Typography>
                    </div>
                    <Typography color="gray">
                        <span>{posts.produce ? posts.produce.description : ""}</span>
                    </Typography>

                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <CurrencyDollarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Price: {posts.produce ?  posts.produce.price : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Expiration Date: {posts.produce ? posts.produce.exp_date : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <PhotoIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Decorative: {posts.produce ? posts.produce.is_decorative : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <CheckBadgeIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>{posts.produce ? posts.produce.is_available : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <HashtagIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Quantity: {posts.produce ? posts.produce.quantity : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <ScaleIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Weight: {posts.produce ? posts.produce.weight: ""}</span>
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true} component={Link} to="/deliveries">
                        Make a delivery request!
                    </Button>
                </CardFooter>
            </Card>
        );
    } else {
    // post without purchase option or delivery deatails
    return (
        <Card className="w-full max-w-[26rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
                <img
                src={posts.produce ? posts.produce.image_url : ""}
                alt="ui/ux review check"
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        <span>{posts.produce ? posts.produce.name : ""}</span>
                    </Typography>
                </div>

                <Typography color="gray">
                    <span>{posts.produce ? posts.produce.description : ""}</span>
                </Typography>

                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">

                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <Avatar src={posts.user.avatar_url} alt="user avatar img" className="-mt-0.5 h-5 w-5 text-yellow-700" />
                       <span>User: {posts.user.username}</span>
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>Post created on: {posts.post_created}</span>
                    </Typography>

                </div>
            </CardBody>
            <CardFooter className="pt-3">
            </CardFooter>
        </Card>
    );
  }
};

export default PostsDetail;
