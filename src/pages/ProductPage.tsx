
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, ChevronLeft, Star } from "lucide-react";
import { toast } from "sonner";
import { mockProducts } from "@/data/mockProducts";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  // Find the product by ID
  const product = mockProducts.find(p => p.id === id);
  
  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate("/products");
      toast.error("Product not found");
    }
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }
  
  // Get average rating - fixed to properly access rating property from each Rating object
  const averageRating = product.ratings.length > 0
    ? product.ratings.reduce((sum, ratingObj) => sum + ratingObj.rating, 0) / product.ratings.length
    : 0;
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    // In a real app, this would add to a cart state or context
    toast.success("Added to cart");
  };
  
  const handleAddToWishlist = () => {
    toast("Added to wishlist");
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="ghost" 
          asChild 
          className="mb-6"
        >
          <Link to="/products">
            <ChevronLeft size={16} className="mr-1" />
            Back to Products
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <motion.div 
            className="aspect-square overflow-hidden rounded-lg bg-muted"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= Math.round(averageRating)
                        ? "text-unshakn-gold fill-unshakn-gold"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                {product.ratings.length} reviews
              </span>
            </div>
            
            <div className="text-2xl font-bold mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">
                {product.description || "No description available for this product."}
              </p>
            </div>
            
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`w-12 h-12 ${
                      selectedSize === size 
                        ? "bg-unshakn-gold hover:bg-unshakn-dark-gold text-black" 
                        : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 bg-unshakn-gold hover:bg-unshakn-dark-gold text-black"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline"
                className="flex-1"
                onClick={handleAddToWishlist}
              >
                <Heart size={18} className="mr-2" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium capitalize">{product.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tags:</span>
                  <p className="font-medium">
                    {product.tags?.join(", ") || "No tags"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Stock:</span>
                  <p className={`font-medium ${product.stock === 0 ? "text-red-500" : ""}`}>
                    {product.stock === 0 ? "Out of stock" : `${product.stock} units available`}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;
