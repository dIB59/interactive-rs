"use client";

import ThreeScene from "@/components/ThreeScene";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen gap-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ThreeScene />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
