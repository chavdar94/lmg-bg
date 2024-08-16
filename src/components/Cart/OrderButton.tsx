import { CartProduct } from "@/definitions/types";
import { buttonVariants } from "../ui/button";

function OrderButton({
  items,
  email,
  className,
}: {
  items: CartProduct[];
  email: string;
  className?: string;
}) {
  return <button className={buttonVariants({ className })}>Поръчаи</button>;
}
export default OrderButton;
