import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            We&apos;d love to hear from you. Whether you have a question, feedback, or need support, we&apos;re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Our Office</h3>
                <p className="text-gray-600 dark:text-gray-400">123 Travel Lane, Algiers, Algeria</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400">support@voyagedz.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400">+213 (0) 555 123 456</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <Input id="name" type="text" placeholder="Your Name" className="mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <Textarea id="message" placeholder="Your message..." className="mt-1" rows={5} />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
