import { getCategories } from "@/app/categories/actions";
import UsedProductForm from "@/components/UsedProduct/UsedProductForm";

const CreateUsedProduct = async () => {
  const categories = await getCategories();

  return <UsedProductForm categories={categories} />;
};
export default CreateUsedProduct;
