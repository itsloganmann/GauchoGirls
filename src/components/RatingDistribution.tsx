"use client";

import { Star } from "lucide-react";

interface RatingDistributionProps {
  distribution: number[]; // Array of counts [1-star, 2-star, 3-star, 4-star, 5-star]
}

export default function RatingDistribution({ distribution }: RatingDistributionProps) {
  const total = distribution.reduce((sum, count) => sum + count, 0);
  
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = distribution[stars - 1] || 0;
        const percentage = total > 0 ? (count / total) * 100 : 0;
        
        return (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 w-12">
              <span className="font-medium">{stars}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-12 text-right opacity-70">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
