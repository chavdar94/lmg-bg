import Link from "next/link";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <nav className="flex gap-3 uppercase mb-2">
        <Link href="/admin/post">Новини</Link>
        <Link href="/admin/used">Втора употреба</Link>
        <Link href="/admin/services">услуги</Link>
      </nav>
      <hr className="mb-2" />
      <main>
        {children} {/* This renders the nested route content */}
      </main>
    </div>
  );
};

export default AdminLayout;
