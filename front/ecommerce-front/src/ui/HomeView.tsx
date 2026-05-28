import CardList from "@/components/CardList";

const HomeView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Hero Section with Brand Image */}
        <div className="mb-16">
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12 shadow-2xl">
            {/* Brand Image Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700">
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 mx-auto border border-white/30">
                  <span className="text-6xl">✦</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-3">Premium Collection</h2>
                <p className="text-white/80 text-lg">Experience excellence in every product</p>
              </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent"></div>
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded"></div>
            <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">
              Curated Collection
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Our Products
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Discover our premium collection of carefully selected products designed to elevate your experience
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-12"></div>

        {/* Products Grid */}
        <CardList />
        
      </div>
    </div>
  );
};

export default HomeView;