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
import ProductImages from "@/components/ProductImages/ProductImages";

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

  const disabled = product.product_status === "В наличност" ? false : true;

  const images = {
    main_pic: product.gallery[0] ?? "",
    gallery: [...product.gallery],
  };

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
          <ProductImages images={images} />
          <div className="flex flex-col md:flex-col gap-4 mt-10 md:mt-0 w-full md:w-1/2 h-80 justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-bold">{product?.name}</h1>
              <hr />
              <div className="text-sm text-muted-foreground flex gap-6">
                <p>
                  Категория:{" "}
                  <span className="text-slate-900">{product?.category}</span>{" "}
                  /{" "}
                </p>
                <p>
                  Производител:{" "}
                  <span className="text-slate-900">
                    {product?.manufacturer}
                  </span>
                </p>
              </div>
              <div>
                <div className="flex gap-4 items-center">
                  <p className="text-4xl font-bold text-[#026b66]">
                    {formatPrice(product.price_eur!, {
                      currency: "EUR",
                      notation: "standard",
                      IntlFormat: "bg-BG",
                    })}
                  </p>

                  <p className="text-lg text-gray-600">
                    {`(${formatPrice(product.price_bgn!, {
                      currency: "BGN",
                      notation: "standard",
                      IntlFormat: "bg-BG",
                    })})`}
                  </p>
                </div>
                <p
                  className={`text-sm inline-block px-3 py-1 mt-2 text-white ${
                    product?.product_status === "В наличност"
                      ? "bg-[#3c3]"
                      : "bg-red-500"
                  }`}
                >
                  {product?.product_status === "В наличност"
                    ? "В наличност"
                    : "Обадете се"}
                </p>
                {product.product_status !== "В наличност" && (
                  <p className="mt-4">
                    Продукта в момента не е наличен. Моля обадете се или
                    напишете{" "}
                    <Link href={`/contact`} className="underline">
                      имейл
                    </Link>{" "}
                    за повече информация.
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <AddToCartButton
                disabled={disabled}
                product={product as CartProduct}
                className="bg-slate-800 hover:bg-slate-950 uppercase text-white  py-3 px-10 w-full lg:w-full xl:w-2/3"
              />
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col justify-start mt-4">
          <p className="text-xl ">Характеристики:</p>
          <div className="border-1-text-muted-foreground border p-3">
            {product?.properties &&
            typeof product.properties === "object" &&
            Object.keys(product.properties).length > 0 ? (
              Object.entries(product.properties as Record<string, string>)
                .filter(([name, value]) => value && value !== "-")
                .map(([name, value]) => (
                  <div
                    className="flex justify-start text-muted-foreground mb-1"
                    key={name}
                  >
                    <span className="pr-1">{name}: </span>
                    <span>{value}</span>
                  </div>
                ))
            ) : (
              <span className="text-muted-foreground">
                Нямаме налични характеристики за този продукт.
              </span>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
