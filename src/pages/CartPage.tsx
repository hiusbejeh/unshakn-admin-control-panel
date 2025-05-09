
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CartPage = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Your Shopping Cart</h1>
      <p className="text-xl mb-6">
        Your cart is currently empty.
      </p>
      <Button asChild className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black">
        <Link to="/products">Start Shopping</Link>
      </Button>
    </div>
  );
};

export default CartPage;
