"use client";

export default function BackgroundBlob() {
  return (
    <>
      <div className="mix-blend-screen absolute left-1/5 top-100 w-56 h-56 z-[-1]">
        <div className="absolute bottom-1 left-1/4 w-96 h-96 bg-indigo-600/70 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-fuchsia-900/50 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-pink-300/20 rounded-full blur-[120px]" />
      </div>
      <div className="mix-blend-screen absolute right-1/6 top-200 w-56 h-56 rotate-120 z-[-1]">
        <div className="absolute bottom-1 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-fuchsia-900/70 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-pink-300/20 rounded-full blur-[120px]" />
      </div>
    </>
  );
}
