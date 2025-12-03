import { Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-300">
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your Projects</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-black text-orange-700 rounded hover:bg-orange-200 border transition-colors disabled:opacity-50"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4 className=" text-white">Project #{index + 1}</h4>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid gap-3">
              <input
                value={project.name || ""}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                type="text"
                placeholder="Project name"
                className="px-3 py-2 text-white border border-gray-300  focus:ring focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-sm rounded-lg"
              />

              <input
                value={project.type || ""}
                onChange={(e) =>
                  updateProject(index, "type", e.target.value)
                }
                type="text"
                placeholder="Project Type"
                className="px-3 py-2 text-white border border-gray-300  focus:ring focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-sm rounded-lg"
              />

              <textarea
                rows={4}
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                placeholder="Describe your project"
                className="w-full p-3 mt-2 border text-sm text-white border-gray-300 rounded-lg  bg-black focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
