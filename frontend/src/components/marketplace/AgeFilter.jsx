function AgeFilter({age, setAge}) {
  return (
    <div>
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
