
import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockProducts } from "@/data/mockProducts";
import { Card } from "@/components/ui/card";
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
  Star,
  ThumbsUp,
  ThumbsDown,
  PinIcon,
  Trash2,
  Search,
} from "lucide-react";
import { Product, Rating } from "@/types";

const ProductRatingsSummary = ({ product }: { product: Product }) => {
  const averageRating =
    product.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
    product.ratings.length;
  
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    stars: rating,
    count: product.ratings.filter((r) => r.rating === rating).length,
    percentage:
      (product.ratings.filter((r) => r.rating === rating).length /
        product.ratings.length) *
      100,
  }));

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? "text-unshakn-gold fill-unshakn-gold" : "text-muted"}
        />
      ));
  };

  return (
    <Card className="p-5 border">
      <div className="flex items-start">
        <div className="w-16 h-16 rounded overflow-hidden mr-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground capitalize">
            {product.category}
          </p>
          <div className="flex items-center mt-1 gap-2">
            <div className="flex">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-sm font-medium">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({product.ratings.length} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {ratingCounts.map((rating) => (
          <div key={rating.stars} className="flex items-center gap-3 my-1">
            <div className="flex w-20">
              {renderStars(rating.stars)}
            </div>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-unshakn-gold"
                style={{ width: `${rating.percentage}%` }}
              ></div>
            </div>
            <div className="w-16 text-xs text-right text-muted-foreground">
              {rating.count} ({rating.percentage.toFixed(0)}%)
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const AdminRatingsReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Get all products with ratings
  const productsWithRatings = mockProducts.filter(
    (product) => product.ratings && product.ratings.length > 0
  );
  
  // Filter products by search term
  const filteredProducts = productsWithRatings.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.ratings.some((rating) =>
        rating.comment.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Function to toggle pinned status of a review
  const togglePinned = (productId: string, ratingId: string) => {
    // In a real app, this would update the database
    console.log(`Toggle pinned for product ${productId}, rating ${ratingId}`);
  };

  // Function to delete a review
  const deleteReview = (productId: string, ratingId: string) => {
    // In a real app, this would delete from the database
    console.log(`Delete review for product ${productId}, rating ${ratingId}`);
  };

  return (
    <AdminLayout
      title="Ratings & Reviews"
      subtitle="Manage customer reviews and ratings"
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="space-y-4">
            <ProductRatingsSummary product={product} />
            
            <div className="space-y-4">
              {product.ratings
                .filter((rating) => 
                  selectedRating === "all" || rating.rating === parseInt(selectedRating)
                )
                .sort((a, b) => {
                  if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
                  if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
                  if (sortBy === "highest") return b.rating - a.rating;
                  if (sortBy === "lowest") return a.rating - b.rating;
                  return 0;
                })
                .map((rating) => (
                  <motion.div
                    key={rating.id}
                    className={`p-4 rounded-lg border ${
                      rating.pinned ? "border-unshakn-gold/40 bg-unshakn-gold/5" : ""
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < rating.rating ? "text-unshakn-gold fill-unshakn-gold" : "text-muted"}
                                />
                              ))}
                          </div>
                          <span className="font-medium text-sm">
                            {rating.user}
                          </span>
                          {rating.pinned && (
                            <span className="bg-unshakn-gold/20 text-unshakn-gold text-xs px-2 py-0.5 rounded-full flex items-center">
                              <PinIcon size={10} className="mr-1" /> Pinned
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-2">{rating.comment}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(rating.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePinned(product.id, rating.id)}
                          className={rating.pinned ? "text-unshakn-gold" : ""}
                        >
                          <PinIcon size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteReview(product.id, rating.id)}
                          className="text-destructive"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-3">
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        <ThumbsUp size={12} className="mr-1" /> Helpful
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        <ThumbsDown size={12} className="mr-1" /> Not Helpful
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
        
        {filteredProducts.length === 0 && (
          <Card className="p-10 text-center">
            <p className="text-muted-foreground">No reviews found.</p>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminRatingsReviews;
