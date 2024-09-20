"use client";

import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Atom } from "lucide-react";
import Link from "next/link";

export default function ArticleCreationRoute({
  params,
}: {
  params: { siteId: string };
}) {
  return (
    <>
      <div className="flex items-center">
        <Button size={"icon"} variant={"outline"} className="mr-3" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur cumque necessitatibus architecto vero incidunt quos
            culpa ipsa expedita ipsam! Atque exercitationem repellendus aut
            tempora a?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" action="">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="NextJS blogging application" />
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="Article slug" />
              <Button className="w-fit" variant="secondary" type="button">
                <Atom className="size-4 mr-2" /> Generate Slug
              </Button>
            </div>
            <div className="grid gap-2">
              <Label>Short Description</Label>
              <Textarea
                placeholder="Short description for your article"
                className="h-32"
              />
            </div>
            <div className="grid gap-2">
              <Label>Add cover image</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
