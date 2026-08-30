function AgeFilter({age, setAge}) {
  return (
    <div className="w-full">
        <input 
            type="number" 
            placeholder='Age'
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none
             focus:border-green-700 focus:ring-2 focus:ring-green-100"
        />
    </div>
  )
}

export default AgeFilter
