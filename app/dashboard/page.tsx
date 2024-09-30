import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmptyState from "../components/dashboard/EmptyState";
import prisma from "../utils/db";
import { requireUser } from "../utils/requireUser";
import Image from "next/image";
import DefaultImage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.post.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return { sites, articles };
}

export default async function DashboardIndexPage() {
  const user = await requireUser();
  const { articles, sites } = await getData(user.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {sites.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>View site</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          buttonText="Create site"
          href="/dashboard/sites/create"
          title="You don't have any sites created"
          description="You currently do not have any sites. Please create them so you can see them here."
        />
      )}
      <h1 className="text-2xl mt-10 font-semibold mb-5">Recent articles</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {articles.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.image ?? DefaultImage}
                alt={item.title}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.smallDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                    Edit article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          buttonText="Create article"
          href="/dashboard/sites"
          title="You don't have any articles created"
          description="You currently do not have any articles. Please create them so you can see them here."
        />
      )}
    </div>
  );
}
