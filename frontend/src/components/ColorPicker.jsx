import React, { useState } from "react";
import { Check, Palette } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Green", value: "#22C55E" },
    { name: "Orange", value: "#F97316" },
    { name: "Purple", value: "#A855F7" },
    { name: "Pink", value: "#EC4899" },
    { name: "Yellow", value: "#EAB308" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#6B7280" }, // Replaced White with Gray for visibility
  ];

  // ... rest of your component code remains the same
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-purple-500 rounded-md border border-gray-300 hover:bg-gray-100 transition-all"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-4 w-60 gap-3 absolute top-full left-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-md">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col items-center"
              onClick={() => {
                onChange?.(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-gray-400 transition-all"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="size-5 text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
