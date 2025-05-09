
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Product Details</h1>
      <p className="text-xl mb-6">
        Viewing product with ID: {id}
      </p>
      <Button asChild className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black">
        <Link to="/products">Back to Products</Link>
      </Button>
    </div>
  );
};

export default ProductPage;
