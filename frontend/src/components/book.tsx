import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type IBookProps = {
  id: string;
  title: string;
  author: string;
  biography: string;
};

function Book({ id, title, author, biography }: IBookProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription color="textSecondary">{author}</CardDescription>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: biography }} />
      </CardContent>
    </Card>
  );
}

export default Book;
