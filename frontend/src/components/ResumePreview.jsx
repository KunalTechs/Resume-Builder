import React, { useState, useEffect } from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

const ResumePreview = ({
  data,
  template,
  accentColor,
  removeBackground,
  classes = "",
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (removeBackground && data?.personal_info?.image) {
      setIsProcessing(true);
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

      {/* ✅ SCREEN VIEW - responsive, natural flow, no fixed width */}
      <div className="print:hidden border border-gray-200 bg-white">
        {renderTemplate()}
      </div>

      {/* ✅ PRINT VIEW - fixed 794px, hidden on screen, only shows during print/download */}
      <div className="hidden print:block" id="print-area">
        <div id="resume-preview" style={{ width: "794px", minHeight: "1123px" }}>
          {renderTemplate()}
        </div>
      </div>

      <style jsx="true">{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          body > *:not(#root) {
            display: none !important;
          }

          #root > *:not(:has(#print-area)) {
            display: none !important;
          }

          #print-area {
            display: block !important;
            position: fixed !important;
            inset: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          #resume-preview {
            box-shadow: none !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
