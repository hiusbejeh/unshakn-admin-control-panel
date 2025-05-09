
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import {
  LayoutDashboard,
  Box,
  Upload,
  Heart,
  PackageOpen,
  Ruler,
  Palette,
  BarChart2,
  Star,
  LogOut,
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  active: boolean;
}

const SidebarLink = ({ href, icon: Icon, children, active }: SidebarLinkProps) => {
  return (
    <Link to={href} className="relative block">
      <motion.div 
        className={cn(
          "flex items-center gap-3 px-4 py-3 my-1 rounded-md transition-colors",
          active 
            ? "bg-sidebar-accent text-unshakn-gold" 
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-unshakn-gold"
        )}
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon size={20} />
        <span className="font-medium">{children}</span>
        {active && (
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-1 bg-unshakn-gold rounded-r-full"
            layoutId="activeTab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const sidebarItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, text: "Dashboard" },
    { href: "/admin/products", icon: Box, text: "Products" },
    { href: "/admin/upload-product", icon: Upload, text: "Upload Product" },
    { href: "/admin/wishlist", icon: Heart, text: "Wishlist Viewer" },
    { href: "/admin/inventory", icon: PackageOpen, text: "Inventory" },
    { href: "/admin/size-estimator", icon: Ruler, text: "Size Estimator" },
    { href: "/admin/theme", icon: Palette, text: "Theme Customizer" },
    { href: "/admin/stats", icon: BarChart2, text: "Stats Overview" },
    { href: "/admin/ratings", icon: Star, text: "Ratings & Reviews" },
  ];

  return (
    <div className="w-64 min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8 mt-2">
          <div className="h-10 w-10 rounded-md bg-unshakn-gold flex items-center justify-center">
            <span className="text-black font-bold text-xl">U</span>
          </div>
          <div>
            <h2 className="font-bold text-xl text-unshakn-gold">UNSHAKN</h2>
            <p className="text-xs text-sidebar-foreground/70">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="px-2 flex-1">
        {sidebarItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            active={location.pathname === item.href}
          >
            {item.text}
          </SidebarLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <motion.button
          className="flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground w-full px-4 py-2"
          onClick={logout}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  );
};

export default AdminSidebar;
