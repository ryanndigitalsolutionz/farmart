function SexFilter({ sex, setSex }) {
  return (
    <div>
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