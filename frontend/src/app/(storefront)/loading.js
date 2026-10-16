export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6 bg-butter-50/20">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Bowl / Paw Loader */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-peach-200 border-t-peach-500 animate-spin" />
          <span className="text-xl animate-bounce">🥣</span>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-plum-900 tracking-wide">Cooking something fresh…</p>
          <p className="text-xs text-plum-900/50 mt-0.5">Preparing the freshest bowl for your pet</p>
        </div>
      </div>
    </div>
  );
}
