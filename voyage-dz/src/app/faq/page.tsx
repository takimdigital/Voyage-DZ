import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Voyage DZ',
  description: 'Find answers to common questions about booking travel packages, working with agencies, and using the Voyage DZ platform.',
};

export default function FAQPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Have questions? We&apos;ve got answers.
        </p>
      </header>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">For Travelers</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I book a package?</AccordionTrigger>
            <AccordionContent>
              Voyage DZ is a discovery platform, not a booking engine. To book a package, you need to contact the travel agency directly using the phone number or email address provided on the package detail page.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is Voyage DZ a travel agency?</AccordionTrigger>
            <AccordionContent>
              No, we are not a travel agency. We are a platform that connects you with local Algerian travel agencies. We do not handle bookings or payments.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How can I trust the agencies on your platform?</AccordionTrigger>
            <AccordionContent>
              We have a vetting process for all agencies that join our platform to ensure they are reputable and certified. We also encourage you to check their reviews and contact them with any questions you may have.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2 className="text-2xl font-bold mb-4 mt-12">For Agencies</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I list my agency on Voyage DZ?</AccordionTrigger>
            <AccordionContent>
              You can register your agency by clicking the &quot;Agency Login&quot; button in the header and then selecting &quot;Register&quot;. You will need to provide some basic information about your agency for our review process.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is there a fee to join?</AccordionTrigger>
            <AccordionContent>
              We are currently in our launch phase and are offering free listings for all registered agencies. We may introduce subscription plans in the future.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
