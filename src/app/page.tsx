"use client";
import { useCompletion } from "ai/react";
import { Navbar } from "./Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";

export default function Home() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: "/api/qa",
  });
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <Navbar />
      <div className="grid auto-rows-fr grid-cols-4 gap-4">
        <Card className="col-span-full bg-background md:col-span-2">
          <CardHeader className="text-xs">
            <CardTitle>Ask about my experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <Input
                className=""
                placeholder="Tell me about a time..."
                type="text"
                onChange={handleInputChange}
                value={input}
              />
            </form>
            <div className="my-4">
              <p>{completion}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 row-span-1 aspect-square md:col-span-1"></Card>
        <Card className="col-span-2 aspect-square md:col-span-1"></Card>
      </div>
    </div>
  );
}
