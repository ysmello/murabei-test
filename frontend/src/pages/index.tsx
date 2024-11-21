import { useState } from "react";
import useSWR, { Fetcher, useSWRConfig } from "swr";

import { Pagination } from "@/components/pagination";
import Book from "@/components/book";
import { apiConfig } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type IBook = {
  id: string;
  title: string;
  author: string;
  biography: string;
};

type IResponse = {
  books: IBook[];
  total: number;
};

const fetchAPI: Fetcher<IResponse, string> = async (key: string) => {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { toast } = useToast();

  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(
    `${apiConfig.url}/api/v1/books?page=${currentPage}&page_size=10`,
    fetchAPI
  );

  const handleSearch = () => {
    if (search.trim()) {
      router.push({
        pathname: `/search`,
        query: { search, searchType },
      });
    }
  };

  if (!data) {
    return "...carregando";
  }

  const totalItems = data.total;
  const totalPages = Math.ceil(totalItems / 10);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const triggerDeleteToast = () => {
    toast({
      title: "Failed to delete the book",
      description:
        "There was an error while trying to delete the book. Please try again.",
    });
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await fetch(`${apiConfig.url}/api/v1/books/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Book Deleted",
          description: "The book has been successfully deleted.",
        });
        mutate(
          `${apiConfig.url}/api/v1/books?page=${currentPage}&page_size=10`
        );
      } else {
        triggerDeleteToast();
      }
    } catch (error) {
      console.error("Error deleting the book", error);
      triggerDeleteToast();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex gap-2 mb-4 p-4">
          <Input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            onValueChange={(value) => setSearchType(value)}
            defaultValue="title"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Search by</SelectLabel>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button onClick={handleSearch}>Search</Button>
        </div>

        <Pagination
          total={data.total}
          currentPage={currentPage}
          onPageChange={changePage}
        />

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.books.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              author={book.author}
              biography={book.biography}
              id={book.id}
              onDelete={deleteBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
