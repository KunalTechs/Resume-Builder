import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import React, { useMemo } from "react";

const MinimalImageTemplate = ({ data, accentColor, removeBackground }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 2) return dateStr;
    const [year, month] = parts;
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  console.log("DEBUG - removeBackground value:", removeBackground);
  // ✅ Handles image processing and forces browser refresh to show removed background
  const imageSrc = useMemo(() => {
    const img = data?.personal_info?.image;
    if (!img) return null;

    const cleanHex = accentColor?.replace("#", "") || "3B82F6";
    const timestamp = Date.now();

    let transformations = "tr=fo-face,w-300,h-300,f-png";

    if (removeBackground) {
      // This tells ImageKit to remove BG and inject the hex color
      transformations += `:e-bgremove:bg-${cleanHex}`;
    }

    return `${img}?${transformations}&v=${timestamp}`;
  }, [data?.personal_info?.image, removeBackground, accentColor]);

  return (
 <div
  className="bg-white text-zinc-800 shadow-lg mx-auto w-full print:w-[794px]"
  style={{ minHeight: "1123px" }}
>
    {/* Header - stack vertically on mobile */}
    <div className="flex flex-col sm:flex-row border-b border-zinc-100">
      {/* Image */}
      <div className="py-8 flex justify-center items-center sm:w-1/3">
        {imageSrc && (
          <div
            className="w-28 h-28 rounded-full overflow-hidden border-4 shadow-sm"
            style={{ borderColor: accentColor }}
          >
            <img src={imageSrc} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Name + Title */}
      <div className="flex flex-col justify-center py-4 sm:py-8 px-8 sm:w-2/3 text-center sm:text-left">
        <h1 className="text-4xl font-bold text-zinc-700 tracking-widest uppercase">
          {data.personal_info?.fullname || "Your Name"}
        </h1>
        <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest mt-2">
          {data?.personal_info?.profession}
        </p>
      </div>
    </div>

    {/* Body - stack vertically on mobile */}
    <div className="flex flex-col sm:flex-row">
      {/* Left Sidebar */}
      <aside className="sm:w-1/3 border-b sm:border-b-0 sm:border-r border-zinc-200 p-6">
        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 mb-4 uppercase">
            Contact
          </h2>
          <div className="space-y-3 text-sm">
            {[
              { icon: Phone, value: data.personal_info?.phone },
              { icon: Mail, value: data.personal_info?.email },
              { icon: MapPin, value: data.personal_info?.location },
              { icon: Linkedin, value: data.personal_info?.linkedin },
              { icon: Github, value: data.personal_info?.github },
              { icon: Globe, value: data.personal_info?.website },
            ].map(
              (item, i) =>
                item.value && (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} style={{ color: accentColor }} />
                    <span className="truncate">{item.value}</span>
                  </div>
                ),
            )}
          </div>
        </section>

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 mb-4 uppercase">
              Education
            </h2>
            <div className="space-y-4 text-sm">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-semibold uppercase text-zinc-700">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-zinc-500 italic">{edu.institution}</p>
                  <p className="text-[10px] text-zinc-400 font-medium mt-1">
                    <span>{formatDate(edu.end_date)}</span>
                    {edu.gpa && <span> GPA: {edu.gpa}</span>}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && data.skills[0] !== "" && (
          <section>
            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 mb-4 uppercase">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-zinc-100 px-2 py-1 rounded text-zinc-600">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Right Content */}
      <main className="sm:w-2/3 p-8">
        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-10">
            <h2
              className="text-xs font-bold tracking-[0.2em] mb-4 uppercase"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed text-justify">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-xs font-bold tracking-[0.2em] mb-6 uppercase"
              style={{ color: accentColor }}
            >
              Experience
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-4 border-l-2"
                  style={{ borderColor: accentColor + "20" }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-zinc-800">{exp.position}</h3>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      {formatDate(exp.start_date)} —{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-2" style={{ color: accentColor }}>
                    {exp.company}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold tracking-[0.2em] mb-6 uppercase"
              style={{ color: accentColor }}
            >
              Key Projects
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {data.project.map((proj, index) => (
                <div key={index}>
                  <h3 className="font-bold text-zinc-800">{proj.name}</h3>
                  {proj.link && (
                    <div
                      className="flex items-center gap-1 text-sm font-medium mb-2"
                      style={{ color: accentColor }}
                    >
                      <Globe size={14} />
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">
                        View Project
                      </a>
                    </div>
                  )}
                  <p className="text-sm text-zinc-500 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>

    {/* Closing line */}
    <div className="border-t border-zinc-200 mx-6 py-3 flex justify-center">
      <p className="text-[10px] text-zinc-300 tracking-widest uppercase">
        {data.personal_info?.fullname || "Resume"} · {data.personal_info?.profession || ""}
      </p>
    </div>
  </div>
);
};

export default MinimalImageTemplate;