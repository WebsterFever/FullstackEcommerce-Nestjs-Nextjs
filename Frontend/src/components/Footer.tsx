
const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🔥 Brand */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">
            WSL Store
          </h2>
          <p className="text-sm text-gray-400">
            Premium products at the best prices. Shop with confidence and style.
          </p>
        </div>

       
        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">All Products</li>
            <li className="hover:text-white cursor-pointer">New Arrivals</li>
            <li className="hover:text-white cursor-pointer">Best Sellers</li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe to get updates and offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-md outline-none text-black"
            />
            <button className="bg-white text-black px-4 rounded-r-md hover:bg-gray-200 transition">
              Join
            </button>
          </div>
        </div>

      </div>

   
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} WSL Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;