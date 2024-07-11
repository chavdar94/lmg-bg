import categories from "@/data/subMenus.json";
import Image from "next/image";

const MobileCategories = () => {
  const data = categories[0];

  const subComponents = Object.keys(data);
  subComponents.forEach((subComponent, index) => {
    if (subComponent === "computers") {
      subComponents[index] = "компютри";
    }
    if (subComponent === "components") {
      subComponents[index] = "компоненти";
    }
    if (subComponent === "peripherals") {
      subComponents[index] = "периферия";
    }
    if (subComponent === "laptops") {
      subComponents[index] = "лаптопи";
    }
    if (subComponent === "second-hand") {
      subComponents[index] = "втора употреба";
    }
  });

  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-4 md:hidden">
      <h2 className="text-2xl uppercase font-bold">категории</h2>
      {subComponents.map((subComponent) => (
        <div
          key={subComponent}
          className="flex items-center cursor-pointer uppercase"
        >
          <p>{subComponent}</p>
        </div>
      ))}
    </div>
  );
};
export default MobileCategories;
