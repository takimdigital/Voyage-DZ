import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <span className="text-xl font-bold tracking-wide">Voyage DZ</span>
            </Link>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-800">
                Discover the best travel packages in Algeria. Your next adventure starts here.
              </p>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h3>
                <form className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Quick Links</p>
            <ul className="mt-2 space-y-2">
              <li><Link href="/packages" className="text-gray-600 transition-colors duration-300 hover:text-primary">Packages</Link></li>
              <li><Link href="/destinations" className="text-gray-600 transition-colors duration-300 hover:text-primary">Destinations</Link></li>
              <li><Link href="/agencies" className="text-gray-600 transition-colors duration-300 hover:text-primary">Agencies</Link></li>
              <li><Link href="/blog" className="text-gray-600 transition-colors duration-300 hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Support</p>
            <ul className="mt-2 space-y-2">
              <li><Link href="/about" className="text-gray-600 transition-colors duration-300 hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 transition-colors duration-300 hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-600 transition-colors duration-300 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600">
            © 2025 Voyage DZ. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link href="#" className="text-gray-500 transition-colors duration-300 hover:text-primary"><Twitter className="h-6 w-6" /></Link>
            <Link href="#" className="text-gray-500 transition-colors duration-300 hover:text-primary"><Instagram className="h-6 w-6" /></Link>
            <Link href="#" className="text-gray-500 transition-colors duration-300 hover:text-primary"><Facebook className="h-6 w-6" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
