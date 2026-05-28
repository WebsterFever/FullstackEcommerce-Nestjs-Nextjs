import CardList from "@/components/CardList";

const HomeView = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        
        </h1>
        <p className="text-gray-500 mt-2">
          Discover the best products just for you
        </p>
      </div>

      {/* Products */}
      <CardList />

    </div>
  );
};

export default HomeView;
