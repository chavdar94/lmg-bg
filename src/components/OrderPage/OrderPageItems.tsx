import { CartProduct } from "@/definitions/types";
import OrderItem from "./OrderItem";

function OrderPageItems({ items }: { items: CartProduct[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
      {items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
export default OrderPageItems;
