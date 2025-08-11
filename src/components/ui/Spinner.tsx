import { Loader2 } from "lucide-react";
import { FC } from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size = 24, color = "text-gray-300" }) => {
  return <Loader2 className={`animate-spin ${color}`} style={{ width: size, height: size }} />;
};
