
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

// This would be replaced with actual cart functionality in a real implementation
const useCartItems = () => {
  const [items, setItems] = useState<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }[]>([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem("unshakn-cart");
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse cart items:", e);
      }
    }
  }, []);

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem("unshakn-cart", JSON.stringify(newItems));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const newItems = items.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setItems(newItems);
    localStorage.setItem("unshakn-cart", JSON.stringify(newItems));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("unshakn-cart");
    toast.success("Cart cleared");
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    calculateTotal,
  };
};

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, calculateTotal } = useCartItems();
  
  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <ShoppingBag size={64} className="text-muted-foreground" />
            </div>
            <p className="text-xl mb-6">
              Your cart is currently empty.
            </p>
            <Button asChild className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4 hidden md:grid md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 font-medium">Product</div>
                  <div className="md:col-span-2 font-medium text-center">Price</div>
                  <div className="md:col-span-2 font-medium text-center">Quantity</div>
                  <div className="md:col-span-2 font-medium text-right">Total</div>
                </div>
                
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    className="p-4 border-t first:border-t-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="md:col-span-6 flex items-center space-x-4">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm text-muted-foreground">Size: {item.size}</div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 text-sm flex items-center mt-1 hover:text-red-700"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">Price</div>
                      ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">Quantity</div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-l hover:bg-muted"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-10 text-center border-y h-8 flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-r hover:bg-muted"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 text-right">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">Total</div>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  asChild
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Including VAT
                  </div>
                </div>
                
                <Button className="w-full bg-unshakn-gold hover:bg-unshakn-dark-gold text-black">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;
