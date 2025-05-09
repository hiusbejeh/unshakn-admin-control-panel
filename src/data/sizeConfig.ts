
import { SizeRule } from "@/types";

// Size estimation rules
export const sizeRules: SizeRule[] = [
  // XS Sizes
  { minHeight: 150, maxHeight: 165, minWeight: 45, maxWeight: 55, recommendedSize: "XS", bodyType: "Slim" },
  { minHeight: 150, maxHeight: 170, minWeight: 50, maxWeight: 60, recommendedSize: "XS", bodyType: "Athletic" },
  
  // S Sizes
  { minHeight: 160, maxHeight: 175, minWeight: 55, maxWeight: 65, recommendedSize: "S", bodyType: "Slim" },
  { minHeight: 160, maxHeight: 175, minWeight: 60, maxWeight: 70, recommendedSize: "S", bodyType: "Athletic" },
  
  // M Sizes
  { minHeight: 170, maxHeight: 180, minWeight: 65, maxWeight: 75, recommendedSize: "M", bodyType: "Slim" },
  { minHeight: 170, maxHeight: 180, minWeight: 70, maxWeight: 80, recommendedSize: "M", bodyType: "Athletic" },
  { minHeight: 165, maxHeight: 175, minWeight: 75, maxWeight: 85, recommendedSize: "M", bodyType: "Bulky" },
  
  // L Sizes
  { minHeight: 175, maxHeight: 185, minWeight: 75, maxWeight: 85, recommendedSize: "L", bodyType: "Slim" },
  { minHeight: 175, maxHeight: 185, minWeight: 80, maxWeight: 90, recommendedSize: "L", bodyType: "Athletic" },
  { minHeight: 170, maxHeight: 180, minWeight: 85, maxWeight: 95, recommendedSize: "L", bodyType: "Bulky" },
  
  // XL Sizes
  { minHeight: 180, maxHeight: 190, minWeight: 85, maxWeight: 95, recommendedSize: "XL", bodyType: "Slim" },
  { minHeight: 180, maxHeight: 190, minWeight: 90, maxWeight: 100, recommendedSize: "XL", bodyType: "Athletic" },
  { minHeight: 175, maxHeight: 185, minWeight: 95, maxWeight: 105, recommendedSize: "XL", bodyType: "Bulky" },
  
  // XXL Sizes
  { minHeight: 185, maxHeight: 200, minWeight: 95, maxWeight: 115, recommendedSize: "XXL", bodyType: "Slim" },
  { minHeight: 185, maxHeight: 200, minWeight: 100, maxWeight: 120, recommendedSize: "XXL", bodyType: "Athletic" },
  { minHeight: 180, maxHeight: 195, minWeight: 105, maxWeight: 130, recommendedSize: "XXL", bodyType: "Bulky" }
];

// Fit tips based on body type
export const fitTips = {
  Slim: "Our athletic fit provides a sleek silhouette that follows your body line without being too tight.",
  Athletic: "This size offers optimal mobility and performance for your athletic build.",
  Bulky: "This size provides enough room while maintaining a stylish profile for your build."
};
