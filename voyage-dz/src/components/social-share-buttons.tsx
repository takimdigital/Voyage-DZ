"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function SocialShareButtons({ title }: { title: string }) {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  return (
    <div className="flex items-center gap-2 mt-4">
        <p className="font-semibold">Share this package:</p>
      <Button variant="outline" size="icon" onClick={() => window.open(shareLinks.facebook, "_blank")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </Button>
      <Button variant="outline" size="icon" onClick={() => window.open(shareLinks.twitter, "_blank")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1-3 .5c0 0-3 6-11 7-5-5 1-11 1-11s-2 1-3-2c-1-2 2-4 2-4s-2-2 2-3c3-1 5 1 5 1z"/></svg>
      </Button>
      <Button variant="outline" size="icon" onClick={() => window.open(shareLinks.whatsapp, "_blank")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
      </Button>
    </div>
  );
}
