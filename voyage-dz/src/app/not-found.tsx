import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2">
        The page you are looking for does not exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}