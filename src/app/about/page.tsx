import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Carbon Credit Marketplace</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What are Carbon Credits?</h2>
        <p className="mb-4 text-gray-700">
          Carbon credits are tradable certificates that represent the reduction of one metric ton of carbon dioxide or its equivalent in other greenhouse gases. They are a key tool in the fight against climate change, enabling businesses and individuals to offset their carbon footprint by investing in environmental projects around the world.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">1. Create Projects</h3>
            <p className="text-gray-600">Project developers create and register carbon reduction projects that meet international standards.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">2. Verification</h3>
            <p className="text-gray-600">Independent third parties verify the carbon reductions achieved by each project.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">3. Trade & Retire</h3>
            <p className="text-gray-600">Businesses and individuals can purchase and retire credits to offset their emissions.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Our Platform?</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Transparent and verifiable carbon credits</li>
          <li>Wide range of project types (renewable energy, reforestation, etc.)</li>
          <li>Secure and easy-to-use marketplace</li>
          <li>Real-time tracking of your carbon offset impact</li>
          <li>Compliance with international carbon standards</li>
        </ul>
      </section>

      <section className="text-center">
        <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
          Back to Home
        </Link>
      </section>
    </div>
  );
}
