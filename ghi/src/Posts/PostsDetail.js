import { Link } from "react-router-dom";
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
    PencilSquareIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";


function PostsDetail({singlePost}){

    if (singlePost?.produce_id !== null) {
        return (
            <Card className="w-full max-w-[26rem] shadow-lg">
                <CardHeader floated={false} color="blue-gray">
                    <img
                    src={singlePost.postimg_url}
                    alt="ui/ux review check"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        <span>{singlePost ? singlePost.produce.name : ""}</span>
                    </Typography>
                    </div>
                    <Typography color="gray">
                        <span>{singlePost ? singlePost.produce.description : ""}</span>
                    </Typography>

                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <Avatar src={singlePost ? singlePost.user.avatar_url:
                                <UserCircleIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            }
                            alt="user avatar img" className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>From User: {singlePost.user ?  singlePost.user.username : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <PencilSquareIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Notes: {singlePost ?  singlePost.text : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <CurrencyDollarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Price: {singlePost ?  singlePost.produce.price : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Expiration Date: {singlePost ? singlePost.produce.exp_date : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <PhotoIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Decorative: {singlePost ? singlePost.produce.is_decorative : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <CheckBadgeIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>{singlePost ? singlePost.produce.is_available : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <HashtagIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Quantity: {singlePost ? singlePost.produce.quantity : ""}</span>
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <ScaleIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            <span>Weight: {singlePost ? singlePost.produce.weight: ""}</span>
                        </Typography>
                        <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                        >
                        <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>Post created on: {singlePost ? singlePost.post_created: ""}</span>
                    </Typography>
                    </div>
                </CardBody>
                <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}>
                        <Link to="/deliveries">
                            Make a delivery request!
                        </Link>
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
                src={singlePost ? singlePost.image_url : ""}
                alt="ui/ux review check"
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        <span>{singlePost ? singlePost.name : ""}</span>
                    </Typography>
                </div>

                <Typography color="gray">
                    <span>{singlePost ? singlePost.description : ""}</span>
                </Typography>

                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">

                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <Avatar src={singlePost.user.avatar_url} alt="user avatar img" className="-mt-0.5 h-5 w-5 text-yellow-700" />
                       <span>User: {singlePost.user.username}</span>
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>Post created on: {singlePost.post_created}</span>
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
