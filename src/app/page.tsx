"use client";
import { useCompletion } from "ai/react";
import { Navbar } from "./Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { useEffect, useRef } from "react";
import PoolsCard from "~/components/PoolsCard";
import { BentoContainer, BentoItem } from "~/components/Bento";
import { DemoAppA, DemoAppB } from "~/lib/realtime/components/DemoApp";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/Button";
import dynamic from "next/dynamic";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const DemoChat = dynamic(
  () =>
    import("../lib/realtime/components/DemoChat").then((mod) => mod.DemoChat),
  {
    ssr: false,
  },
);

const placeholders = [
  "What was your most recent role?",
  "How did you make Live Cursors?",
  "What are use cases for Pools?",
];

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let phIndex = 0;
    let length = 0;
    let isForward = true;
    let pause = 0;
    const intv = setInterval(() => {
      if (pause > 0) {
        pause--;
        return;
      }
      if (isForward) {
        length++;
      } else {
        length--;
      }
      const curr = placeholders[phIndex]!.slice(0, length);
      if (inputRef.current) {
        inputRef.current.placeholder = curr;
      }
      if (length === placeholders[phIndex]!.length) {
        isForward = false;
        pause = 300;
      }
      if (length === 0) {
        isForward = true;
        phIndex = (phIndex + 1) % placeholders.length;
      }
    }, 10);
    return () => clearInterval(intv);
  }, []);

  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/qa",
    });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-6">
      <Navbar />
      <BentoContainer>
        <BentoItem size="md">
          <Card className="flex h-full min-h-48 flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="">Ask AI about my work</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto py-2 text-sm">
              {completion}
            </CardContent>
            <CardFooter className="">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  className="placeholder:text-sm"
                  ref={inputRef}
                  type="text"
                  onChange={handleInputChange}
                  value={input}
                  enterKeyHint="send"
                />
                <Button
                  className="aspect-square p-0"
                  title="Send message"
                  type="submit"
                  disabled={isLoading}
                >
                  <PaperPlaneIcon width={18} height={18} />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </BentoItem>

        <BentoItem size="md">
          <Card className="bg-image-keyboard h-full min-h-48">
            <CardHeader>
              <Link
                className="underline"
                target="_blank"
                href="https://intellitype.xyz"
              >
                <CardTitle>Intellitype Keyboard</CardTitle>
              </Link>
              <CardDescription className="text-sm">
                A quick way to communicate for those with motor and verbal
                disabilities.
              </CardDescription>
            </CardHeader>
          </Card>
        </BentoItem>

        <BentoItem size="square" className="flex w-full">
          <Card className="flex h-full min-h-48 w-full">
            <div className="absolute max-w-44 md:max-w-60">
              <CardHeader className="h-full">
                <CardTitle>Live Cursors</CardTitle>
                <CardDescription className="text-xs">
                  <span className="block">{`Move your pointer in this box.`}</span>
                  <span className="block">
                    <span className="md:hidden">Tap</span>
                    <span className="hidden md:inline">Click</span>
                    {` to chat.`}
                  </span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"link"}
                        className="relative z-50 p-0 text-xs text-muted-foreground underline"
                      >
                        details
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-96 max-w-xs space-y-3 p-4 text-sm">
                      <p>
                        {`Live multiplayer cursors, inspired by Figma's cursor chat. I made a simple websocket client on the frontend, similar to Ably. Connections to channels are managed on Cloudflare Durable Objects which supports persistent memory across serverless invocations in a Node isolate runtime.`}
                      </p>
                    </PopoverContent>
                  </Popover>
                </CardDescription>
              </CardHeader>
            </div>
            <DemoAppA>
              <DemoChat />
            </DemoAppA>
          </Card>
        </BentoItem>

        <BentoItem size="square">
          {/* Move into one bento box with vertical bar between demo apps */}
          <Card className="bg-dot-grid h-full min-h-48 p-3">
            <DemoAppB>
              <DemoChat />
            </DemoAppB>
          </Card>
        </BentoItem>

        <BentoItem size="md">
          <PoolsCard />
        </BentoItem>

        <BentoItem size="square">
          <Card className="bg-image-nutrition-label h-full min-h-48">
            <CardHeader>
              <Link
                className="underline"
                target="_blank"
                href="https://www.amazon.com/Derek-Cook-Nutrition-Label/dp/B06X9G98GB?crid=3B2ZTUCYZ67L2&keywords=nutrition+label&qid=1707800191&s=digital-skills&sprefix=nutrition+label,alexa-skills,156&sr=1-1"
              >
                <CardTitle>Nutrition Label</CardTitle>
              </Link>
              <CardDescription className="text-sm">
                An Alexa skill that gives you nutrition info on almost any food
                or drink.
              </CardDescription>
            </CardHeader>
          </Card>
        </BentoItem>

        <BentoItem size="square">
          <Card className=" bg-image-coins h-full min-h-48">
            <CardHeader>
              <Link
                className="underline"
                target="_blank"
                href="https://coins-app.netlify.app/"
              >
                <CardTitle>Coins</CardTitle>
              </Link>
              <CardDescription className="text-sm">
                Decommisioned. A crypto tracker.
              </CardDescription>
            </CardHeader>
          </Card>
        </BentoItem>

        <div className="col-span-full">
          <CardHeader>
            <CardTitle className="">Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
            <Link target="_blank" href="https://github.com/derek-cook">
              github
            </Link>
            <Link target="_blank" href="https://read.cv/derekcook">
              read.cv
            </Link>
            <Link target="_blank" href="https://twitter.com/derek_cookie">
              twitter
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/derekcook33/"
            >
              linkedin
            </Link>
          </CardContent>
        </div>
      </BentoContainer>
    </div>
  );
}
