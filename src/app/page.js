import CarList from '@/components/CarList';
import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import Services from '@/components/Services';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />

      {/* Featured Cars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Xe nổi bật
            </h2>
            <p className="text-lg text-gray-600">
              Khám phá những mẫu xe chất lượng cao với giá tốt nhất
            </p>
          </div>
          <CarList featured={true} />
        </div>
      </section>

      {/* Services Section */}
      <Services />
    </Layout>
  );
}
