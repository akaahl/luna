import Link from "next/link";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { ThemeToggle } from "../dashboard/ThemeToggle";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Logo" className="size-10" />
            <h4 className="text-3xl font-semibold">Luna</h4>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
        </nav>
      </div>
    </>
  );
}
