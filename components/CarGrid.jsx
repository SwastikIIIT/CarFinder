"use client";

import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CarGrid({cars,wishlist,toggleWishlist }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow ">
          <div className="relative h-48">
            <img
              src={car.image} 
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
              onClick={()=>toggleWishlist(car)}
            >
              <Heart 
                className={`${wishlist.some(item=>item.id===car.id) ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:fill-gray-50'}`} 
                size={20} 
              />
            </Button>
          </div>

          <CardContent className="pt-4">
            <Link href={`/car/${car.id}`}>
              <h3 className="font-semibold text-lg mb-1 hover:text-blue-600">{car.name}</h3>
            </Link>
            <p className="text-blue-600 font-bold text-xl mb-2">${car.price.toLocaleString()}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="bg-blue-50 dark:bg-gray-700">{car.fuelType}</Badge>
              <Badge variant="outline" className="bg-blue-50 dark:bg-gray-700">{car.brand}</Badge>
              <Badge variant="outline" className="bg-blue-50 dark:bg-gray-700">{car.seatingCapacity} Seats</Badge>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-0">
            <Link href={`/car/${car.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </CardFooter>

        </Card>
      ))}
    </div>
  );
}