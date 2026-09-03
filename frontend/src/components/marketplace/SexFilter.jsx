function SexFilter({ sex, setSex }) {
  return (
    <div className="flex items-center gap-2 border-2 rounded-2xl p-2 border-(--farm-green-border) w-40 ">
      <select
        value={sex}
        onChange={(e) => setSex(e.target.value)}
      >
        <option value="">All Sexes</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  )
}

export default SexFilter