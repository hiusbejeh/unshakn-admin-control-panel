
import React from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ruler, Loader2, Shirt } from "lucide-react";
import { Size, BodyType } from "@/types";
import useSizeEstimator from "@/hooks/useSizeEstimator";
import { sizeRules } from "@/data/sizeConfig";

const SizeResultCard = ({ size, bodyType, fitTip }: { size: Size, bodyType: BodyType, fitTip: string }) => {
  const sizeColorMap = {
    XS: "text-blue-500",
    S: "text-green-500",
    M: "text-yellow-500",
    L: "text-orange-500",
    XL: "text-red-500",
    XXL: "text-purple-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-lg border shadow-lg bg-card"
    >
      <div className="flex flex-col items-center">
        <Shirt size={60} className={`${sizeColorMap[size]} mb-4`} />
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <h3 className={`text-4xl font-bold ${sizeColorMap[size]}`}>{size}</h3>
        </motion.div>
        <p className="text-muted-foreground text-sm mt-2">
          Recommended Size
        </p>
        
        <div className="my-4 flex items-center">
          <span className="bg-muted px-3 py-1 rounded-full text-xs font-semibold">
            {bodyType} Build
          </span>
        </div>
        
        <p className="text-center text-sm border-t border-border pt-4 mt-2">
          {fitTip}
        </p>
      </div>
    </motion.div>
  );
};

const AdminSizeEstimator = () => {
  const {
    height,
    setHeight,
    weight,
    setWeight,
    recommendation,
    isAnimating,
    estimateSize,
    resetForm,
  } = useSizeEstimator();

  return (
    <AdminLayout
      title="Smart Size Estimator"
      subtitle="Recommend the perfect size based on customer measurements"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Size Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Input customer measurements to get a size recommendation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium mb-1">
                  Height (cm)
                </label>
                <Input
                  id="height"
                  type="number"
                  min="140"
                  max="220"
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium mb-1">
                  Weight (kg)
                </label>
                <Input
                  id="weight"
                  type="number"
                  min="40"
                  max="150"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button
                className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black"
                onClick={estimateSize}
                disabled={isAnimating || height === "" || weight === ""}
              >
                {isAnimating ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Ruler size={16} className="mr-2" />
                    Calculate Size
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={resetForm}
                disabled={isAnimating}
              >
                Reset
              </Button>
            </div>
          </Card>
          
          <Card className="mt-6 p-6">
            <h3 className="text-lg font-semibold mb-4">Size Chart Rules</h3>
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Height (cm)</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Weight (kg)</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Size</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Body Type</th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {sizeRules.map((rule, index) => (
                    <tr key={index} className="text-sm">
                      <td className="px-3 py-2">
                        {rule.minHeight} - {rule.maxHeight}
                      </td>
                      <td className="px-3 py-2">
                        {rule.minWeight} - {rule.maxWeight}
                      </td>
                      <td className="px-3 py-2 font-medium">
                        {rule.recommendedSize}
                      </td>
                      <td className="px-3 py-2">
                        {rule.bodyType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="p-6 border sticky top-20">
            <h3 className="text-lg font-semibold mb-4">Size Result</h3>
            
            {isAnimating ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 size={40} className="animate-spin text-unshakn-gold mb-4" />
                <p className="text-muted-foreground">Calculating best size...</p>
              </div>
            ) : recommendation ? (
              <SizeResultCard
                size={recommendation.size}
                bodyType={recommendation.bodyType}
                fitTip={recommendation.fitTip}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Ruler size={40} className="mb-4" />
                <p>Enter measurements to see size recommendation</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSizeEstimator;
