function BreedFilter({ breed, setBreed }) {
  return (
    <div className="w-full">
        <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none
         focus:border-green-700 focus:ring-2 focus:ring-green-100" 
         value={breed} 
         onChange={(e) => setBreed(e.target.value)}
         >
            <option value="">All Breeds</option>
            <option value="Boer">Boer</option>
            <option value="Freshian">Freshian</option>
            <option value="Dorper">Dorper</option>
            <option value="Kienyeji">Kienyeji</option>
            <option value="Landrace">Landrace</option>
        </select>
    </div>
  )
}
export default BreedFilter
