"use client";

import dynamic from 'next/dynamic';

// Dynamic import prevents server-side rendering issues with 3D
const CommandCenter = dynamic(() => import('@/components/CommandCenter'), { 
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black flex items-center justify-center text-cyan-500">INITIALIZING...</div>
});

export default function Home() {
  return (
    <main>
      <CommandCenter />
    </main>
  );
}