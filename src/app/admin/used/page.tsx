import { deleteUsedProduct, getUsedProducts } from "@/app/used/actions";
import DeleteDialog from "@/components/DeleteDialog/DeleteDialog";
import PaginationContainer from "@/components/Pagination/PaginationContainer";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { USED_PRODUCTS_ADMIN_PER_PAGE } from "@/lib/constants";
import { cn, formatId, formatPrice } from "@/lib/utils";
import Link from "next/link";

const UsedProductsAdminPage = async ({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) => {
  const page = Number(searchParams.page) || 1;
  const { products, count } = await getUsedProducts(page);

  const totalPages = Math.ceil(count / USED_PRODUCTS_ADMIN_PER_PAGE);
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl uppercase">Добави продукт втора употреба</h1>
        <Link
          href={"/admin/used/create"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Добави продукт
        </Link>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ИД</TableHead>
              <TableHead>ИМЕ</TableHead>
              <TableHead>ЦЕНА</TableHead>
              <TableHead>ПРОИЗВОДИТЕЛ</TableHead>
              <TableHead>КАТЕГОРИЯ</TableHead>
              <TableHead>ПОДКАТЕГОРИЯ</TableHead>
              <TableHead>НА ФОКУС</TableHead>
              <TableHead className="w-[100px]">ДЕЙСТВИЯ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {formatPrice(Number(product.price_with_vat), {
                    currency: "BGN",
                    IntlFormat: "bg-BG",
                  })}
                </TableCell>
                <TableCell>{product.manufacturer}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.subcategory}</TableCell>
                <TableCell>{product.on_focus ? "Да" : "Не"}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/used/${product.id}`}>Редактирай</Link>
                  </Button>
                  <DeleteDialog id={product.id} action={deleteUsedProduct} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages! > 1 && (
          <PaginationContainer currentPage={page} totalPages={totalPages!} />
        )}
      </div>
    </div>
  );
};

export default UsedProductsAdminPage;
