import { NextResponse } from "next/server";

export  async function GET(req,res){
   try
   {
    const data=await fetch("https://c93e8acb-514b-4cde-8c73-05601c7325e3.mock.pstmn.io/cars")
    const carsData=await data.json();

    const url=new URL(req.url);

    const search=url.searchParams.get('search') || '';
    const brand=url.searchParams.get('brand');
    const minPrice=Number(url.searchParams.get('minPrice'));
    const maxPrice=Number(url.searchParams.get('maxPrice'));
    const fuelType=url.searchParams.get('fuelType');
    const seatingCapacity=Number(url.searchParams.get('seatingCapacity'));

    console.log("Filter params:", { search, brand, minPrice, maxPrice, fuelType, seatingCapacity });
    
   const filteredCars=carsData?.carsData.filter((car)=>{
          
         const searchMatch=search==='' || car.name.toLowerCase().includes(search.toLowerCase()) ||
          car.brand.toLowerCase().includes(search.toLowerCase())
       
        const brandMatch=brand==='all' || car.brand.toLowerCase()===brand.toLowerCase();
        const priceMatch=car.price>=minPrice && car.price<=maxPrice;
        const fuelMatch=fuelType==='all' || car.fuelType.toLowerCase()===fuelType.toLowerCase();
        const seatingCapacityMatch=seatingCapacity===8 || car.seatingCapacity===seatingCapacity;
       
        return searchMatch && brandMatch && fuelMatch && priceMatch && seatingCapacityMatch;
   })

     return NextResponse.json({filteredCars:filteredCars,success:true,status:200});
   }
   catch(err)
   {
       console.log(err);
       return NextResponse.json({message:"Filtering me dikkat",success:false,status:500});
   } 
}