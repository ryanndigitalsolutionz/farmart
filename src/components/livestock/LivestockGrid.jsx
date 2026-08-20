import LivestockCard from "./LivestockCard"

function LivestockGrid({ livestock }) {
  return (
    <div>
        {livestock.map((animal) => (
            <LivestockCard key={animal.id} animal={animal}/>
        ))}
    </div>
  )
}

export default LivestockGrid
