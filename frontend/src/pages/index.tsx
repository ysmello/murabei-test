import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import { Pagination } from "@/components/pagination";
import Book from "@/components/book";

type IBook = {
  id: string;
  title: string;
  author: string;
  biography: string;
}

type IResponse = {
  books: IBook[];
  total: number
}

const fetchAPI: Fetcher<IResponse, string> = async (key: string) => {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, error } = useSWR(`http://localhost:5000/api/v1/books?page=${currentPage}&page_size=10`, fetchAPI)

  if (!data) {
    return "...carregando"
  }

  const totalItems = data.total;

  const totalPages = Math.ceil(totalItems / 10);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mb-4 p-4">
          <input
            type="text"
            placeholder="Buscar livros..."
            className="p-2 border border-gray-300 rounded-lg w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Pagination total={data.total} currentPage={currentPage} onPageChange={changePage}/>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.books.map((book) => (
            <Book 
              key={book.id} 
              title={book.title}
              author={book.author}
              biography={book.biography}
              id={book.id}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}
