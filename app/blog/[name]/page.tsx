import prisma from "@/app/utils/db";
import { notFound } from "next/navigation";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { ThemeToggle } from "@/app/components/dashboard/ThemeToggle";

async function getData(subdirectory: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory,
    },
    select: {
      name: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BlogIndexPage({
  params,
}: {
  params: { name: string };
}) {
  const data = await getData(params.name);

  return (
    <>
      <nav className="grid grid-cols-3 my-10">
        <div className="cols-span-1" />
        <div className="flex items-center justify-center gap-x-4">
          <Image src={Logo} alt="logo image" height={40} width={40} />
          <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        </div>
        <data className="col-span-1 flex w-full">
          <ThemeToggle />
        </data>
      </nav>
    </>
  );
}
