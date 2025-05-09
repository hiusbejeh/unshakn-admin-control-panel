
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/data/mockProducts";
import useStats from "@/hooks/useStats";
import {
  BarChart2,
  Box,
  Heart,
  PackageOpen,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = useStats();
  
  // Sort products by wishlisted count for the most wishlisted products
  const topWishlistedProducts = [...mockProducts]
    .sort((a, b) => b.wishlisted - a.wishlisted)
    .slice(0, 4);

  // Find low stock products (less than 5)
  const lowStockProducts = mockProducts.filter(product => 
    product.stock > 0 && product.stock < 5
  );
  
  return (
    <AdminLayout 
      title="Dashboard Overview" 
      subtitle="Welcome to the UNSHAKN admin dashboard"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={<Box size={20} className="text-unshakn-gold" />}
          color="gold"
        />
        <StatCard 
          title="Total Wishlist Adds" 
          value={stats.totalWishlists} 
          icon={<Heart size={20} className="text-red-400" />}
          color="red"
        />
        <StatCard 
          title="Total Inventory" 
          value={stats.totalStock} 
          icon={<PackageOpen size={20} className="text-blue-400" />}
          color="blue"
        />
        <StatCard 
          title="Site Visitors" 
          value={stats.visitors} 
          icon={<Users size={20} className="text-green-400" />} 
          description="Last 30 days"
          color="green"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="p-5 border">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button asChild className="w-full justify-between bg-unshakn-gold hover:bg-unshakn-dark-gold text-black">
              <Link to="/admin/upload-product">
                <span className="flex items-center">
                  <Plus size={16} className="mr-2" /> Add New Product
                </span>
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/admin/inventory">
                <span className="flex items-center">
                  <PackageOpen size={16} className="mr-2" /> Update Inventory
                </span>
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/admin/theme">
                <span className="flex items-center">
                  <BarChart2 size={16} className="mr-2" /> Customize Theme
                </span>
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/admin/stats">
                <span className="flex items-center">
                  <BarChart2 size={16} className="mr-2" /> View Full Analytics
                </span>
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </Card>
        
        {/* Most Wishlisted Products */}
        <Card className="p-5 border">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Heart size={18} className="mr-2 text-unshakn-gold" />
            Most Wishlisted Products
          </h3>
          <div className="space-y-3">
            {topWishlistedProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                className="flex items-center justify-between p-2 rounded-md bg-muted/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-background overflow-hidden mr-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Heart size={14} className="mr-1 text-red-400" />
                  <span className="text-sm font-semibold">{product.wishlisted}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4">
            <Button asChild variant="link" className="p-0 h-auto">
              <Link to="/admin/wishlist" className="flex items-center text-sm text-unshakn-gold">
                View all wishlisted products
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
        </Card>
        
        {/* Low Stock Alert */}
        <Card className="p-5 border">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <PackageOpen size={18} className="mr-2 text-unshakn-gold" />
            Low Stock Alert
          </h3>
          
          {lowStockProducts.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              No products are running low on stock
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  className="flex items-center justify-between p-2 rounded-md bg-muted/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-background overflow-hidden mr-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-amber-500">
                      Only {product.stock} left
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-4">
            <Button asChild variant="link" className="p-0 h-auto">
              <Link to="/admin/inventory" className="flex items-center text-sm text-unshakn-gold">
                Manage inventory
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
