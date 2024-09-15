import { getUsedProduct } from "@/app/used/actions";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import { CartProduct } from "@/definitions/types";
import { formatPrice, title } from "@/lib/utils";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getProduct } from "../../actions";

type Props = {
  params: { productId: string };
};
export default async function ProcutDetails({ params }: Props) {
  let product;

  try {
    product = await getProduct(params.productId);
    if (!product) throw new Error("Product not found");
  } catch (error) {
    product = await getUsedProduct(params.productId);

    if (!product) {
      return null;
    }
  }

  const disabled = product.product_status === "Наличен" ? false : true;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">Начало</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/categories/${product.slug}`}>
              {title(product.slug)}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col gap-10">
        <section className="flex flex-col-reverse md:flex-row md:mt-10 gap-6">
          <div className="w-full md:w-1/2 h-80 flex justify-center items-center border-1-text-muted-foreground border">
            <Image
              src={
                (product?.main_picture_url as string) ??
                "/categoriesImages/no-image.jpg"
              }
              alt={product?.name!}
              width={200}
              height={200}
              className="w-72 h-72 object-contain"
            />
          </div>
          <div className="flex flex-col md:flex-col gap-4 mt-10 md:mt-0 w-full md:w-1/2 h-80 justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-bold">{product?.name}</h1>
              <hr />
              <div className="text-sm text-muted-foreground flex gap-6">
                <p>
                  Категория:{" "}
                  <span className="text-slate-900">{product?.category}</span> /{" "}
                  <span className="text-slate-900">{product?.subcategory}</span>
                </p>
                <p>
                  Производител:{" "}
                  <span className="text-slate-900">
                    {product?.manufacturer}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#026b66]">
                  {formatPrice(product.price_with_vat!, {
                    currency: "BGN",
                    notation: "standard",
                    IntlFormat: "bg-BG",
                  })}
                </p>
                <p
                  className={`text-sm inline-block px-3 py-1 mt-2 text-white ${
                    product?.product_status === "Наличен"
                      ? "bg-[#3c3]"
                      : "bg-red-500"
                  }`}
                >
                  {product?.product_status === "Наличен"
                    ? "В наличност"
                    : "Обадете се"}
                </p>
                <p className="mt-4">
                  Продукта в момента не е наличен. Моля обадете се или напишете{" "}
                  <Link href={`/contact`} className="underline">
                    имейл
                  </Link>{" "}
                  за повече информация.
                </p>
              </div>
            </div>
            <div className="">
              <AddToCartButton
                disabled={disabled}
                product={product as CartProduct}
                className="bg-slate-800 hover:bg-slate-950 uppercase text-white py-3 px-10 w-full lg:w-full xl:w-2/3"
              />
            </div>
          </div>
        </section>
        <section className="w-full flex justify-start mt-4">
          <div className="w-full">
            <h2 className="font-bold uppercase pl-4 pb-2">Описание</h2>
            <div className="border-b-2 border-black w-[35%] md:w-[20%] lg:w-[9%] ml-3" />
            <div className="border-1-text-muted-foreground border p-3">
              {typeof product?.properties === "string" && product?.properties}
              {(Array.isArray(product?.properties) ? product?.properties : [])
                .filter(
                  (property: any) => property.value && property.value !== "-"
                )
                .map((property: any, index: number) => (
                  <div
                    className="flex justify-start text-muted-foreground mb-1"
                    key={index}
                  >
                    <span className="pr-1">{property.name}: </span>
                    <span>{property.value}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
