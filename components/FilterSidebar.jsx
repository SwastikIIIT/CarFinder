"use client";

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FilterSidebar({filters,setFilters}) {
  const brands=["Toyota","Honda","BMW","Mercedes","Ford","Audi","Tesla","Hyundai","Kia","Volkswagen"];
  const fuelTypes = ["Petrol","Diesel","Electric","Hybrid"];
  const seatingCapacities=[2,4,5,6,7,8];
  const [priceRange,setPriceRange] = useState([filters.minPrice,filters.maxPrice]);
  
  const handlePriceChange=(value) => {
    setPriceRange(value);
    setFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1]
    });
  };
  
  const resetFilters=()=> {
    setFilters({
      brand: 'all',
      minPrice: 0,
      maxPrice: 100000,
      fuelType: 'all',
      seatingCapacity: 8
    });
    setPriceRange([0,50000]);
  };

  const handleSelectChange=(field,value) => {
    setFilters({
      ...filters, 
      [field]: value
    });
  };

  return (
    <Card>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
     
      <CardContent>
        <div className="space-y-6">
          
          <div className="space-y-3">
            <Label htmlFor="brand">Brand</Label>
            <Select 
              value={filters.brand} 
              onValueChange={(value)=>handleSelectChange('brand', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand} className="cursor-pointer">{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priceChange">Price Range</Label>
            <div className="pt-4 pb-2">
              <Slider 
                value={priceRange}
                min={0}
                max={100000}
                step={10000}
                onValueChange={(value)=>handlePriceChange(value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>${priceRange[0].toLocaleString()}</div>
              <div>${priceRange[1].toLocaleString()}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Select 
              value={filters.fuelType} 
              onValueChange={(value)=>handleSelectChange('fuelType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {fuelTypes.map(type => (
                  <SelectItem key={type} value={type} className="cursor-pointer">{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seatingCapacity">Seating Capacity</Label>
            <Select 
              value={filters.seatingCapacity} 
              onValueChange={(value) => handleSelectChange('seatingCapacity', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="8" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Capacity</SelectItem>
                {seatingCapacities.map(capacity => (
                  <SelectItem key={capacity} value={capacity} className="cursor-pointer">{capacity} Seats</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full cursor-pointer"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}