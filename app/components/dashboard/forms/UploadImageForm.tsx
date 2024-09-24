"use client";

import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import SubmitButton from "../SubmitButtons";
import { toast } from "sonner";
import { UpdateImage } from "@/app/actions";

interface iAppProps {
  siteId: string;
}

export default function UploadImageForm({ siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is the image of your site, you can change it here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={200}
            height={200}
            alt="Uploaded image"
            className="size-[200px] rounded-lg object-cover"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            className="border-input"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Image has been uploaded");
            }}
            onUploadError={(error: Error) => {
              toast.error("Something went wrong");
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
          <input type="hidden" name="siteId" value={siteId} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <SubmitButton text="Change image" />
        </form>
      </CardFooter>
    </Card>
  );
}
