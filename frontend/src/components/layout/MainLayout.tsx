export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Freject</h2>
        <nav className="space-y-4">
          <p>Dashboard</p>
          <p>Clientes</p>
          <p>Proyectos</p>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}