
import { useState } from "react";
import { mockProducts } from "@/data/mockProducts";
import { Product } from "@/types";
import { toast } from "sonner";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now().toString() }]);
    toast.success("Product added successfully");
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast.success("Product updated successfully");
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    );
    toast.success("Stock updated successfully");
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
  };
};

export default useProducts;
