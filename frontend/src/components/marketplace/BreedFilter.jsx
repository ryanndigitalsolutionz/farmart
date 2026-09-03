function BreedFilter({ breed, setBreed }) {
  return (
    <div className="flex items-center gap-2  ">
        <select 
          value={breed} 
          onChange={(e) => setBreed(e.target.value)}
          className="border-2 rounded-2xl p-2 border-(--farm-green-border) w-40"
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
export default BreedFilter// commit 47
