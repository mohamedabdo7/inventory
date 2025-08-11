export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  type?: string;
  required?: boolean;
  className?: string;
  errMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  subText?: string | React.ReactNode;
  containerClassName?: string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  required?: boolean;
  errMessage?: string;
  subText?: string | React.ReactNode;
  containerClassName?: string;
}

export interface QueryParams {
  [key: string]: string | number | boolean | null;
}

export interface ApiResponse<T> {
  success: boolean;
  error: string | null;
  data: {
    rows: T[];
    count: number;
  };
}

export interface ApiGetAllResponse<T> {
  rows: T[];
  count: number;
  numOfUnread?: number;
}
export interface ApiGetAllResponseStat<T> {
  rows: T[];
  count: number;
  statusInNumber: StatusInNumber;
}
export interface StatusInNumber {
  statuses: Status[];
  total: number;
}

export interface Status {
  status: string;
  count: number;
}

export interface TableHead {
  label: string;
  key: string;
  hide?: boolean;
}

export interface TableData {
  [key: string]: React.ReactNode;
}

export interface AddonGlobal {
  id: string;
  name: string;
  icon: {
    id: string;
    name: string;
    path: string;
  };
}

export interface VendorGlobal {
  id: string;
  name: string;
  logo: string;
  cover: string;
}
