
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentDiscountPage = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Student Discount</h1>
      <p className="text-xl mb-6">
        Students get 15% off all products. Verify your student status to claim your discount.
      </p>
      <Button asChild className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black mr-4">
        <Link to="/products">Shop Now</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default StudentDiscountPage;
