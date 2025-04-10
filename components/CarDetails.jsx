'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Heart, Info, Phone} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import LoadingState from '@/components/LoadingState';
import { useTheme } from 'next-themes';
import { Moon, Sun } from "lucide-react"

const CarDetails = ({id}) => {
   const {setTheme,theme}=useTheme();

    const [car,setCar]=useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlist,setWishlist]=useState([]);
    const [inWishlist,setinWishlist]=useState(false);
  
    
    useEffect(() => {
      const wishList=localStorage.getItem('carWishlist');
      if(wishList)
      {
        const arrayOfObj=JSON.parse(wishList);
        setWishlist(arrayOfObj);
        setinWishlist(arrayOfObj.some(item=>item.id===id));
      }
      const fetchCarDetails=async()=>{
        try {
          setLoading(true);
          const data=await fetch(`/api/view-cars?carID=${id}`);
          const response=await data.json();
          if (response.success)
          setCar(response.car);
          else
          throw Error(response.message);
        } catch(err){
          console.log("Error in viewing car details",err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCarDetails();
    },[id]);
  
  
    const toggleWishlist=()=>{
      let newWishList;
      if(inWishlist)
      {
        newWishList=wishlist.filter(item=>item.id!==car.id);
        setinWishlist(false);
      }
      else
      {
        newWishList=[...wishlist,car];
        setinWishlist(true);
      }
      setWishlist(()=>{
        localStorage.setItem("carWishlist",JSON.stringify(newWishList));
        return newWishList;
      })
    }
  
    if(loading){
      return (
        <LoadingState/>
      );
    }
 
     console.log("Car",car);
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[color:var(--darkHeader)]">

        <header className="bg-white shadow-sm flex justify-between items-center px-6  dark:bg-black transition-colors duration-200">
          <div className="container mx-auto px-4 py-6">
            <Link href="/">
              <Button variant="ghost" className="text-blue-600 text-lg">
                <ChevronLeft size={20} className="mr-2"/> Back to Car Listings
              </Button>
            </Link>
          </div>
          <Button
               variant="outline"
               className="p-2 rounded-full h-10 w-10 flex items-center justify-center border-gray-500 dark:border-white hover:bg-gray-100  text-gray-800  dark:text-white dark:hover:text-black dark:hover:bg-white transition-all"
               onClick={()=>setTheme(theme==='dark'?'light':'dark')}
              >{theme==='dark'?<Moon size={18}/>:<Sun size={18}/>}</Button>
        </header>
  
        
        <main className="container mx-auto px-4 py-8 ">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-[color:var(--darkid)]">
           
            <div className="relative h-96">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
  

            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between mb-4 ]">
                <div>
                  <h1 className="text-3xl font-bold mb-4 dark:text-white">{car.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-blue-50 dark:bg-gray-700">{car.brand}</Badge>
                    <Badge variant="outline" className="bg-blue-50 dark:bg-gray-700">{car.fuelType}</Badge>
                    <Badge variant="outline" className="bg-blue-50 dark:bg-gray-700">{car.seatingCapacity} Seats</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">${car.price.toLocaleString()}</div>
                  <div className="flex gap-2">
                    <Button
                      variant={inWishlist ? "default" : "outline"}
                      className={`cursor-pointer ${inWishlist ? "bg-red-500 hover:bg-red-600" : ""}`}     
                      onClick={toggleWishlist}
                    >
                      <Heart className={`mr-2 ${inWishlist ? "fill-white" : ""}`} size={16} />
                      {inWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                    </Button>
                    <a href={car.url} target='_blank' rel="noreferrer noopener">
                      <Button variant="outline" className="cursor-pointer">
                        <Info className="mr-2" size={16} />
                        More Info
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
  
              <hr className="my-6" />
  
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Car Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-gray-500 mb-1">Brand</h3>
                      <p className="font-medium">{car.brand}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-gray-500 mb-1">Model Year</h3>
                      <p className="font-medium">{car.year}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-gray-500 mb-1">Fuel Type</h3>
                      <p className="font-medium">{car.fuelType}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-gray-500 mb-1">Seating Capacity</h3>
                      <p className="font-medium">{car.seatingCapacity} People</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-gray-500 mb-1">Engine</h3>
                      <p className="font-medium">{car.engine}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-gray-500 mb-1">Transmission</h3>
                      <p className="font-medium">{car.transmission}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
  
              <hr className="my-6" />
  
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed dark:text-white/50">
                  {car.description || 
                   `The ${car.name} is a ${car.seatingCapacity}-seater ${car.brand} vehicle with a ${car.fuelType} engine.
                   This model offers an excellent combination of performance, comfort, and reliability. 
                   With its stylish design and advanced features, it has become a popular choice among car enthusiasts and families alike.
                   The spacious interior and ergonomic design ensure a comfortable ride for all passengers.
                   Additional features include advanced safety systems, entertainment options, and fuel efficiency that makes it economical for daily commutes and long drives.`}
                </p>
              </div>
  
              <hr className="my-6" />
  
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                  {car.features.map((item,ind) => (
                    <div key={ind} className="flex items-center py-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
  
              
              <div className="bg-blue-50 rounded-lg p-6 mt-8 text-center">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Interested in this car?</h3>
                <p className="text-blue-600 mb-4">Contact at the given number for more information or to schedule a test drive.</p>
                <Button size="lg" className="flex items-center gap-2 mx-auto">
                  <Phone size={18}/>+91{" "}6394942336
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}

export default CarDetails