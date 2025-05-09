
import { useState } from "react";
import { sizeRules, fitTips } from "@/data/sizeConfig";
import { SizeRecommendation, Size, BodyType } from "@/types";

export const useSizeEstimator = () => {
  const [height, setHeight] = useState<number | "">(""); // cm
  const [weight, setWeight] = useState<number | "">(""); // kg
  const [recommendation, setRecommendation] = useState<SizeRecommendation | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const calculateSize = () => {
    if (height === "" || weight === "") {
      return null;
    }

    // Find appropriate size rule
    const matchedRule = sizeRules.find(
      (rule) =>
        height >= rule.minHeight &&
        height <= rule.maxHeight &&
        weight >= rule.minWeight &&
        weight <= rule.maxWeight
    );

    if (!matchedRule) {
      // Default fallback for sizes outside the defined ranges
      const defaultSize: SizeRecommendation = {
        size: height > 185 || weight > 100 ? "XXL" : "L",
        bodyType: weight / ((height / 100) ** 2) > 25 ? "Bulky" : "Athletic",
        fitTip: "This is our best recommendation based on your measurements.",
      };
      return defaultSize;
    }

    return {
      size: matchedRule.recommendedSize,
      bodyType: matchedRule.bodyType,
      fitTip: fitTips[matchedRule.bodyType],
    };
  };

  const estimateSize = () => {
    if (height === "" || weight === "") {
      return;
    }

    // Animated calculation effect
    setIsAnimating(true);
    setTimeout(() => {
      const result = calculateSize();
      setRecommendation(result);
      setIsAnimating(false);
    }, 1000);
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setRecommendation(null);
  };

  return {
    height,
    setHeight,
    weight,
    setWeight,
    recommendation,
    isAnimating,
    estimateSize,
    resetForm,
  };
};

export default useSizeEstimator;
