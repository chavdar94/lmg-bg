import { Product } from "@/definitions/types";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

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

  const isValidProperty = (
    property: any
  ): property is { name: string; value: string } => {
    return (
      typeof property === "object" &&
      property !== null &&
      typeof property.name === "string" &&
      typeof property.value === "string"
    );
  };

  let properties: Array<{ name: string; value: string }> = [];
  if (typeof product.properties === "string") {
    try {
      const parsed = JSON.parse(product.properties);
      if (Array.isArray(parsed) && parsed.every(isValidProperty)) {
        properties = parsed;
      }
    } catch (error) {
      console.error("Failed to parse properties:", error);
    }
  } else if (
    Array.isArray(product.properties) &&
    product.properties.every(isValidProperty)
  ) {
    properties = product.properties;
  }

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      {properties.map((property, index) => (
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
