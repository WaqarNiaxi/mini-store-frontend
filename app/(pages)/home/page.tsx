"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { FormField } from "@/app/components/forms/FormField";
import { TextAreaField } from "@/app/components/forms/TextAreaField";

import { bugSchema, BugFormType } from "@/app/zod-schemas/schemas";
import { useCounterStore } from "@/app/store/counter/counter.store";
import { toast } from "sonner";

export default function HomePage() {
  const form = useForm<BugFormType>({
    resolver: zodResolver(bugSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { count, increase, decrease, reset } = useCounterStore();

  const onSubmit = (data: BugFormType) => {
    toast("Submitted", {
      description: <pre>{JSON.stringify(data, null, 2)}</pre>,
      position: "bottom-right",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Counter Section */}
      <div className="flex items-center justify-center gap-4 p-6 bg-zinc-50 dark:bg-black">
        <h1>Home Page</h1>
        <h1>Count: {count}</h1>
        <Button onClick={increase}>+</Button>
        <Button onClick={decrease}>-</Button>
        <Button onClick={reset}>Reset</Button>
      </div>

      {/* Form Section */}
      <Card className="w-full sm:max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Bug Report</CardTitle>
          <CardDescription>Help us improve the system.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} id="bug-form">
            <FormField
              control={form.control}
              name="title"
              label="Bug Title"
              placeholder="Login button not working"
            />

            <TextAreaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Describe the issue in detail..."
              description="Include steps to reproduce and expected behavior."
            />
          </form>
        </CardContent>

        <CardFooter>
          <Button variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="bug-form">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
