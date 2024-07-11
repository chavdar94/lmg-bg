import { cn } from "@/lib/utils";

const SubMenuHover = ({
  menus,
  className,
}: {
  menus: string[];
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        "absolute bg-white z-10 w-64 text-center border border-slate-400 transition-all duration-300 ease-in-out uppercase",
        className
      )}
    >
      {menus.map((menu) => (
        <>
          <li className="py-2 px-4 text-slate-600 hover:text-slate-950">
            {menu}
          </li>
          <hr className="w-full" />
        </>
      ))}
    </ul>
  );
};
export default SubMenuHover;
