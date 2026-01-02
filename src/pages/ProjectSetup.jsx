import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

export default function ProjectSetup() {
  const navigate = useNavigate();
  const { project, setProject } = useProject();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-2 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur">
        <button className="size-10 flex items-center justify-center text-slate-500">
          ←
        </button>
        <div className="text-center flex-1 pr-10">
          <h1 className="font-bold">New Project</h1>
          <p className="text-xs text-primary font-bold uppercase">
            Sheet Planner Pro by Akshat Acrylic
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 pt-6 pb-24">
        {/* Project Name */}
        <label className="block text-sm font-semibold mb-2">
          Project Name
        </label>
        <input
          className="w-full rounded-xl px-4 py-3 border dark:border-gray-700 bg-white dark:bg-surface-dark"
          placeholder="e.g. Kitchen Cabinetry"
          value={project.name}
          onChange={(e) =>
            setProject({ ...project, name: e.target.value })
          }
        />

        {/* Sheet Info */}
        <div className="mt-8 rounded-xl p-4 bg-white dark:bg-surface-dark border dark:border-gray-800">
          <h2 className="font-bold text-lg">Master Sheet Size</h2>
          <p className="text-sm text-slate-500 mt-1">
            Fixed Dimensions (Imperial)
          </p>

          <div className="mt-3 font-mono text-xl font-bold">
            {project.sheet.height}" x {project.sheet.width}"
          </div>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background-light dark:bg-background-dark">
        <button
          onClick={() => navigate("/parts")}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl"
        >
          Start Planning →
        </button>
      </div>
    </div>
  );
}
