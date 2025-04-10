import React from 'react'
import { Moon, Search, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

const Header = ({searchQuery,setSearchQuery,setWishlistOpen,wishlist}) => {
    const {setTheme,theme}=useTheme();
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 flex items-center justify-between">
            <div className='flex items-center gap-1 sm:gap-2'>
                <div className='flex items-center w-8 h-8 sm:w-12 sm:h-12'>
                    <img
                    alt='logoImage'
                    className='rounded-full shadow-sm transition-transform'
                    src="/car1.jpg"
                    />
                </div>
                <h1 className="text-xs md:text-2xl font-bold text-blue-600 dark:text-white mb-0.5">Car Finder</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative flex-shrink">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"/>
                    <Input
                    type="text"
                    placeholder="Search cars by model or brand..."
                    className="pl-10 pr-4 py-2 w-30 md:w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    />
                </div>
            <Button 
                variant="outline" 
                onClick={()=>setWishlistOpen(true)}
                className="cursor-pointer text-xs flex items-center gap-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
            >
            <span className='text-xs'>Wishlist</span><span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full transition-colors">{wishlist.length}</span>
            </Button>
            <Button
                variant="outline"
                className="cursor-pointer p-2 rounded-full h-7 w-7 sm:h-10 sm:w-10 flex items-center justify-center border-gray-500 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all"
                onClick={()=>setTheme(theme==='dark'?'light':'dark')}
                >{theme==='dark'?<Moon/>:<Sun/>}</Button>
            </div>
        </div>
  )
}

export default Header