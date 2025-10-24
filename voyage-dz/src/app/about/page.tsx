import { Building, Globe, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-96 w-full">
        <Image
          src="/placeholder.svg" // Replace with a stunning image of Algeria
          alt="Algerian Landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">
            Connecting You to the Heart of Algeria
          </h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Voyage DZ was born from a simple yet powerful idea: to make the rich beauty and diverse culture of Algeria accessible to everyone. We saw a gap between eager travelers and the fantastic local agencies offering unique experiences. Our mission is to bridge that gap.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We are a team of passionate travelers, tech enthusiasts, and proud Algerians dedicated to creating a platform that is not just a directory, but a gateway to unforgettable adventures. We believe that travel is about connection – to places, to people, and to experiences.
            </p>
          </div>
          <div className="relative h-80 w-full">
            <Image
              src="/placeholder.svg" // Replace with an image of the team or a collage of destinations
              alt="Our Inspiration"
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Authenticity</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Promoting genuine local experiences that showcase the true spirit of Algeria.
              </p>
            </div>
            <div className="p-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Empowerment</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Supporting local travel agencies and helping their businesses thrive in the digital age.
              </p>
            </div>
            <div className="p-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Building a trusted network of travelers and agencies who share a passion for exploration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
