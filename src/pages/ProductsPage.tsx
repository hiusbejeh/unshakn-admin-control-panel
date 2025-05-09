
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <p className="text-xl mb-6">
        Browse our collection of premium athletic wear.
      </p>
      <Button asChild className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black">
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default ProductsPage;
