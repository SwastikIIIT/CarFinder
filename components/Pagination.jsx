"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComponent({currentPage,totalPages,setCurrentPage}) {
 
    const pages = [];
    for(let i=0;i<totalPages;i++)
      pages.push(i+1); 

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={()=>setCurrentPage(prev=>Math.max(1,prev-1))}
            className={currentPage===1?"pointer-events-none opacity-50":"cursor-pointer"}
          />
        </PaginationItem>
        
        {pages.map((page,index)=>(
            <PaginationItem key={index}>
              <PaginationLink 
              className="cursor-pointer"
                onClick={()=>setCurrentPage(page)}
                isActive={currentPage===page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={()=>setCurrentPage(prev=>Math.min(prev+1,totalPages))}
            className={currentPage===totalPages ? "pointer-events-none opacity-50" :"cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
