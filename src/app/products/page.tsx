import db from "@/lib/client";
import Image from "next/image";
import categoriesJson from "@/lib/categories.json";
import Link from "next/link";
import CategoryCard from "@/components/ProductCard/CategoryCard";

// Define the type for categories
interface Category {
  name: string;
  img: string;
}

// Define the type for the categories JSON object
const categoriesData: Record<string, Category> = categoriesJson;

async function CategoryPage() {
  const categories = await db.products.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
  });

  return (
    <div className="flex justify-center items-center flex-wrap gap-6 h-full mt-10">
      {categories.map((cat) => {
        if (cat.category && categoriesData[cat.category]) {
          return (
            <Link
              href={`/products/${cat.category.toLocaleLowerCase()}`}
              key={cat.category}
              className="text-center rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out"
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

export default CategoryPage;
