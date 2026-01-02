import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { v4 as uuid } from "uuid";
import api from "../services/api";

export default function PartsInput() {
  const { project, setProject } = useProject();
  const navigate = useNavigate();

  const addPart = () => {
    setProject({
      ...project,
      parts: [
        ...project.parts,
        {
          id: uuid(),
          name: "",
          length: 0,
          breadth: 0,
          qty: 1,
          unit: "inch",
          rotatable: true,
        },
      ],
    });
  };

  const updatePart = (id, field, value) => {
    setProject({
      ...project,
      parts: project.parts.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const removePart = (id) => {
    setProject({
      ...project,
      parts: project.parts.filter((p) => p.id !== id),
    });
  };

  const calculate = async () => {
    const res = await api.post("/api/calculate", project);
    setProject({ ...project, results: res.data });
    navigate("/results");
  };

  return (
    <div className="min-h-screen pb-24 px-4">
      <header className="sticky top-0 bg-background-light dark:bg-background-dark py-3 font-bold">
        Parts Input
      </header>

      {project.parts.map((p, i) => (
        <div key={p.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 mb-4 border">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Part {i + 1}</span>
            <button onClick={() => removePart(p.id)}>🗑</button>
          </div>

          <input
            placeholder="Part Name"
            className="w-full mb-2 px-3 py-2 rounded border"
            value={p.name}
            onChange={(e) => updatePart(p.id, "name", e.target.value)}
          />

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Length"
              className="flex-1 px-3 py-2 rounded border"
              value={p.length}
              onChange={(e) => updatePart(p.id, "length", +e.target.value)}
            />
            <input
              type="number"
              placeholder="Breadth"
              className="flex-1 px-3 py-2 rounded border"
              value={p.breadth}
              onChange={(e) => updatePart(p.id, "breadth", +e.target.value)}
            />
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="Qty"
              className="w-20 px-3 py-2 rounded border"
              value={p.qty}
              onChange={(e) => updatePart(p.id, "qty", +e.target.value)}
            />
            <button
              onClick={() =>
                updatePart(p.id, "rotatable", !p.rotatable)
              }
              className={`flex-1 rounded ${
                p.rotatable ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              Rotatable
            </button>
          </div>
        </div>
      ))}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t">
        <button
          onClick={addPart}
          className="w-full mb-2 bg-gray-200 py-3 rounded-xl font-bold"
        >
          + Add Part
        </button>
        <button
          onClick={calculate}
          className="w-full bg-primary text-white py-3 rounded-xl font-bold"
        >
          Calculate →
        </button>
      </div>
    </div>
  );
}
