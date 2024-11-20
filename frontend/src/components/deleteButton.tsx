import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

type IDeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function DeleteButton({ ...props }: IDeleteButtonProps) {
  return (
    <Button variant="destructive" className="w-full" {...props}>
      <Trash className="mr-2" /> Delete
    </Button>
  );
}

export default DeleteButton;
