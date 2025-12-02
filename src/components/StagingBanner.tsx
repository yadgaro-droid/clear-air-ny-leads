import { isStaging } from "@/config/environment";
import { AlertCircle } from "lucide-react";

/**
 * Staging Environment Banner
 * Displays prominent warning on staging site to prevent confusion
 */
export const StagingBanner = () => {
  if (!isStaging()) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-yellow-500 text-black shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 font-bold text-sm md:text-base">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>
            ⚠️ STAGING ENVIRONMENT - NOT LIVE SITE ⚠️
          </span>
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
        </div>
        <p className="text-center text-xs mt-1 opacity-90">
          This is a test environment. Changes here do not affect the live website.
        </p>
      </div>
    </div>
  );
};
