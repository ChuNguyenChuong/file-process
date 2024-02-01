import { AxiosResponse } from "axios";

export interface IPayload<T> {
  data: T,
  onSuccess?: (res: AxiosResponse<AnyElement, AnyElement>) => void,
  onFail?: (e: AnyElement) => void,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyElement = any;