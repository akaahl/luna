import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSiteRoute() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>New Site</CardTitle>
          <CardDescription>Create a new site to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input placeholder="My Site" />
            </div>
            <div className="grid gap-2">
              <Label>Subdirectory</Label>
              <Input placeholder="subdirectory" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea placeholder="My Site Description" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
