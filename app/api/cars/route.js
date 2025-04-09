import {NextResponse} from 'next/server';

export async function GET(req,res){
 try
 {
   const carsData=await fetch("https://983480ef-368e-4289-a012-d6e9d98ba844.mock.pstmn.io/cars")
   const cars=await carsData.json();
   return NextResponse.json({cars:cars.carsData,success:true,status:200});
 }
 catch(err)
 {
    console.log(err);
    return NextResponse.json({message:"Failed to render the carData array",success:false,status:500});
 }
}