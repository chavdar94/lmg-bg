import { PhoneForwarded, ShoppingCart } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="flex justify-around md:justify-between flex-wrap px-4 md:px-24 lg:px-36 xl:px-96 py-4 items-center bg-slate-100">
      <Image
        src="/LOGO.png"
        width={100}
        height={100}
        alt="logo"
        className="w-36 h-6"
      />
      <div className="flex gap-24 justify-center items-center">
        <div className="hidden md:flex justify-center items-center gap-2">
          <PhoneForwarded size={34} />
          <div className="text-sm">
            <p>Бърз контакт с нас</p>
            <p>+359 897 413 241</p>
          </div>
        </div>
        <ShoppingCart size={28} />
      </div>
    </nav>
  );
};
export default Header;
