import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

type PaginationProps = {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  total,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const [rangeStart, setRangeStart] = useState(1);
  const itemsPerPage = 3;

  const getPaginationRange = () => {
    const range = [];
    const rangeEnd = Math.min(rangeStart + itemsPerPage - 1, total);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    return range;
  };

  const handlePageChange = (page: number) => {
    if (page > currentPage && page === rangeStart + itemsPerPage - 1) {
      setRangeStart((prev) => Math.min(prev + 1, total - itemsPerPage + 1));
    } else if (page < currentPage && page === rangeStart) {
      setRangeStart((prev) => Math.max(prev - 1, 1));
    }
    onPageChange(page);
  };

  return (
    <PaginationWrapper>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {getPaginationRange().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {rangeStart + itemsPerPage - 1 < total && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              currentPage < total && handlePageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
}
