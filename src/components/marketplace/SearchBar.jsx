
function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center mb-3">
        <input 
            type="text" 
            placeholder="Search livestock" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-2xl px-3 p-1 w-150 "
        />
    </div>
  );
}

export default SearchBar;