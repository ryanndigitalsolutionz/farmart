import { useParams } from "react-router-dom";
import { useState } from "react";
import useLivestock from "../../hooks/useLivestock";
import { useCart } from "../../context/CartContext";

function LivestockDetails() {
  const { id } = useParams();
  const { livestock, loading } = useLivestock();
  const { addToCart } = useCart();
  const { selectedImage, setSelectedImage} = useState(null);

  if (loading) {
    return <p>Loading livestock...</p>
  }

  const animal = livestock.find(
    (animal) => animal.id === id
  );

  const mainImage = selectedImage || animal?.images?.[0]

  if (!animal) {
    return <p>Livestock not found.</p>;
  }

  return (
    <div>
        <img 
          src={mainImage} 
          alt={animal.name} 
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover"
          }}
        />
        {/* multiple pictures */}
        <div className="">
          {animal.images?.map((image, index) => (
           <img 
            key={index}
            src={animal.images?.[0]} 
            alt={`${animal.name} ${index + 1}`}
            onClick={() => setSelectedImage(image)}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              margin: "5px",
              cursor: "pointer"
            }}
          />
          ))}

        </div>
        
       
        <h1>{animal.name}</h1>

        <p>Type: {animal.type}</p>
        <p>Breed: {animal.breed}</p>
        <p>Age: {animal.age} years</p>
        <p>Price: Ksh {animal.price}</p>
        <p>Status: {animal.availability}</p>

        {/* add to cart */}
        <button onClick={() => addToCart(animal)}>
          Add to Cart
        </button>
    </div>
  )
}

export default LivestockDetails