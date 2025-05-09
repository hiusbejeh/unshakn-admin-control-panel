
import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockProducts } from "@/data/mockProducts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart } from "lucide-react";

const AdminWishlist = () => {
  const [sortBy, setSortBy] = useState<string>("wishlistedDesc");

  const sortedProducts = [...mockProducts].sort((a, b) => {
    switch (sortBy) {
      case "wishlistedDesc":
        return b.wishlisted - a.wishlisted;
      case "wishlistedAsc":
        return a.wishlisted - b.wishlisted;
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const getHeartSize = (wishlistCount: number) => {
    if (wishlistCount > 150) return 40;
    if (wishlistCount > 100) return 36;
    if (wishlistCount > 50) return 32;
    if (wishlistCount > 30) return 28;
    return 24;
  };

  return (
    <AdminLayout
      title="Wishlist Viewer"
      subtitle="Track which products are being wishlisted"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Wishlisted Products</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wishlistedDesc">Most Wishlisted</SelectItem>
              <SelectItem value="wishlistedAsc">Least Wishlisted</SelectItem>
              <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
              <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="rounded-lg overflow-hidden border bg-card shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="aspect-square relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded-full px-2 py-1 flex items-center">
                <Heart size={12} className="mr-1 text-unshakn-gold" />
                <span>{product.wishlisted}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {product.category}
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center"
                >
                  <Heart
                    size={getHeartSize(product.wishlisted)}
                    className="text-unshakn-gold opacity-80"
                  />
                </motion.div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="font-bold">${product.price.toFixed(2)}</p>
                <div className="text-sm text-muted-foreground">
                  {Math.round(product.wishlisted / 10)} users added last week
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminWishlist;
