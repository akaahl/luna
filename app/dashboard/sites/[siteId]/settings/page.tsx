import { DeleteSite } from "@/app/actions";
import UploadImageForm from "@/app/components/dashboard/forms/UploadImageForm";
import SubmitButton from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SettingsPageRoute({
  params,
}: {
  params: { siteId: string };
}) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
      </div>
      <UploadImageForm siteId={params.siteId} />
      <Card className="border-red-500 bg-red-500/10">
        <CardHeader>
          <CardTitle>Danger</CardTitle>
          <CardDescription className="text-red-500">
            This will delete your site including all articles associated with
            it. Do you want to proceed?
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteSite}>
            <input type="hidden" name="siteId" value={params.siteId} />
            <SubmitButton text="Delete everything" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
