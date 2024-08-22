import ServiceUpdateForm from "../../_components/ServiceUpdateForm";
import { getServiceCategories } from "../../actions";

type Props = {
  params: {
    id: string;
  };
};
const ServiceUpdate = async ({ params }: Props) => {
  const categories = await getServiceCategories();

  return <ServiceUpdateForm categories={categories} id={params.id} />;
};
export default ServiceUpdate;
