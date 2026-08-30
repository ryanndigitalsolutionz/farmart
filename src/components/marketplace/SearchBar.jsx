function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full">
        <input 
            type="text" 
            placeholder="Search livestock" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 
            text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
        />
    </div>
  );
}

export default SearchBar;
