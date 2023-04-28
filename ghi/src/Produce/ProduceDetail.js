import { useNavigate } from "react-router-dom";
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
import { Link } from "react-router-dom";

function ProduceDetail({ singleProduce }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/posts/new");
  };

  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img src={singleProduce.image_url} alt="produce" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            <span>{singleProduce ? singleProduce.name : ""}</span>
          </Typography>
        </div>
        <Typography color="gray">
          <span>{singleProduce ? singleProduce.description : ""}</span>
        </Typography>

        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <CurrencyDollarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            <span>Price: {singleProduce ? singleProduce.price : ""}</span>
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <CalendarDaysIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            <span>
              Expiration Date: {singleProduce ? singleProduce.exp_date : ""}
            </span>
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <PhotoIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            <span>
              Decorative: {singleProduce ? singleProduce.is_decorative : ""}
            </span>
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <CheckBadgeIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            <span>{singleProduce ? singleProduce.is_available : ""}</span>
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <HashtagIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            <span>Quantity: {singleProduce ? singleProduce.quantity : ""}</span>
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <ScaleIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            <span>Weight: {singleProduce ? singleProduce.weight : ""}</span>
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true} onClick={handleClick}>
          Make a post about this product!
        </Button>
        <Button size="lg" fullWidth={true}>
          <Link
            to={`/users/${singleProduce.user.user_id}/produce/${singleProduce.produce_id}/update`}
          >
            Update Produce
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProduceDetail;
