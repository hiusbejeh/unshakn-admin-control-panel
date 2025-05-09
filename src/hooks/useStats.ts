
import { useState, useEffect } from "react";
import { mockProducts } from "@/data/mockProducts";
import { Stats } from "@/types";

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalStock: 0,
    totalWishlists: 0,
    visitors: 0,
  });

  useEffect(() => {
    // Calculate stats from mock products
    const totalProducts = mockProducts.length;
    const totalStock = mockProducts.reduce((sum, product) => sum + product.stock, 0);
    const totalWishlists = mockProducts.reduce((sum, product) => sum + product.wishlisted, 0);
    
    // Generate a random number of visitors between 500-2000
    const visitors = Math.floor(Math.random() * 1500) + 500;

    setStats({
      totalProducts,
      totalStock,
      totalWishlists,
      visitors,
    });
  }, []);

  return stats;
};

export default useStats;
