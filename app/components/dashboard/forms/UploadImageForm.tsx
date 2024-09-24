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

export default function UploadImageForm() {
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
        <SubmitButton text="Change image" />
      </CardFooter>
    </Card>
  );
}
