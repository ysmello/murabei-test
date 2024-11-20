import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { AlertDialog } from "./alertDialog";

type IBookProps = {
  id: string;
  title: string;
  author: string;
  biography: string;
  onDelete: (id: string) => void;
};

function Book({ id, title, author, biography, onDelete }: IBookProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription color="textSecondary">{author}</CardDescription>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: biography }} />
      </CardContent>
      <CardFooter>
        <AlertDialog
          onConfirm={async () => onDelete(id)}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your
            book."
        />
      </CardFooter>
    </Card>
  );
}

export default Book;
