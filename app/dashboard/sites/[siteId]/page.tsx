import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId: string, siteId: string) {
  const data = await prisma.post.findMany({
    where: {
      userId,
      siteId,
    },
    select: {
      image: true,
      title: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function SiteIdRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id, params.siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link href="#">
            <Book className="size-4 mr-2" /> View Blog
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="#">
            <Settings className="size-4 mr-2" /> Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href="#">
            <PlusCircle className="size-4 mr-2" /> Create article
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <div>
          <h1>No data</h1>
        </div>
      ) : (
        <div>
          <h1>Data is here</h1>
        </div>
      )}
    </>
  );
}
