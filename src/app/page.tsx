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
import { Button } from "~/components/ui/Button";
import Link from "next/link";
import PoolsCard from "~/components/PoolsCard";
import { BentoContainer, BentoItem } from "~/components/Bento";

const placeholders = [
  "What was your most recent role?",
  "How many years of experience?",
  "What is your area of expertise?",
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
        pause = 500;
      }
      if (length === 0) {
        isForward = true;
        phIndex = (phIndex + 1) % placeholders.length;
      }
    }, 10);
    return () => clearInterval(intv);
  }, []);

  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: "/api/qa",
  });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-6">
      <Navbar />
      <BentoContainer>
        <BentoItem size="md">
          <Card className="flex h-full min-h-48 flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs">Ask about my experience</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto py-2">
              {completion}
            </CardContent>
            <CardFooter className="">
              <form onSubmit={handleSubmit} className="w-full">
                <Input
                  className="text-xs"
                  ref={inputRef}
                  type="text"
                  onChange={handleInputChange}
                  value={input}
                />
              </form>
            </CardFooter>
          </Card>
        </BentoItem>
        <BentoItem size="md">
          <PoolsCard />
        </BentoItem>
        <BentoItem size="square">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hover Chat</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button variant={"link"}>Github</Button>
            </CardFooter>
          </Card>
        </BentoItem>
        <BentoItem size="square">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hover Chat</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button variant={"link"}>Github</Button>
            </CardFooter>
          </Card>
        </BentoItem>
        <BentoItem size="square">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hover Chat</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button variant={"link"}>Github</Button>
            </CardFooter>
          </Card>
        </BentoItem>
        <BentoItem size="square">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hover Chat</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button variant={"link"}>Github</Button>
            </CardFooter>
          </Card>
        </BentoItem>
        <BentoItem size="square">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hover Chat</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button variant={"link"}>Github</Button>
            </CardFooter>
          </Card>
        </BentoItem>
      </BentoContainer>
    </div>
  );
}
