import { FC } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { CartProduct } from "@/definitions/types";
import db from "@/lib/client";
import { PAGE_SIZE } from "@/lib/constants";
import PaginationContainer from "@/components/Pagination/PaginationContainer";
import { FiltersContainer } from "@/components/FiltersContainer/FiltersContainer";

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
  const page = Number(searchParams?.page) || 0;
  const filter = searchParams?.filter || "";

  const orderBy: OrderBy = (() => {
    switch (filter) {
      case "priceDesc":
        return { price: "desc" };
      case "priceAsc":
        return { price: "asc" };
      case "nameDesc":
        return { name: "desc" };
      case "nameAsc":
        return { name: "asc" };
      default:
        return { name: "asc" }; // Default ordering
    }
  })();

  const [products, productsCount] = await Promise.all([
    db.products.findMany({
      where: {
        slug: params.slug,
      },
      orderBy,
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.products.count({
      where: {
        category: {
          contains: params.slug,
          mode: "insensitive",
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(productsCount / PAGE_SIZE);

  return (
    <>
      {products.length === 0 ? (
        <div className="text-center mt-10 h-[468px]">
          <h1 className="text-4xl font-bold">Няма намерени продукти</h1>
        </div>
      ) : (
        <>
          <div>
            <FiltersContainer />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-auto mt-10">
            {products.map((product: CartProduct) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <div className="m-auto mt-10">
            <PaginationContainer
              totalPages={totalPages}
              currentPage={page}
              route={`/products/${params.slug}`}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Category;
