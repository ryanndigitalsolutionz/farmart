function SearchBar({ search, setSearch }) {
  return (
    <div className="flex items-center gap-2 border border-[var(--farm-green)] 
    rounded-2xl px-3 py-2 w-150 outline-none">
        <input 
            type="text" 
            placeholder="Search livestock" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-0 bg-transparent text-center outline-none "
        />
    </div>
  );
}

export default SearchBar;
