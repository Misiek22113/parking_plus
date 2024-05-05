import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AlertDestructive = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Alert variant="destructive" className="absolute bottom-4 right-4 w-1/5">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertDestructive;
