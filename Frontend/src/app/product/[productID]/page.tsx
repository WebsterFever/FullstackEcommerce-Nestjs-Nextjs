import { getProductByID } from "@/services/productService";
import ProductDetailView from "@/ui/ProductDetailView";


const DetailPage = async ({ params,}: {params: Promise<{ productID: string }>;}) => {
  const { productID } = await params;
  const productDetail = await getProductByID(productID)
  return (
    <div>
    <ProductDetailView {...productDetail}/>
    </div>
  );
};

export default DetailPage;