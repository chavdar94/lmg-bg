import { getCategories } from "@/app/categories/actions";
import UsedProductForm from "@/components/UsedProduct/UsedProductForm";

const Admin = async () => {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 uppercase">
        Добави продукт втора употреба:
      </h1>
      <UsedProductForm categories={categories} />
    </div>
  );
};

export default Admin;
