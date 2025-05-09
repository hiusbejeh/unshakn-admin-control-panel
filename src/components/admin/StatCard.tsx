
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  color?: "default" | "gold" | "blue" | "green" | "red";
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  color = "default",
  className,
}: StatCardProps) => {
  const colorVariants = {
    default: "border-border bg-card",
    gold: "border-unshakn-gold/30 bg-unshakn-gold/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    green: "border-green-500/30 bg-green-500/5",
    red: "border-red-500/30 bg-red-500/5",
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "p-5 h-full border",
          colorVariants[color],
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">
              {typeof value === "number" ? value.toLocaleString() : value}
            </h3>
            {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
          </div>
          <div className={cn("p-2 rounded-full", color === "gold" ? "bg-unshakn-gold/10" : "bg-muted/50")}>
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
