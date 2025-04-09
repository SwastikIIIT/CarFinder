'use client'
import React, { useEffect } from 'react'

const page = () => {
    useEffect(()=>{
          const fetchCars=async()=>{
              const cars=await fetch("/api/cars");
              const data=await cars.json();
                 console.log("Api response",data.cars);
          }
          fetchCars();
    },[])
  return (
    <div>page</div>
  )
}

export default page