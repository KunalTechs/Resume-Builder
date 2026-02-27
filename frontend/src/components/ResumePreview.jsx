import React, { useState, useEffect } from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

// ... your existing imports

const ResumePreview = ({
  data,
  template,
  accentColor,
  removeBackground,
  classes = "",
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Trigger processing state when removeBackground is toggled on
  useEffect(() => {
    if (removeBackground && data?.personal_info?.image) {
      setIsProcessing(true);

      // Simulating a refresh period for the AI to process (usually 5–10 seconds)
      const timer = setTimeout(() => setIsProcessing(false), 8000);
      return () => clearTimeout(timer);
    } else {
      setIsProcessing(false);
    }
  }, [removeBackground, data?.personal_info?.image]);

  const syncedData = {
    ...data,
    image: data?.personal_info?.image || "",
  };

  const renderTemplate = () => {
    const props = { data: syncedData, accentColor, removeBackground };

    switch (template) {
      case "modern":
        return <ModernTemplate {...props} />;
      case "minimal":
        return <MinimalTemplate {...props} />;
      case "minimal-image":
        return <MinimalImageTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="w-full bg-gray-200 relative">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-red-200 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in zoom-in duration-300">
          <div className="size-2 bg-red-500 rounded-full animate-ping" />
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
            AI Background Removal in progress...
          </span>
        </div>
      )}

      <div
        id="resume-preview"
        className={
          "border border-gray-200 shadow-none print:border-none bg-white " +
          classes
        }
      >
        {renderTemplate()}
      </div>
<style jsx="true">{`
  @media print {
  html, body {
      height: 297mm !important;
      max-height: 297mm !important;
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    /* 1. Reset page to A4 and remove browser margins */
    @page {
      size: A4;
      margin: 0 !important;
    }

    /* 2. Hide everything by default but keep parents accessible */
    body * {
      visibility: hidden;
    }

    /* 3. Specifically 'turn on' the resume and its contents */
    #resume-preview,
    #resume-preview * {
      visibility: visible !important;
    }

    /* 4. Force the resume to the absolute top of the viewport */
    #resume-preview {
      display: block !important;
      position: fixed !important; /* Bypasses dashboard scroll position */
      top: 0 !important;
      left: 0 !important;
      width: 210mm !important;
      height: 297mm !important;
      background: white !important;
      z-index: 99999 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important; /* Blocks any second page */
    }

    /* 5. Force colors for red header and profile border */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`}</style>
    </div>
  );
};

export default ResumePreview;
