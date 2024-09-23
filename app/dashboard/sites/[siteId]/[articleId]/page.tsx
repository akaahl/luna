import EditArticleForm from "@/app/components/dashboard/forms/EditArticleForm";
import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }
}

export default async function EditRoute({
  params,
}: {
  params: { siteId: string; articleId: string };
}) {
  const data = await getData(params.articleId);

  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" className="mr-3" variant="outline" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
      </div>
      {/* <EditArticleForm data={data} /> */}
    </div>
  );
}
