import Link from "next/link";
import { Button } from "./ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/Card";

const PoolsCard = () => {
  return (
    <Card className="image-corner flex h-full flex-col">
      <CardHeader>
        <CardTitle>Pools</CardTitle>
        <CardDescription className="text-xs">{`Embedded chat app demo`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 text-xs">
        {`Similar topics are deduplicated. For example, entering 'React Discussion' or 'React Frontend' will join the same conversation.`}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant={"link"}
          size={"sm"}
          className="bg-noisyGradient bg-cover text-xs"
        >
          <Link target="_blank" href="/pools">
            Try it out
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PoolsCard;
