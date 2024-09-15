import { getCategories } from "@/app/categories/actions";
import { getUsedProduct } from "@/app/used/actions";
import UsedProductUpdateForm from "@/components/UsedProduct/UsedProductUpdateForm";

const UpdateUsedProduct = async ({ params }: { params: { id: string } }) => {
  const [product, categories] = await Promise.all([
    getUsedProduct(params.id),
    getCategories(),
  ]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const galleryArray =
    typeof product.gallery_urls === "string"
      ? JSON.parse(product.gallery_urls) // Parse JSON string to array
      : Array.isArray(product.gallery_urls)
      ? product.gallery_urls.filter(
          (url): url is string => typeof url === "string"
        )
      : [];

  return (
    <UsedProductUpdateForm
      product={{ ...product, gallery_urls: galleryArray }}
      categories={categories}
    />
  );
};

export default UpdateUsedProduct;
