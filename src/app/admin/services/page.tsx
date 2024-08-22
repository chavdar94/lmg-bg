import ServiceCreateForm from "./_components/ServiceCreateForm";
import { getServiceCategories } from "./actions";

const AdminServices = async () => {
  const categories = await getServiceCategories();

  return (
    <>
      <h1 className="text-2xl font-bold mb-5 uppercase">Добави нова услуга:</h1>
      <ServiceCreateForm categories={categories} />
    </>
  );
};
export default AdminServices;
