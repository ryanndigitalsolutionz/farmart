const healthStatusConfig = {
  excellent: { label: 'Excellent', color: 'green' },
  good: { label: 'Good', color: 'blue' },
  fair: { label: 'Fair', color: 'yellow' },
  poor: { label: 'Poor', color: 'red' },
}

const vaccinationStatusConfig = {
  fully_vaccinated: { label: 'Fully Vaccinated', color: 'green' },
  partially_vaccinated: { label: 'Partially Vaccinated', color: 'yellow' },
  not_vaccinated: { label: 'Not Vaccinated', color: 'red' },
}

const LivestockHealth = ({ healthStatus, vaccinationStatus, showDetails = false }) => {
  const health = healthStatusConfig[healthStatus] || healthStatusConfig.good
  const vaccination = vaccinationStatusConfig[vaccinationStatus] || vaccinationStatusConfig.partially_vaccinated

  if (!showDetails) {
    return (
      <div className="livestock-health livestock-health-compact">
        <span className={`livestock-health-badge livestock-health-badge-${health.color}`}>
          {health.label}
        </span>
      </div>
    )
  }

  return (
    <div className="livestock-health livestock-health-detailed">
      <div className="livestock-health-item">
        <span className="livestock-health-label">Health Status</span>
        <span className={`livestock-health-badge livestock-health-badge-${health.color}`}>
          {health.label}
        </span>
      </div>
      <div className="livestock-health-item">
        <span className="livestock-health-label">Vaccination</span>
        <span className={`livestock-health-badge livestock-health-badge-${vaccination.color}`}>
          {vaccination.label}
        </span>
      </div>
    </div>
  )
}

export default LivestockHealth
