import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow">
      <Link className="flex items-center justify-center" href="/">
        <span className="sr-only">Voyage DZ</span>
        <span className="font-semibold text-lg">Voyage DZ</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/packages"
        >
          Packages
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/destinations"
        >
          Destinations
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/agencies"
        >
          Agencies
        </Link>
        <Link href="/login">
          <Button>Agency Login</Button>
        </Link>
      </nav>
    </header>
  );
}
