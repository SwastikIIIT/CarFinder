"use client";

import { X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';

export default function WishlistDrawer({open,setOpen,wishlist,toggleWishlist }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-5">
          <div>
            <SheetTitle>Your Wishlist ({wishlist.length})</SheetTitle>
          </div>
        </SheetHeader>
        
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Button variant="outline" onClick={()=>setOpen(false)}>
              Browse Cars
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-150px)]">
            <div className="space-y-4">
              {wishlist.map(car => (
                <div key={car.id} className="flex items-start gap-4 p-3 border rounded-lg">
                  <div className="h-20 w-20 shrink-0">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/car/${car.id}`} onClick={()=>setOpen(false)}>
                      <h4 className="font-medium text-sm hover:text-blue-600">{car.name}</h4>
                    </Link>
                    <p className="text-blue-600 font-medium">${car.price.toLocaleString()}</p>
                    <div className="text-xs text-gray-500">
                      {car.brand} • {car.fuelType} • {car.seatingCapacity} Seats
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={()=>toggleWishlist(car)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}