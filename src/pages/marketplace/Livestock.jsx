import { useState } from "react";
import useLivestock from "../../hooks/useLivestock"
import LivestockGrid from '../../components/livestock/LivestockGrid';
import MarketplaceHeader from "../../components/marketplace/MarketplaceHeader";
import SearchBar from "../../components/marketplace/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import LivestockTypeFilter from "../../components/marketplace/LivestockTypeFilter";
import BreedFilter from "../../components/marketplace/BreedFilter";
import AgeFilter from "../../components/marketplace/AgeFilter";
import PriceFilter from "../../components/marketplace/PriceFilter";
import SortDropdown from "../../components/marketplace/SortDropdown";
import { useCart } from "../../context/CartContext";

function Livestock() {
    const { livestock, loading } = useLivestock();
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const { cart } = useCart();
    const debouncedSearch = useDebounce(search);
    

    const filteredLivestock = livestock.filter((animal) => {
        const name = animal.name?.toLowerCase() || "";
        const animalType = animal.type?.toLowerCase() || "";
        const animalBreed = animal.breed?.toLowerCase() || "";
        const animalAge = animal.age;
        const animalPrice = Number(animal.price);
       

        const searchTerm = (debouncedSearch || "").toLowerCase();
        const selectedType = (type || "").toLowerCase();
        const selectedBreed = (breed || "").toLowerCase();
        const selectedAge = age === "" ? "" : Number(age);
        const selectedMinPrice = minPrice === "" ? "" : Number(minPrice);
        const selectedMaxPrice = maxPrice === "" ? "" : Number(maxPrice);
        

        const matchesSearch = 
        name.includes(searchTerm) || 
        animalType.includes(searchTerm) ||
        animalBreed.includes(searchTerm);


        const matchesType =
            selectedType === "" || animalType === selectedType;
        const matchesBreed = 
            selectedBreed === "" || animalBreed === selectedBreed;
        const matchAge = 
            selectedAge === "" || animalAge == selectedAge;
        const matchMinPrice= 
            selectedMinPrice === "" || animalPrice >= selectedMinPrice;
        const matchMaxPrice = 
            selectedMaxPrice === "" || animalPrice <= selectedMaxPrice;

        return (
            matchesSearch &&
            matchesType && 
            matchesBreed && 
            matchAge && 
            matchMinPrice && 
            matchMaxPrice
        );        
    });

    const sortedLivestock = [...filteredLivestock].sort((a,b) => {
        if (sort === "price-low"){
            return Number(a.price) - Number(b.price);
        }
        if (sort === "price-high"){
            return Number(b.price) - Number(a.price);
        }
        if (sort === "age-young"){
            return Number(a.age) - Number(b.age);
        }
        if (sort === "age-old"){
            return Number(b.age) - Number(a.age);
        }
        return 0;
    });

    if (loading) {
        return <p>Loading livestock...</p>
    }

  return (
    <div className="p-4">
        <h1 className="font-bold text-center tracking-wide text-2xl">Livestock Marketplace</h1>

        <MarketplaceHeader 
            showFilters={showFilters} 
            setShowFilters={setShowFilters}
            cartCount={cart.length}
        />
        {/* searchbar */}
        <SearchBar search={search} setSearch={setSearch}/>

        {showFilters && (
            <div className="flex mt-2 mb-2  gap-2">
                <h3>Filter Livestock</h3>
                {/* livestock filter */}
                <LivestockTypeFilter type={type} setType={setType}/>
                {/* breed filter */}
                <BreedFilter breed={breed} setBreed={setBreed} />
                {/* age filter */}
                <AgeFilter age={age} setAge={setAge}/>
                {/* pricefilter */}
                <PriceFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                />
                <SortDropdown sort={sort} setSort={setSort}/>

            </div>
        )}
        

        <LivestockGrid 
            livestock={sortedLivestock}
            
        />
        
    </div>
  )
}

export default Livestock;