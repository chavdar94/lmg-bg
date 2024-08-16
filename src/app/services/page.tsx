import { Computer } from "lucide-react";

function ServicesPage() {
  return (
    <section className="flex flex-col justify-center items-center bg-[#fafafa]  ">
      <h1 className="text-center text-4xl md:text-5xl my-6 font-extrabold">
        Нашите услуги
      </h1>
      <section className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mt-4">
        <article className="min-h-[220px] max-w-[300px] p-8 flex justify-center items-center flex-col bg-[#fff]  shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
          <Computer size={30} className="m-5 text-[#ff5742]" />
          <h2 className="mb-3 font-normal text-center text-2xl">Title</h2>
          <p className="text-[#6c757d] text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
            sapiente!
          </p>
        </article>
        <article className="min-h-[220px] max-w-[300px] p-8 flex justify-center items-center flex-col bg-[#fff]  shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
          <Computer size={30} className="m-5 text-[#ff5742]" />
          <h2 className="mb-3 font-normal text-center text-2xl">Title</h2>
          <p className="text-[#6c757d] text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
            sapiente!
          </p>
        </article>
        <article className="min-h-[220px] max-w-[300px] p-8 flex justify-center items-center flex-col bg-[#fff]  shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
          <Computer size={30} className="m-5 text-[#ff5742]" />
          <h2 className="mb-3 font-normal text-center text-2xl">Title</h2>
          <p className="text-[#6c757d] text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
            sapiente!
          </p>
        </article>
        <article className="min-h-[220px] max-w-[300px] p-8 flex justify-center items-center flex-col bg-[#fff]  shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
          <Computer size={30} className="m-5 text-[#ff5742]" />
          <h2 className="mb-3 font-normal text-center text-2xl">Title</h2>
          <p className="text-[#6c757d] text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
            sapiente!
          </p>
        </article>
        <article className="min-h-[220px] max-w-[300px] p-8 flex justify-center items-center flex-col bg-[#fff]  shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
          <Computer size={30} className="m-5 text-[#ff5742]" />
          <h2 className="mb-3 font-normal text-center text-2xl">Title</h2>
          <p className="text-[#6c757d] text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
            sapiente!
          </p>
        </article>
        <article className="min-h-[220px] max-w-[300px] p-8 flex justify-center items-center flex-col bg-[#fff]  shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
          <Computer size={30} className="m-5 text-[#ff5742]" />
          <h2 className="mb-3 font-normal text-center text-2xl">Title</h2>
          <p className="text-[#6c757d] text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
            sapiente!
          </p>
        </article>
      </section>
    </section>
  );
}
export default ServicesPage;
