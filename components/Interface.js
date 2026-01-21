import { useStore } from "../stores/useStore";

export function Interface() {
  const { activeProject, closeProject, mode } = useStore();

  if (mode !== 'reading' || !activeProject) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm">
      <div className="bg-white text-black p-8 rounded-lg max-w-lg w-full shadow-2xl relative animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={closeProject}
          className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-2 text-blue-600">{activeProject.title}</h2>
        <div className="h-1 w-20 bg-blue-600 mb-6"></div>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {activeProject.desc}
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm font-semibold text-gray-500 uppercase">Tech Stack</p>
          <p className="text-md font-mono text-blue-800">{activeProject.tech}</p>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            View Code
          </button>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
            Live Demo
          </button>
        </div>

      </div>
    </div>
  );
}
