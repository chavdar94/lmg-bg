"use client";

import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { updateQuery } from "@/lib/utils";

interface Props {
  totalPages: number;
  currentPage: number;
  route?: string;
}

const PaginationContainer = ({ totalPages, currentPage }: Props) => {
  const router = useRouter();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      updateQuery("page", `${currentPage + 1}`, router);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      updateQuery("page", `${currentPage - 1}`, router);
    }
  };

  const handlePageChange = (page: number) => {
    updateQuery("page", `${page}`, router);
  };

  const getActivePages = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const activePages = getActivePages();

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem key={idx} className={`cursor-pointer`}>
        <PaginationLink
          className={
            currentPage === page
              ? "bg-slate-800 text-white hover:bg-slate-950 hover:text-white transition-colors duration-300 "
              : "bg-slate-200 text-black hover:bg-slate-300  transition-colors duration-300 "
          }
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1 && currentPage >= 5) {
      renderedPages.unshift(
        <PaginationEllipsis
          className="bg-slate-100 rounded-md"
          key="ellipsis-start"
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < totalPages) {
      renderedPages.push(
        <PaginationEllipsis
          className="bg-slate-100 rounded-md"
          key="ellipsis-end"
        />
      );
    }

    return renderedPages;
  };

  return (
    <Pagination className="text-slate-900 dark:text-slate-100 mb-4 mt-12 flex items-center gap-4 w-full">
      <PaginationContent className="flex flex-wrap justify-center">
        {currentPage > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              className="bg-slate-800 hover:bg-slate-950 text-white hover:text-white transition-colors duration-300"
              onClick={handlePreviousPage}
            />
          </PaginationItem>
        )}

        {currentPage >= 4 && (
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                className="bg-slate-200 hover:bg-slate-300 text-black transition-colors duration-300"
                onClick={() => handlePageChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        )}

        {renderPages()}

        {totalPages > 5 && currentPage <= totalPages - 3 && (
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                className="bg-slate-200 hover:bg-slate-300 text-black transition-colors duration-300"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        )}

        {currentPage < totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              className="bg-slate-800 hover:bg-slate-950 text-white hover:text-white transition-colors duration-300"
              onClick={handleNextPage}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationContainer;
