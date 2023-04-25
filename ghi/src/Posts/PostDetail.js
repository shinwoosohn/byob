import { useParams } from "react-router-dom";
import {
    Avatar,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
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


function PostDetail(){

    const { post_id } = useParams();
    const { data: post, isError, isLoading} = useGetPostsQuery(post_id);

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
    if (post.produce.produce_id !== null) {
        return (
            <Card className="w-full max-w-[26rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
                <img
                src={post.produce.image_url}
                alt="ui/ux review check"
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                    {post.produce.decription}
                </Typography>
                </div>
                <Typography color="gray">
                    {post.text}
                </Typography>

            <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CurrencyDollarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        Price: {post.produce.price}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        Expiration Date: {post.produce.exp_date}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <PhotoIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        Decorative: {post.produce.is_decorative}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CheckBadgeIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        {post.produce.is_available}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <HashtagIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        Quantity: {post.produce.quantity}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <ScaleIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                    Weight: {post.produce.weight}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-3">
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Make a link to delivery form !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                <Link size="lg" fullWidth={true}>
                Make a delivery request!
                </Link>
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            </CardFooter>
            </Card>
        );
    } else {
    // post without purchase option or delivery deatails
    return (
        <Card className="w-full max-w-[26rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
                <img
                src={post.produce.image_url}
                alt="ui/ux review check"
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                    {post.produce.decription}
                </Typography>
                </div>
                <Typography color="gray">
                    {post.text}
                </Typography>

            <div className="group mt-8 inline-flex flex-wrap items-center gap-3">

                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <Avatar src={post.user.avatar_url} alt="user avatar img" className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        User: {post.user.username}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        Post created on: {post.post_created}
                    </Typography>

                </div>
            </CardBody>
            <CardFooter className="pt-3">
            </CardFooter>
        </Card>
    );
  }
};

export default PostDetail;
