import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 Voyage DZ. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
          <Link href="/about" className="text-sm hover:underline underline-offset-4">
            About Us
          </Link>
          <Link href="/terms" className="text-sm hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
