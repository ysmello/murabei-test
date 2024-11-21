import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("title");

  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push({
        pathname: `/search`,
        query: { search, searchType },
      });
    }
  };

  return (
    <div className="flex gap-2 mb-4 p-4">
      <Link href="/create">
        <Button>Create</Button>
      </Link>
      <Link href="/">
        <Button className="ml-2">Home</Button>
      </Link>

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
  );
}

export default SearchBar;
