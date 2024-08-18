import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <h1 className="text-3xl text-bold">LMG computers</h1>
      <Image
        src={"/back_1.jpg"}
        alt="about-image"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-[400px] object-none"
      />
      <div className="self-start flex flex-col gap-2">
        <p className="text-xl">
          LMG computers е магазин в центъра на София, който предлага качествени
          продукти на ниски цени като:
        </p>
        <ul className="pl-0 md:pl-2 text-slate-500">
          <li>- компютърни конфигурации</li>
          <li>- хардуер</li>
          <li>- софтуер</li>
          <li>- принтери</li>
          <li>- скенери</li>
          <li>- компоненти</li>
          <li>- консумативи и други</li>
        </ul>
      </div>

      <p className="self-start text-slate-500">
        За повече информация моля отворете нашите{" "}
        <Link
          className="text-md text-black uppercase underline font-semibold"
          href={"/services"}
        >
          Услуги
        </Link>{" "}
        или разгледайте нашите{" "}
        <Link
          className="text-md text-black uppercase underline font-semibold"
          href={"/categories"}
        >
          Продукти
        </Link>
      </p>
    </div>
  );
};
export default About;

`


– компютърни конфигурации
– хардуер
– софтуер
– принтери
– скенери
– компоненти
– консумативи и други
`;
