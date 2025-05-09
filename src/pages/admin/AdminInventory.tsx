
import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import useProducts from "@/hooks/useProduct";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types";
import { PackageOpen, AlertTriangle } from "lucide-react";

const AdminInventory = () => {
  const { products, updateStock } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("stock_low");
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [productToRestock, setProductToRestock] = useState<Product | null>(null);
  const [newStockAmount, setNewStockAmount] = useState<number>(0);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "stock_low":
        return a.stock - b.stock;
      case "stock_high":
        return b.stock - a.stock;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleRestockClick = (product: Product) => {
    setProductToRestock(product);
    setNewStockAmount(product.stock);
    setIsRestockDialogOpen(true);
  };

  const confirmRestock = () => {
    if (productToRestock && newStockAmount !== null) {
      updateStock(productToRestock.id, newStockAmount);
      setIsRestockDialogOpen(false);
      setProductToRestock(null);
    }
  };

  const markAsSoldOut = (productId: string) => {
    updateStock(productId, 0);
  };

  return (
    <AdminLayout
      title="Inventory Manager"
      subtitle="Track and update your product stock"
    >
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <Input
          placeholder="Search products..."
          className="w-full md:w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stock_low">Stock (Low to High)</SelectItem>
            <SelectItem value="stock_high">Stock (High to Low)</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  {searchTerm ? "No products match your search" : "No products found"}
                </TableCell>
              </TableRow>
            ) : (
              sortedProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  className={`border-b ${
                    product.stock === 0
                      ? "bg-destructive/10"
                      : product.stock < 5
                      ? "bg-amber-500/10"
                      : ""
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {product.category}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {product.stock === 0 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
                          Out of stock
                        </span>
                      ) : product.stock < 5 ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-700">
                          <AlertTriangle size={14} />
                          <span className="font-medium">Low: {product.stock} left</span>
                        </span>
                      ) : (
                        <span>{product.stock} units</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestockClick(product)}
                      >
                        <PackageOpen size={14} className="mr-2" />
                        Restock
                      </Button>
                      {product.stock > 0 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => markAsSoldOut(product.id)}
                        >
                          Mark as Sold Out
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Update stock quantity for{" "}
              <span className="font-semibold">{productToRestock?.name}</span>
            </p>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="0"
                value={newStockAmount || ""}
                onChange={(e) =>
                  setNewStockAmount(parseInt(e.target.value) || 0)
                }
              />
              <span className="text-sm text-muted-foreground">units</span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRestockDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black"
              onClick={confirmRestock}
            >
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminInventory;
