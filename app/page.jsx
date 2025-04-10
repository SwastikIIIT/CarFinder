"use client";

import { useState, useEffect } from 'react';
import { ArrowUpDown} from 'lucide-react';
import CarGrid from '@/components/CarGrid';
import FilterSidebar from '@/components/FilterSidebar';
import PaginationComponent from '@/components/Pagination';
import WishlistDrawer from '@/components/WishlistDrawer';
import LoadingState from '@/components/LoadingState';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';


export default function Home() {

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
    },500);
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

  const lastIndex=currentPage*carsPerPage;
  const firstIndex=lastIndex-carsPerPage;
  const currentCars=filteredCars.slice(firstIndex,lastIndex);
  const totalPages=Math.ceil(filteredCars.length/carsPerPage);

  return (
    <div className="min-h-screen  bg-gray-50 w-full dark:bg-[color:var(--darkHeader)]">
    
      <header className="bg-white dark:bg-black shadow-sm transition-colors duration-200 h-22 w-full">
       <Header setSearchQuery={setSearchQuery} setWishlistOpen={setWishlistOpen} searchQuery={searchQuery} wishlist={wishlist}/>
      </header>

      
      <main className="container mx-auto px-4 py-8 w-full">
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
                <p className="text-gray-500 mb-4">Showing {firstIndex+1}-{Math.min(lastIndex,filteredCars.length)} of {filteredCars.length} cars</p>
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