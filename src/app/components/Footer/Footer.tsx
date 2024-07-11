import { ChevronRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 px-96 flex justify-between py-10 mt-20">
      <div>
        <h2 className="uppercase font-bold text-md mb-2">LMG Computers</h2>
        <ul>
          <li className="flex items-center cursor-pointer">
            <ChevronRight size={16} />
            <p>За нас</p>
          </li>
          <li className="flex items-center cursor-pointer">
            <ChevronRight size={16} />
            <p>Блог</p>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="uppercase font-bold text-md mb-2">Полезни връзки</h2>
        <ul>
          <li className="flex items-center cursor-pointer">
            <ChevronRight size={16} />
            <p>Плащане и доставка</p>
          </li>
          <li className="flex items-center cursor-pointer">
            <ChevronRight size={16} />
            <p>Връщане на стока</p>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="uppercase font-bold text-md mb-2">Връзка с нас</h2>
        <ul>
          <li className="flex items-center ">
            <ChevronRight size={16} />
            <p>София, бул. Патриарх Евтимий 98 (5-те кьошета)</p>
          </li>
          <li className="flex items-center">
            <ChevronRight size={16} />
            <p>телефон: (02) 852 42 22</p>
          </li>
          <li className="flex items-center">
            <ChevronRight size={16} />
            <p>мобилен телефон: 089 741 32 41</p>
          </li>
          <li className="flex items-center">
            <ChevronRight size={16} />
            <p>email: lmg_bg@abv.bg</p>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
