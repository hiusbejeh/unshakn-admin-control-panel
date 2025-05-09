
import React from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import StatCard from "@/components/admin/StatCard";
import { mockProducts } from "@/data/mockProducts";
import useStats from "@/hooks/useStats";
import {
  BarChart2,
  Package,
  ShoppingBag,
  Users,
  Heart,
  TrendingUp,
  Clock,
  Eye,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const AdminStats = () => {
  const stats = useStats();

  // Generate last 7 days for visitors data
  const generateDailyData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      name: day,
      visitors: Math.floor(Math.random() * 100) + 50,
      sales: Math.floor(Math.random() * 20) + 5,
    }));
  };

  // Generate category data for product distribution
  const generateCategoryData = () => {
    const categories = [...new Set(mockProducts.map((product) => product.category))];
    return categories.map((category) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      products: mockProducts.filter((product) => product.category === category).length,
    }));
  };

  const dailyData = generateDailyData();
  const categoryData = generateCategoryData();

  return (
    <AdminLayout
      title="Stats Overview"
      subtitle="Analytics and performance metrics"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={<Package size={20} className="text-unshakn-gold" />}
          color="gold"
        />
        <StatCard 
          title="Website Visitors" 
          value={stats.visitors} 
          icon={<Users size={20} className="text-blue-400" />} 
          description="Last 30 days"
          color="blue"
        />
        <StatCard 
          title="Wishlist Adds" 
          value={stats.totalWishlists} 
          icon={<Heart size={20} className="text-red-400" />}
          color="red"
        />
        <StatCard 
          title="Total Inventory" 
          value={stats.totalStock} 
          icon={<ShoppingBag size={20} className="text-green-400" />}
          color="green"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Daily Visitors</h3>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
            <TrendingUp size={20} className="text-unshakn-gold" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--background)", 
                    borderColor: "var(--border)" 
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#D4AF37"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Product Distribution</h3>
              <p className="text-sm text-muted-foreground">By category</p>
            </div>
            <BarChart2 size={20} className="text-unshakn-gold" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--background)", 
                    borderColor: "var(--border)" 
                  }}
                />
                <Legend />
                <Bar dataKey="products" fill="#D4AF37" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                <h3 className="text-2xl font-bold mt-1">$127.40</h3>
              </div>
              <div className="p-2 rounded-full bg-blue-500/10">
                <ShoppingBag size={18} className="text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-xs">
                <TrendingUp size={12} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <h3 className="text-2xl font-bold mt-1">3,427</h3>
              </div>
              <div className="p-2 rounded-full bg-purple-500/10">
                <Eye size={18} className="text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-xs">
                <TrendingUp size={12} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+5.2%</span>
                <span className="ml-1 text-muted-foreground">from last week</span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Sessions</p>
                <h3 className="text-2xl font-bold mt-1">1,893</h3>
              </div>
              <div className="p-2 rounded-full bg-orange-500/10">
                <Users size={18} className="text-orange-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-xs">
                <TrendingUp size={12} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+3.1%</span>
                <span className="ml-1 text-muted-foreground">from yesterday</span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Session</p>
                <h3 className="text-2xl font-bold mt-1">3:42</h3>
              </div>
              <div className="p-2 rounded-full bg-green-500/10">
                <Clock size={18} className="text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-xs">
                <TrendingUp size={12} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+0:18</span>
                <span className="ml-1 text-muted-foreground">from last week</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminStats;
