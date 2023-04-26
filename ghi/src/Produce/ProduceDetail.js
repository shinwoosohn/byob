import { useParams, useNavigate } from "react-router-dom";
import {
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
import { useGetProduceQuery } from "../store/produceApi";


function ProduceDetail(){

    const { user_id, produce_id } = useParams();
    console.log(user_id, "this is user_id")
    const { data: produce, isError, isLoading} = useGetProduceQuery(user_id, produce_id);
    const navigate = useNavigate()

    console.log(produce, "this is produce")
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
    return (
        <Card className="w-full max-w-[26rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
                <img
                src={produce.produce_url}
                alt="picture of produce"
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                    <span>{produce ? produce.name : ""}</span>
                </Typography>
                </div>
                <Typography color="gray">
                    <span>{produce ? produce.description : ""}</span>
                </Typography>

            <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CurrencyDollarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>Price: {produce ?  produce.price : ""}</span>
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>Expiration Date: {produce ? produce.exp_date : ""}</span>
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <PhotoIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>Decorative: {produce ? produce.is_decorative : ""}</span>
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <CheckBadgeIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>{produce ? produce.is_available : ""}</span>
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <HashtagIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>Quantity: {produce ? produce.quantity : ""}</span>
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <ScaleIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        <span>Weight: {produce ? produce.weight: ""}</span>
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-3">
                <Button size="lg" fullWidth={true} onClick={(e) => console.log("clicked", e)}>
                    Make a post about this product!
                </Button>
            </CardFooter>
        </Card>
    );
}


export default ProduceDetail;
