import { FC } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { PAGE_SIZE } from "@/lib/constants";
import PaginationContainer from "@/components/Pagination/PaginationContainer";
import { FiltersContainer } from "@/components/FiltersContainer/FiltersContainer";
import { getProductsByCategory, getProductsCount } from "../actions";

type OrderBy = {
  price?: "asc" | "desc";
  name?: "asc" | "desc";
};

interface Props {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Category: FC<Props> = async ({ params, searchParams }: Props) => {
  const page = Number(searchParams?.page) || 1;
  const filter = searchParams?.filter || "";

  const orderBy: OrderBy = (() => {
    switch (filter) {
      case "priceDesc":
        return { price_with_vat: "desc" };
      case "priceAsc":
        return { price_with_vat: "asc" };
      case "nameDesc":
        return { name: "desc" };
      case "nameAsc":
        return { name: "asc" };
      case "statusAsc":
        return { product_status: "asc" };
      default:
        return { name: "asc" }; // Default ordering
    }
  })();

  const [products, productsCount] = await Promise.all([
    await getProductsByCategory(params.slug, orderBy, page),
    await getProductsCount(params.slug),
  ]);

  const totalPages = Math.floor(productsCount / PAGE_SIZE);

  return (
    <>
      {products.length === 0 ? (
        <div className="text-center mt-10 h-[468px]">
          <h1 className="text-4xl font-bold">Няма намерени продукти</h1>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center">
          <div className="w-full">
            <FiltersContainer />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-auto mt-10 w-full">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <div className="m-auto mt-10 w-full">
            <PaginationContainer
              totalPages={totalPages}
              currentPage={page}
              route={`/categories/${params.slug}`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
