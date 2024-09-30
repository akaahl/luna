import SubmitButton from "@/app/components/dashboard/SubmitButtons";
import PricingTable from "@/app/components/shared/PricingTable";
import { useGetUrl } from "@/app/hooks/url";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { stripe } from "@/app/utils/stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      User: {
        select: {
          customerId: true,
        },
      },
    },
  });

  return data;
}

export default async function PricingRoute() {
  const user = await requireUser();
  const data = await getData(user.id);
  const { rootUrl } = useGetUrl();

  async function createCustomerPortal() {
    "use server";

    const session = await stripe.billingPortal.sessions.create({
      customer: data?.User?.customerId as string,
      return_url: `${rootUrl}/dashboard/`,
    });

    return redirect(session.url);
  }

  if (data?.status === "active") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
          <CardDescription>
            Click on the button below to change your payment details and view
            your invoices at the same time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCustomerPortal}>
            <SubmitButton text="View subscription details" />
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center w-full ">
      <PricingTable />
    </div>
  );
}
