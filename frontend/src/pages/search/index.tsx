import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR, { Fetcher, useSWRConfig } from "swr";

import Book from "@/components/book";
import { apiConfig } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import { Alert } from "@/components/alert";

type IBook = {
  id: string;
  title: string;
  author: string;
  biography: string;
};

const fetchAPI: Fetcher<IBook[], string> = async (key: string) => {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
};

export default function Search() {
  const router = useRouter();

  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const { data, error } = useSWR(
    `${apiConfig.url}/api/v1/books/${router.query.searchType}/${router.query.search}`,
    fetchAPI
  );

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
          `${apiConfig.url}/api/v1/books/${router.query.searchType}/${router.query.search}`
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
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data ? (
            data.map((book) => (
              <Book
                key={book.id}
                title={book.title}
                author={book.author}
                biography={book.biography}
                id={book.id}
                onDelete={deleteBook}
              />
            ))
          ) : (
            <Alert description="Book not founded." />
          )}
        </div>
      </div>
    </div>
  );
}
