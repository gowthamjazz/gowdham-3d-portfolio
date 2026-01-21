import { create } from 'zustand';

export const useStore = create((set) => ({
  // 1. GAME STATE
  // 'playing' = walking around | 'reading' = looking at a modal
  mode: 'playing', 
  activeProject: null,

  // Actions to change state
  openProject: (project) => set({ mode: 'reading', activeProject: project }),
  closeProject: () => set({ mode: 'playing', activeProject: null }),

  // 2. YOUR CV DATA (Extracted from your file)
  projects: [
    {
      id: 1,
      title: "Online Medical Pharmacy",
      desc: "Android app for seamless medical transactions.",
      tech: "Android, Java, XML",
      pos: [5, 0, -5], // Location in 3D space
      color: "#ef4444"
    },
    {
      id: 2,
      title: "Smart Trash Management",
      desc: "IoT solution reducing waste collection time by 40%.",
      tech: "IoT, Python, Embedded C",
      pos: [-5, 0, -5],
      color: "#22c55e"
    },
    {
      id: 3,
      title: "Aqua Drone",
      desc: "Autonomous drone for water monitoring (20% data accuracy boost).",
      tech: "Robotics, Python, C++",
      pos: [0, 0, -8],
      color: "#3b82f6"
    },
    {
      id: 4,
      title: "Full Stack Developer",
      desc: "Experience at Palle Technology. Boosted system performance by 15%.",
      tech: "Python, Django, React",
      pos: [8, 0, 0], // Put experience on the side
      color: "#a855f7"
    }
  ]
}));
