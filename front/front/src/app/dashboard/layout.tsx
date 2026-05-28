import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-gray-50 pt-24 px-4">
      
      {/* 🔥 NAVBAR */}
      <div >
        <div >
          
          <Link
            href="/dashboard"
            
          >
           
          </Link>

          <Link
            href="/dashboard/orders"
           
          >
          
          </Link>
        </div>
      </div>

      {/* 📦 CONTENT */}
      <div >
        {children}
      </div>
    </section>
  );
}