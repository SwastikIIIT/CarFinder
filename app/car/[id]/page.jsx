

import CarDetails from '@/components/CarDetails';

export default async function CarDetailsPage({params}) {
  const {id}=await params;
  
   return(
     <CarDetails id={id}/>
   )
}