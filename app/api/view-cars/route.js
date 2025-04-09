import { NextResponse } from "next/server";

export async function GET(req,res){

    try
    {
        const carsData=await fetch("https://983480ef-368e-4289-a012-d6e9d98ba844.mock.pstmn.io/cars")
        const cars=await carsData.json();   

        const url=new URL(req.url);
        const carId=url.searchParams.get('carID')

        const car=cars?.carsData.find(item=>item.id===carId); 

        if(!car)
         return NextResponse.json({success:false,message:"Car not found",status:404})
        return NextResponse.json({success:true,car:car,status:200});
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({success:false,message:"Failed to load the particular car data",status:500});
    }
}