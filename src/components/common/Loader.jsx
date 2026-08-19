const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="loader">
      <div className="loader-spinner" />
      {text && <p className="loader-text">{text}</p>}
    </div>
  )
}

export default Loader
