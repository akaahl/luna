"use client";

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
import { Atom } from "lucide-react";
import Image from "next/image";
import TailwindEditor from "../EditorWrapper";
import SubmitButton from "../SubmitButtons";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { toast } from "sonner";
import { useActionState, useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { CreatePostAction } from "@/app/actions";
import { postSchema } from "@/app/utils/zodSchemas";
import slugify from "react-slugify";

interface IAppProps {
  data: {
    title: string;
    slug: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
}

export default function EditArticleForm({ data }: IAppProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [title, setTitle] = useState<undefined | string>(data.title);
  const [slug, setSlugValue] = useState<undefined | string>(data.slug);

  const [lastResult, action] = useActionState(CreatePostAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleSlugGeneration = () => {
    const titleInput = title;

    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Please create a title first");
    }

    setSlugValue(slugify(titleInput));
    return toast.success("Slug has been created");
  };

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Article Details</CardTitle>
        <CardDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
          cumque necessitatibus architecto vero incidunt quos culpa ipsa
          expedita ipsam! Atque exercitationem repellendus aut tempora a?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          action={action}
          id={form.id}
          onSubmit={form.onSubmit}
        >
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              placeholder="NextJS blogging application"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-red-500 text-sm">{fields.title.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              key={fields.slug.key}
              name={fields.slug.name}
              defaultValue={fields.slug.initialValue}
              placeholder="Article slug"
              onChange={(e) => setSlugValue(e.target.value)}
              value={slug}
            />
            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
            <Button
              onClick={handleSlugGeneration}
              className="w-fit"
              variant="secondary"
              type="button"
            >
              <Atom className="size-4 mr-2" /> Generate Slug
            </Button>
          </div>
          <div className="grid gap-2">
            <Label>Short Description</Label>
            <Textarea
              key={fields.smallDescription.key}
              name={fields.smallDescription.name}
              defaultValue={data.smallDescription}
              placeholder="Short description for your article"
              className="h-32"
            />
            <p className="text-red-500 text-sm">
              {fields.smallDescription.errors}
            </p>
          </div>
          <div className="grid gap-2">
            <Label>Add cover image</Label>
            <input
              type="hidden"
              key={fields.coverImage.key}
              name={fields.coverImage.name}
              defaultValue={fields.coverImage.initialValue}
              value={imageUrl}
            />
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
            <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Article Content</Label>
            <input
              type="hidden"
              key={fields.articleContent.key}
              name={fields.articleContent.name}
              defaultValue={fields.articleContent.initialValue}
              value={JSON.stringify(value)}
            />
            <TailwindEditor initialValue={value} onChange={setValue} />
            <p className="text-red-500 text-sm">
              {fields.articleContent.errors}
            </p>
          </div>
          <SubmitButton text="Create article" />
        </form>
      </CardContent>
    </Card>
  );
}
