import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { JsonValue } from "@prisma/client/runtime/library";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Data {
  title: string;
  articleContent: JsonValue;
  smallDescription: string;
  image: string;
}

async function getData(slug: string): Promise<Data> {
  const data = await prisma.post.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      smallDescription: true,
      articleContent: true,
      image: true,
    },
  });

  return data!;
}

export default async function SlugRoute({
  params,
}: {
  params: { slug: string; name: string };
}) {
  const data = await getData(params.slug);

  return (
    <>
      <div className="flex items-center gap-x-3 pt-10 pb-5">
        <Button size="icon" variant="outline" asChild>
          <Link href={`/blog/${params.name}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-medium">Go back</h1>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-muted-foreground md:text-base">
            16 Apr 2024
          </p>
          <h1 className="mb-5 text-3xl font-bold md:text-6xl tracking-tight">
            {data.title}
          </h1>
          <p className="m-auto w-10/12 text-muted-foreground line-clamp-3">
            {data.smallDescription}
          </p>
        </div>
      </div>
      <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-[450px] md:w-5/6 md:rounded-2xl lg:w-2/3">
        <Image
          src={data.image}
          alt={data.title}
          height={630}
          width={1200}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </>
  );
}
