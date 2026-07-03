export default function FaseLoading() {
  return (
    <div className="absolute flex flex-col items-center justify-center min-h-screen w-full bg-white/90 gap-4 z-10">
      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium animate-pulse">Carregando ...</p>
    </div>
  );
}
