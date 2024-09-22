"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface IAppProps {
  text: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export default function SubmitButton({ text, className, variant }: IAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className={cn("w-fit", className)}>
          <Loader2 className="mr-2 animate-spin size-4" /> Please wait
        </Button>
      ) : (
        <Button
          variant={variant}
          className={cn("w-fit", className)}
          type="submit"
        >
          {text}
        </Button>
      )}
    </>
  );
}
