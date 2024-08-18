import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Service, ServiceCategory } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import { getCategories, getServices } from "./actions";

export const revalidate = 86400;

async function ServicesPage() {
  const [serviceCategories, services] = await Promise.all([
    getCategories(),
    getServices(),
  ]);

  return (
    <>
      <h1 className="text-center text-4xl font-semibold uppercase my-4">
        Предлагани услуги
      </h1>
      <Accordion type="single" collapsible className="w-full mt-12">
        {serviceCategories.map((category: ServiceCategory) => (
          <AccordionItem value={category.id} key={category.id}>
            <AccordionTrigger>{category.title}</AccordionTrigger>
            <AccordionContent>
              <ul className="w-full">
                {services
                  .filter(
                    (service: Service) => service.categoryId === category.id
                  )
                  .map((service) => (
                    <li
                      key={service.id}
                      className="flex justify-between px-2 py-1.5 text-slate-500"
                    >
                      <div className="flex justify-center items-center">
                        <ChevronRightIcon className="w-4 h-4" />
                        <span>{service.title}</span>
                      </div>
                      <span>
                        {service.price > 0
                          ? `${service.price} лв.`
                          : "Безплатно"}
                      </span>
                    </li>
                  ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default ServicesPage;
