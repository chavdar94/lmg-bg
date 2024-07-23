import { Product } from "@/definitions/types";

async function ProductDetails({ params }: { params: { productId: string } }) {
  const id = params?.productId;

  const response = await fetch(
    `http://localhost:3000/api/products?productId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const product: Product = await response.json();
  const properties = JSON.parse(product.properties);

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      {properties.map((property: any, index: number) => (
        <div className="flex flex-row bg-red-200" key={index}>
          <p>
            <strong>{property.name}:</strong>
          </p>
          <p>{property.value}</p>
        </div>
      ))}
    </div>
  );
}
export default ProductDetails;
