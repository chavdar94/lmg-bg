import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import LogoutForm from "../Logout/LogoutForm";

export default async function SubNav() {
  const { user } = await validateRequest();
  return (
    <nav className="m-auto py-6">
      <ul className="flex flex-wrap justify-center gap-8 uppercase text-sm">
        <Link href="/categories" className="cursor-pointer">
          категории
        </Link>
        <Link href="#" className="cursor-pointer">
          новини
        </Link>
        <Link href="/services " className="cursor-pointer">
          услуги
        </Link>
        <Link href="/contact" className="cursor-pointer">
          контакти
        </Link>
        {user?.isAdmin && (
          <>
            <Link href="/admin" className="cursor-pointer">
              админ
            </Link>
            <LogoutForm />
          </>
        )}
      </ul>
    </nav>
  );
}
