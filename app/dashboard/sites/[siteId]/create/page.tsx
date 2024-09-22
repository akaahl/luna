"use client";

import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
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
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";

export default function ArticleCreationRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);

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
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt="Uploaded image"
                  className="object-cover w-[200px] h-[200px] rounded-lg"
                />
              ) : (
                <UploadDropzone
                  className="border-input"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                    toast.success("Image has been uploaded");
                  }}
                  onUploadError={(error: Error) => {
                    toast.error("Something went wrong");
                  }}
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label>Article Content</Label>
              <TailwindEditor initialValue={value} onChange={setValue} />
            </div>
            <Button className="w-fit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
