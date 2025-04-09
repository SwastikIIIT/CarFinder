"use client";

import { useState, useEffect } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';
import CarGrid from '@/components/CarGrid';
import FilterSidebar from '@/components/FilterSidebar';
import PaginationComponent from '@/components/Pagination';
import WishlistDrawer from '@/components/WishlistDrawer';
import LoadingState from '@/components/LoadingState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Image from 'next/image';


export default function Home() {
  const {setTheme,theme}=useTheme();

  const [filteredCars,setFilteredCars]=useState([]);
  const [loading,setLoading] = useState(true);
  const [searchQuery,setSearchQuery] = useState('');
  const [filters,setFilters]=useState({
    brand: 'all',
    minPrice:0,
    maxPrice:100000,
    fuelType: 'all',
    seatingCapacity: 8
  });
  const [currentPage, setCurrentPage]=useState(1);
  const [wishlistOpen,setWishlistOpen]=useState(false);
  const [wishlist, setWishlist]=useState([]);
  const carsPerPage=10;
  const [sort,setSort]=useState("");

 
  useEffect(() => {
      const wishlistedItems=localStorage.getItem('carWishlist');
      if (wishlistedItems)
      setWishlist(JSON.parse(wishlistedItems));

    const fetchCars=async()=>{
      try {
        setLoading(true);
        const data=await fetch('/api/cars');
        const response=await data.json();
        
        if(response.success)
          setFilteredCars(response.cars);
        else
        throw new Error(response.message)
      }
      catch(err)
      {
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  
  useEffect(() => {
    const applyFilters=async()=>{
      setLoading(true);
      try {
        const params=new URLSearchParams();
        if (searchQuery) params.append("search",searchQuery);
         params.append("brand",filters.brand);
         params.append("minPrice",filters.minPrice);
         params.append("maxPrice",filters.maxPrice);
         params.append("fuelType",filters.fuelType);
         params.append("seatingCapacity",filters.seatingCapacity);
        
        const query=`/api/filter-cars?${params.toString()}`;
        console.log("Query is",query);
  
        const data=await fetch(query);
        const response = await data.json();
        if(response.success)
        {
          setFilteredCars(response.filteredCars);
          setCurrentPage(1);
        }
      } catch(err){
        console.log("Error in apply filters",err);
        setError(err.message);
      } finally{
        setLoading(false);
      }
    };

    const debouce=setTimeout(()=>{
        applyFilters();
    },2000);
    return ()=>clearTimeout(debouce);
  }, [searchQuery,filters]);

  const toggleWishlist=(car)=>{
     setWishlist(prev=>{
     const newWishlist=prev.some(item=>item.id===car.id)?prev.filter(item=>item.id!==car.id):[...prev,car];
     localStorage.setItem("carWishlist",JSON.stringify(newWishlist));
     return newWishlist;
    });
    
  };

  const handleSort=()=>{
    const order=sort===""?"ascending":(sort==="descending"?"ascending":"descending");
    const sortedCars=[...filteredCars].sort((a,b)=>{
     if(a.price<=b.price) return order==="ascending"?-1:1;
     else
     return order==="ascending"?1:-1;
    })
    setFilteredCars(sortedCars);
    setSort(order)
}

  const indexOfLastCar=currentPage*carsPerPage;
  const indexOfFirstCar=indexOfLastCar-carsPerPage;
  const currentCars=filteredCars.slice(indexOfFirstCar,indexOfLastCar);
  const totalPages=Math.ceil(filteredCars.length/carsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[color:var(--darkHeader)]">
    
      <header className="bg-white dark:bg-black shadow-sm transition-colors duration-200 h-22">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className='flex items-center gap-2'>
          <Image
            className='rounded-full'
            src="/car1.webp"
            height={65}
            width={65}
          />
          <h1 className="text-2xl font-bold text-blue-600 dark:text-white dark:text-shadow-amber-50 mb-0.5">Car Finder</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Search cars by model or brand..."
                className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={()=>setWishlistOpen(true)}
              className="flex items-center gap-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
            >
              Wishlist<span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full transition-colors">{wishlist.length}</span>
            </Button>
            <Button
               variant="outline"
               className="p-2 rounded-full h-10 w-10 flex items-center justify-center border-gray-500 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all"
               onClick={()=>setTheme(theme==='dark'?'light':'dark')}
              >{theme==='dark'?<Moon size={18}/>:<Sun size={18}/>}</Button>
          </div>
        </div>
      </header>

      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="w-full md:w-64 shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          
          <div className="flex-1">
            {loading ? (
              <LoadingState />
            ) : filteredCars.length===0 ? (
              <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg">
                No cars found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              <>
              <div className='flex items-center justify-between gap-6'>
                <p className="text-gray-500 mb-4">Showing {indexOfFirstCar+1}-{Math.min(indexOfLastCar,filteredCars.length)} of {filteredCars.length} cars</p>
                <Button 
                  variant="outline"
                  onClick={()=>handleSort()}
                  className="flex items-center mb-4 gap-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
                >
                  <ArrowUpDown size={16} className="mr-1" />
                  {sort === '' ? 'Sort by Price' : `Price: ${sort === "ascending" ? 'Low to High' : 'High to Low'}`}
              </Button>
              </div>
                <CarGrid 
                  cars={currentCars} 
                  wishlist={wishlist} 
                  toggleWishlist={toggleWishlist} 
                />
                <div className="mt-8">
                  <PaginationComponent 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <WishlistDrawer 
        open={wishlistOpen}
        setOpen={setWishlistOpen}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
      />
    </div>
  );
}