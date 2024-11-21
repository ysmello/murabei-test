import { Alert as AlertRoot, AlertDescription } from "@/components/ui/alert";

type IAlertProps = {
  description: string;
};

export function Alert({ description }: IAlertProps) {
  return (
    <AlertRoot>
      <AlertDescription>{description}</AlertDescription>
    </AlertRoot>
  );
}
