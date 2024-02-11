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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const PoolsCard = () => {
  return (
    <Card className="image-corner flex h-full flex-col">
      <CardHeader>
        <CardTitle>Pools</CardTitle>
        <CardDescription className="text-xs">{`Embedded chat app demo`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 text-xs">
        {`Enter a topic, instantly join the conversation. People entering similar topics are joined together.`}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"link"}
              className="self-start p-0 text-xs text-muted-foreground underline"
            >
              details
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-h-96 max-w-xs space-y-3 overflow-scroll bg-accent p-4 text-sm">
            <h3 className="font-bold">How it works</h3>
            <p>
              {`Topic similarity is determined by comparing the embedding of a
                  topic in a vector database using dot-product comparison. If
                  the result is greater than the threshold, the most similar
                  topic is joined instead. Otherwise, a new conversation is
                  created.`}
            </p>
            <h3 className="font-bold">Use Cases</h3>
            <p>{`Student Discussion Board`}</p>
            <p className="text-xs">
              {`Normally you'd create a new discussion on a lecture topic and others would search for it and join.`}
              {`This would eliminate the need to manage and curate discussions. `}
              {`Students can simply enter the topic and be joined with others, whether if they enter 'CS finals' or 'CS 101 final exams'.`}
            </p>
            <p>Q&A or FAQ</p>
            <p className="text-xs">{`People often post duplicate questions. This embedding retrieval strategy could be used to deduplicate questions.`}</p>
          </PopoverContent>
        </Popover>
        <Button size={"sm"} className="">
          <Link target="_blank" href="/pools">
            Try it out
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PoolsCard;
