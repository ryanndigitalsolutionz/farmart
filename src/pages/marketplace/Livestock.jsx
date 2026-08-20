import { useState } from "react";
import useLivestock from "../../hooks/useLivestock"
import LivestockGrid from '../../components/livestock/LivestockGrid';
import MarketplaceHeader from "../../components/marketplace/MarketplaceHeader";
import SearchBar from "../../components/marketplace/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import LivestockTypeFilter from "../../components/marketplace/LivestockTypeFilter";

function Livestock() {
    const { livestock, loading } = useLivestock();
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const debouncedSearch = useDebounce(search);

    const filteredLivestock = livestock.filter((animal) => {
        const name = animal.name?.toLowerCase() || "";
        const animalType = animal.type?.toLowerCase() || "";
        const breed = animal.breed?.toLowerCase() || "";

        const searchTerm = (debouncedSearch || "").toLowerCase()

        return (
            name.includes(searchTerm) ||
            animalType.includes(searchTerm) ||
            breed.includes(searchTerm) 
        );
    })

    if (loading) {
        return <p>Loading livestock...</p>
    }

  return (
    <div>
        <h1>Livestock Marketplace</h1>

        <MarketplaceHeader/>

        <SearchBar search={search} setSearch={setSearch}/>

        <LivestockTypeFilter type={type} setType={setType}/>

        <LivestockGrid livestock={filteredLivestock}/>
        
    </div>
  )
}

export default Livestock;