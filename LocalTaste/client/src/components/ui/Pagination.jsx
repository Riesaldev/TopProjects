


export default function FilterByProducer () {
  return (
    <>
      {/* Pagination */}
      <div className="flex justify-center mt-12 mb-22 gap-2">
        <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors disabled:opacity-50">
          <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
        </button>
        <button className="h-10 w-10 flex items-center justify-center rounded-xl font-bold">1</button>
        <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors">2</button>
        <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors">3</button>
        <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors">...</button>
        <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
        </button>
      </div>
    </>
  );
}