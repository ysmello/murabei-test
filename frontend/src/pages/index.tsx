import { useState } from "react";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import useSWR, { Fetcher } from "swr";

const livros = [
  { id: 1, title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'Dom Quixote', author: 'Miguel de Cervantes' },
  { id: 4, title: 'A Revolução dos Bichos', author: 'George Orwell' },
];

type IBooks = {
  id: string;
  title: string;
  author: string;
  biography: string;
}

const fetchAPI: Fetcher<IBooks[], string> = async (key: string) => {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function Home() {
  const { data, error } = useSWR('http://localhost:5000/api/v1/books', fetchAPI)

  const [search, setSearch] = useState("");

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
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.map((book) => (
            <Card key={book.id}>
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <CardDescription color="textSecondary">
                  {book.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: book.biography }} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
