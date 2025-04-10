import {NextResponse} from 'next/server';

export async function GET(req,res){
 try
 {
   const carsData=await fetch("https://c93e8acb-514b-4cde-8c73-05601c7325e3.mock.pstmn.io/cars")
   const cars=await carsData.json();
   return NextResponse.json({cars:cars.carsData,success:true,status:200});
 }
 catch(err)
 {
    console.log(err);
    return NextResponse.json({message:"Failed to render the carData array",success:false,status:500});
 }
}