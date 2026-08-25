
function AgeFilter({age, setAge}) {
  return (
    <div>
        <input 
            type="number" 
            placeholder='Age'
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className='border block rounded-2xl px-4 py-1 w-30 text-center'
        />
    </div>
  )
}

export default AgeFilter