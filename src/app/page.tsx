"use client";
import { useCompletion } from "ai/react";
import { Navbar } from "./Navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { useEffect, useRef } from "react";

const placeholders = [
  "What was your most recent role?",
  "How many years of experience do you have?",
  "What frontend skills do you have?",
];

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let phIndex = 0;
    let length = 0;
    let isForward = true;
    let pause = 0;
    setInterval(() => {
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
  }, []);

  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: "/api/qa",
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <Navbar />
      <div className="grid grid-cols-4 gap-8">
        <Card className="col-span-full flex grow-0 flex-col justify-between bg-background md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs">Ask about my experience</CardTitle>
          </CardHeader>
          <CardContent className=" overflow-auto py-2">
            {completion}
          </CardContent>
          <CardFooter className="">
            <form onSubmit={handleSubmit} className="w-full">
              <Input
                ref={inputRef}
                type="text"
                onChange={handleInputChange}
                value={input}
              />
            </form>
          </CardFooter>
        </Card>
        <Card className="col-span-2 aspect-square md:col-span-1"></Card>
        <Card className="col-span-2 aspect-square md:col-span-1"></Card>
        <Card className="col-span-2 aspect-square md:col-span-1"></Card>
        <Card className="col-span-2 aspect-square md:col-span-1"></Card>
      </div>
    </div>
  );
}
