
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { mockProducts, categories } from "@/data/mockProducts";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory 
    ? mockProducts.filter(product => product.category === selectedCategory)
    : mockProducts;

  // Handle adding to cart
  const handleAddToCart = (productId: string) => {
    // In a real implementation, this would add to cart state
    // Here we're just showing a toast notification
    toast.success("Added to cart successfully!");
  };

  // Handle adding to wishlist
  const handleAddToWishlist = (productId: string) => {
    toast("Added to wishlist");
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-unshakn-gold hover:bg-unshakn-dark-gold text-black" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                className={selectedCategory === category.slug ? "bg-unshakn-gold hover:bg-unshakn-dark-gold text-black" : ""}
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative border rounded-lg overflow-hidden hover:shadow-md transition-shadow card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Wishlist Button */}
                <button
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(product.id);
                  }}
                >
                  <Heart size={16} className="text-gray-700" />
                </button>
                
                {/* Quick Add to Cart */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    className="w-full flex items-center justify-center text-white text-sm gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div 
                className="p-4 cursor-pointer"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-2 capitalize">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex space-x-1">
                    {product.sizes.map(size => (
                      <span key={size} className="text-xs px-1.5 py-0.5 bg-muted rounded">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products found in this category.</p>
            <Button
              className="mt-4 bg-unshakn-gold hover:bg-unshakn-dark-gold text-black"
              onClick={() => setSelectedCategory(null)}
            >
              View All Products
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductsPage;
