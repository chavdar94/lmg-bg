import db from "@/lib/client";
import categoriesJson from "@/lib/categories.json";
import Link from "next/link";
import CategoryCard from "@/components/ProductCard/CategoryCard";
import { cache } from "react";
import { getCategories } from "./actions";

// Define the type for categories
interface Category {
  name: string;
  img: string;
  slug: string;
}

// Define the type for the categories JSON object
const categoriesData: Record<string, Category> = categoriesJson;

async function CategoryPage() {
  const categories = await getCategories();

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 w-full">
      {categories.map((cat) => {
        if (cat.category && categoriesData[cat.category]) {
          return (
            <Link
              href={`/categories/${cat.slug}`}
              key={cat.category}
              className="text-center rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out w-full"
            >
              <CategoryCard
                name={categoriesData[cat.category].name}
                img={categoriesData[cat.category].img}
              />
            </Link>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default cache(CategoryPage);
