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
import ShowFilter from "../../components/marketplace/ShowFilter";

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

    const resetFilters = () => {
        setSearch("");
        setType("");
        setBreed("");
        setAge("");
        setMinPrice("");
        setMaxPrice("");
        setSort("");
    };

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
        <h1 className="font-bold text-center tracking-wider text-green-900 text-3xl">Livestock Marketplace</h1>

        <MarketplaceHeader 
            showFilters={showFilters} 
            setShowFilters={setShowFilters}
            cartCount={cart.length}
        />
        {/* searchbar */}
        <SearchBar search={search} setSearch={setSearch}/>

        <ShowFilter showFilters={showFilters} setShowFilters={setShowFilters}/>


        {showFilters && (
            <div className="mt-2 mb-4 rounded-2xl border border-green-100 bg-green-50 shadow-xl p-4">
                {/* filter title */}
                <div className="mb-4 text-center gap-5 ">
                    <h3 className="font-semibold text-green-900 text-xl">Filter Livestock</h3>
                    <p className="text-gray-600 text-sm">Narrow down your search</p>
                </div>
                {/* livestock filter */}
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 items-end">
                <LivestockTypeFilter type={type} setType={setType}/>
                {/* breed filter */}
                <BreedFilter breed={breed} setBreed={setBreed} />
                {/* age filter */}
                <AgeFilter age={age} setAge={setAge}/>
                {/* sorting by price & age */}
                <SortDropdown sort={sort} setSort={setSort}/>
                {/* pricefilter */}
                <PriceFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                />
                
                </div>

                <div className="flex justify-end mt-3">
                <button 
                    onClick={resetFilters} 
                    className=' rounded-xl bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-400 transition-colors duration-300 flex '
                >
                    Reset
                </button>
                </div>

            </div>
        )}
        

        <LivestockGrid 
            livestock={sortedLivestock}
            
        />
        
    </div>
  )
}

export default Livestock;