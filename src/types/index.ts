export type ErrorResponse = {
  code?: number;
  error?: boolean;
  message?: string;
};

type Status = "idle" | "pending" | "resolved" | "rejected";

export enum StatusEnum {
  IDLE = "idle",
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export type RequestStatus<D = unknown, E = string> = {
  data?: D;
  error?: E;
  method?: string | undefined;
  status: Status;
};

export type RequestChannel<D = unknown, E = string> = {
  data?: D;
  error?: E;
  // method: string;
  status: Status;
};
