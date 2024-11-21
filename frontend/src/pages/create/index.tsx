import { Button } from "@/components/ui/button";
import { apiConfig } from "@/lib/config";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(100, "Author is too long"),
  author_slug: z
    .string()
    .min(1, "Author slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase and contain only letters, numbers, or dashes"
    ),
  author_bio: z.string().optional(),
  authors: z.string().optional(),
  publisher: z.string().min(1, "Publisher is required"),
  synopsis: z
    .string()
    .min(10, "Synopsis must be at least 10 characters long")
    .max(500, "Synopsis is too long"),
});

type BookData = z.infer<typeof bookSchema>;

function Create() {
  const form = useForm<BookData>({
    resolver: zodResolver(bookSchema),
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: BookData) => {
    const response = await fetch(`${apiConfig.url}/api/v1/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast({
        title: "Book Created",
        description: "The book has been successfully created.",
      });

      router.push({
        pathname: `/search`,
        query: { search: data.title, searchType: "title" },
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Book</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author_slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Author Slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author_bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Author Bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Authors</FormLabel>
                <FormControl>
                  <Input placeholder="Additional Authors" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input placeholder="Publisher" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="synopsis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Synopsis</FormLabel>
                <FormControl>
                  <Input placeholder="Synopsis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
}

export default Create;
