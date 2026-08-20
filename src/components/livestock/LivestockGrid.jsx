import LivestockCard from "./LivestockCard"

function LivestockGrid({ livestock, onViewDetails }) {
  return (
    <div>
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
