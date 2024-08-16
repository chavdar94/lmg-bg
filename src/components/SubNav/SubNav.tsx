import Link from "next/link";

export default function SubNav() {
  return (
    <nav className="m-auto py-6 relative">
      <ul className="flex flex-wrap justify-center gap-8 uppercase text-sm">
        <Link href="/products" className="cursor-pointer">
          продукти
        </Link>
        <Link href="#" className="cursor-pointer">
          новини
        </Link>
        <Link href="/services " className="cursor-pointer">
          услуги
        </Link>
        <Link href="#" className="cursor-pointer">
          сервиз
        </Link>
        <Link href="#" className="cursor-pointer">
          контакти
        </Link>
      </ul>
    </nav>
  );
}
