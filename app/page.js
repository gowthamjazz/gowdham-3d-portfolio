"use client";

import dynamic from 'next/dynamic';

// Dynamic import to avoid server-side errors
const CommandCenter = dynamic(() => import('@/components/CommandCenter'), { 
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black text-cyan-500 flex items-center justify-center">LOADING SYSTEM...</div>
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* LAYER 1: The 3D World (Background) */}
      <div className="absolute inset-0 z-0">
        <CommandCenter />
      </div>

      {/* LAYER 2: The UI Overlay (Foreground) */}
      {/* 'pointer-events-none' lets you click THROUGH the text to drag the 3D scene */}
      <div className="absolute inset-0 z-10 pointer-events-none p-10 flex flex-col justify-between">
        
        {/* Top Left Header */}
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            GOWDHAM
          </h1>
          <p className="text-cyan-400 font-mono tracking-widest mt-2 text-sm md:text-base">
            SYSTEM ONLINE // FULL STACK DEV
          </p>
        </div>

        {/* Bottom Right Instructions */}
        <div className="text-right">
          <div className="inline-block bg-black/50 backdrop-blur-md border border-cyan-500/30 p-4 rounded-lg">
            <p className="text-gray-300 text-sm mb-1">INTERACTION MODE</p>
            <div className="flex items-center gap-3 text-white font-bold">
              <span>🖱️ DRAG TO ROTATE</span>
              <span className="text-cyan-500">|</span>
              <span>👆 SCROLL TO ZOOM</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}