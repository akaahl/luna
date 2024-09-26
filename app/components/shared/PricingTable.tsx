import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import SubmitButton from "../dashboard/SubmitButtons";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best plan for people who are just starting out.",
    priceTitle: "Free",
    benefits: [
      "1 site",
      "Up to 1000 visitors per month",
      "Basic SEO optimization",
      "Limited customer support",
    ],
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDescription: "The best plan for professionals.",
    priceTitle: "$29.95",
    benefits: [
      "Unlimited sites",
      "Unlimited visitors per month",
      "Advanced SEO optimization",
      "Priority customer support",
      "E-commerce integration",
      "Custom domain support",
    ],
  },
];

export default function PricingTable() {
  return (
    <div className="mt-10 max-w-[1200px]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing plans for everyone and every budget!
        </h1>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-mute-foreground">
        Flexible plans tailored to individual needs, with transparent pricing
        and easy-to-understand options for seamless selection.
      </p>
      <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="mb-4">
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">{item.cardTitle}</h3>
                    <p className="rounded-full bg-primary/30 px-3 py-1 text-xs font-semibold leading-5">
                      Most popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-mute-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="text-primary size-5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full">
                  <SubmitButton text="Buy plan" className="w-full mt-5" />
                </form>
              ) : (
                <Button variant="outline" className="w-full mt-5">
                  Try for free
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
