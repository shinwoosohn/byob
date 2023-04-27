import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  TruckIcon,
  MapPinIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@mui/material";

export default function DriverDeliveriesCard() {
  return (
    <div className="pb-20">
      <Card className="w-full max-w-[600px] max-h-[400px] shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-center rounded-t-lg py-2 bg-[#EDCADA]">
          <Typography className="font-bold text-lg">Decorative</Typography>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <Avatar src="/img/face-2.jpg" alt="avatar" variant="circular" />
            <Typography variant="h5" color="blue-gray" className="font-medium">
              123 Main St, Los Angeles, CA, 12345
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              <TruckIcon className="h-5 w-5 text-green-700" />
            </Typography>
          </div>
          <div className="flex items-center justify-end">
            <EllipsisVerticalIcon className="h-5 w-5 text-black" />
          </div>
          <div className="flex items-center justify-between">
            <Avatar src="/img/face-2.jpg" alt="avatar" variant="circular" />
            <Typography variant="h5" color="blue-gray" className="font-medium">
              312 California Blvd, Los Angeles, CA, 12345
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              <MapPinIcon className="h-5 w-5 text-red-700" />
            </Typography>
          </div>
        </CardBody>
        <CardFooter divider className="">
          <Button size="lg" fullWidth={true} className="pt-2 pb-2">
            Accept
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
