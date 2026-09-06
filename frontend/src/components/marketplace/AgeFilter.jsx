function AgeFilter({age, setAge}) {
  return (
    <div className="flex items-center gap-2 border-2 rounded-2xl p-2 border-(--farm-green-border) w-40 ">
        <input 
            type="number" 
            placeholder='Age'
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
        />
    </div>
  )
}

export default AgeFilter// commit 46
