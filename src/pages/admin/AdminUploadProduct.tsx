
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import useProducts from "@/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Checkbox,
  CheckboxIndicator
} from "@radix-ui/react-checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Product, Size } from "@/types";
import { categories } from "@/data/mockProducts";
import { toast } from "sonner";

const DEFAULT_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1542291026-7eec264c27ff";

const AdminUploadProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, addProduct, updateProduct } = useProducts();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get("edit");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    video: "",
    sizes: [],
    stock: 0,
    tags: [],
    ratings: [],
    wishlisted: 0,
    slug: "",
  });

  const [imagePreview, setImagePreview] = useState<string>(DEFAULT_PRODUCT_IMAGE);
  const [tagInput, setTagInput] = useState<string>("");

  // Load product data if in edit mode
  useEffect(() => {
    if (editId) {
      const productToEdit = products.find((p) => p.id === editId);
      if (productToEdit) {
        setFormData(productToEdit);
        setImagePreview(productToEdit.image);
      }
    }
  }, [editId, products]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Auto-generate slug when name changes
    if (name === "name") {
      setFormData({
        ...formData,
        name: value,
        slug: generateSlug(value),
      });
    } else if (name === "price") {
      setFormData({
        ...formData,
        price: parseFloat(value) || 0,
      });
    } else if (name === "stock") {
      setFormData({
        ...formData,
        stock: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value;
    setFormData({ ...formData, image: imageUrl });
    setImagePreview(imageUrl || DEFAULT_PRODUCT_IMAGE);
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleSizeToggle = (size: Size) => {
    const currentSizes = formData.sizes || [];
    if (currentSizes.includes(size)) {
      setFormData({
        ...formData,
        sizes: currentSizes.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...currentSizes, size],
      });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !(formData.tags || []).includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((t) => t !== tag),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    if (!formData.name || !formData.category || !formData.image || formData.sizes?.length === 0) {
      toast.error("Please fill out all required fields");
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      if (editId) {
        updateProduct(formData as Product);
      } else {
        // Create new product with default values for missing fields
        const newProduct: Product = {
          id: Date.now().toString(),
          name: formData.name || "",
          price: formData.price || 0,
          description: formData.description || "",
          category: formData.category || "other",
          image: formData.image || DEFAULT_PRODUCT_IMAGE,
          video: formData.video,
          sizes: formData.sizes || [],
          stock: formData.stock || 0,
          tags: formData.tags || [],
          ratings: [],
          wishlisted: 0,
          slug: formData.slug || generateSlug(formData.name || "product"),
        };
        addProduct(newProduct);
      }
      setIsSubmitting(false);
      navigate("/admin/products");
    }, 800);
  };

  return (
    <AdminLayout
      title={editId ? "Edit Product" : "Upload New Product"}
      subtitle={editId ? "Update your product details" : "Create a new product listing"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 border">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock || ""}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category || ""}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image || ""}
                    onChange={handleImageChange}
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video">Video URL (optional)</Label>
                  <Input
                    id="video"
                    name="video"
                    value={formData.video || ""}
                    onChange={handleInputChange}
                    placeholder="Enter video URL or Instagram link"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Available Sizes</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {(["XS", "S", "M", "L", "XL", "XXL"] as Size[]).map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={formData.sizes?.includes(size)}
                          onCheckedChange={() => handleSizeToggle(size)}
                          className="h-4 w-4 border border-input rounded bg-background"
                        >
                          <CheckboxIndicator>
                            <CheckIcon className="h-3 w-3" />
                          </CheckboxIndicator>
                        </Checkbox>
                        <Label htmlFor={`size-${size}`} className="text-sm font-medium leading-none">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tags"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddTag}
                      variant="outline"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags?.map((tag) => (
                      <motion.span
                        key={tag}
                        className="bg-muted px-2 py-1 rounded-md text-xs flex items-center gap-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/products")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit" 
                    className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editId ? "Updating..." : "Uploading..."}
                      </div>
                    ) : (
                      editId ? "Update Product" : "Upload Product"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
        
        {/* Preview Panel */}
        <div>
          <Card className="p-6 border sticky top-20">
            <h3 className="text-lg font-bold mb-4">Product Preview</h3>
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold truncate">{formData.name || "Product Name"}</h3>
                <p className="text-sm text-muted-foreground truncate capitalize">
                  {formData.category || "Category"}
                </p>
                <p className="font-semibold mt-2">${formData.price?.toFixed(2) || "0.00"}</p>
                
                <div className="mt-2 flex gap-2">
                  {formData.sizes?.map((size) => (
                    <span key={size} className="inline-block px-2 py-1 text-xs rounded bg-muted">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUploadProduct;
