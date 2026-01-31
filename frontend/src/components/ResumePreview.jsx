import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  console.log("🎨 TEMPLATE BEING USED:", template);

//  1. Prepare Synced Data (The fallback bridge)
  const syncedData = {
    ...data,
  };

  const renderTemplate = () => {
    // IMPORTANT: We pass 'syncedData' here, NOT 'data'
    switch (template) {
      case "modern":
        return <ModernTemplate data={syncedData} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={syncedData} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={syncedData} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={syncedData} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-200">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 shadow-none print:border-none " + classes
        }
      >
        {renderTemplate()}
      </div>

      <style jsx="true">
        {`
          @page { size: letter; margin: 0; }
          @media print {
            body * { visibility: hidden; }
            #resume-preview, #resume-preview * { visibility: visible; }
            #resume-preview {
              position: absolute; left: 0; top: 0;
              width: 100%; margin: 0; padding: 0;
              box-shadow: none !important; border: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;