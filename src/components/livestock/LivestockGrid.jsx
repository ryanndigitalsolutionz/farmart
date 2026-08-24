import LivestockCard from "./LivestockCard"

function LivestockGrid({ livestock, onViewDetails }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {livestock.map((animal) => (
            <LivestockCard 
              key={animal.id} 
              animal={animal}
              onViewDetails={onViewDetails}
            />
        ))}
    </div>
  )
}

export default LivestockGrid
