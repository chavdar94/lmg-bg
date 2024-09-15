import { FiltersContainer } from "@/components/FiltersContainer/FiltersContainer";
import PaginationContainer from "@/components/Pagination/PaginationContainer";
import ProductCard from "@/components/ProductCard/ProductCard";
import { OrderBy } from "@/definitions/types";
import { getAllProducts } from "@/lib/getProducts";
import Link from "next/link";
import { redirect } from "next/navigation";
import categoriesJson from "@/lib/categories.json";

type Category = {
  name: string;
  slug: string;
};

const categoriesData: Record<string, Category> = categoriesJson;

export default async function SearchPage({
  searchParams: { q = "all", page = "1", filter = "", slug },
}: {
  searchParams: {
    q: string;
    page: string;
    filter?: string;
    slug?: string;
  };
}) {
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
      default:
        return { product_status: "asc" };
    }
  })();

  const filterStatus = filter === "statusAsc" ? "Наличен" : undefined;

  const {
    data: products,
    productsCount,
    uniqueCategories,
  } = await getAllProducts({
    query: q,
    page: Number(page),
    limit: 12,
    orderBy,
    filterStatus,
    slug,
  });

  if (filter === "all") {
    redirect(`/search/?q=${q}&page=1`);
  }

  const pages = Math.ceil(productsCount / 12);

  if (filterStatus && Number(page) > pages) {
    redirect(`/search/?q=${q}&page=1&filter=${filter}`);
  }

  return (
    <div className="w-full">
      <FiltersContainer />
      <div className="flex-between flex-col md:flex-row my-4">
        <div className="flex gap-10 w-full">
          <aside className="min-w-max">
            <h2 className="text-2xl font-bold">Категории</h2>
            <ul>
              {Array.from(uniqueCategories).map((category) => {
                if (category && categoriesData[category]) {
                  const isActive = slug === categoriesData[category].slug;

                  return (
                    <Link
                      key={category}
                      href={`/search/?q=${q}&${page && `page=${page}`}&${
                        filter && `filter=${filter}`
                      }slug=${categoriesData[category].slug}`}
                    >
                      <li
                        className={`my-2 hover:bg-slate-100 text-lg ${
                          isActive ? "font-bold bg-slate-100" : ""
                        }`}
                      >
                        {categoriesData[category].name}
                        <hr />
                      </li>
                    </Link>
                  );
                }
              })}
            </ul>
          </aside>
          <div className="grid grid-cols-1 gap-4 sm:grtid-cols2 md:grid-cols-3 lg:grid-cols-4">
            {products!.length === 0 && <div>No product found</div>}
            {products!.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        {pages! > 1 && (
          <PaginationContainer currentPage={Number(page)} totalPages={pages} />
        )}
      </div>
    </div>
  );
}
