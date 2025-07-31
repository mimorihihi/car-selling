import CarList from '@/components/CarList';
import Layout from '@/components/Layout';

export default function CarsPage() {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tất cả xe hơi
            </h1>
            <p className="text-lg text-gray-600">
              Khám phá bộ sưu tập xe đa dạng với nhiều thương hiệu và mức giá
            </p>
          </div>
        </div>
      </div>

      {/* Cars List */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarList featured={false} />
        </div>
      </div>
    </Layout>
  );
} 