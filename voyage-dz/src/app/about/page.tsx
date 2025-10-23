export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold">About Voyage DZ</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Our vision is to make discovering travel packages in Algeria as easy and enjoyable as possible.
      </p>
      <div className="mt-8 prose lg:prose-xl">
        <p>
          Voyage DZ was founded with a simple mission: to connect Algerian travelers with the best local travel agencies. We believe in the power of travel to create unforgettable experiences and we want to be the bridge that makes those experiences happen.
        </p>
        <p>
          Our platform is designed to be a one-stop-shop for all your travel needs, providing a comprehensive directory of packages and agencies, all in one place. We are passionate about showcasing the beauty of Algeria and helping our users to explore it.
        </p>
      </div>
    </div>
  );
}
