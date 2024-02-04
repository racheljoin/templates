export type IRequest<T> = {
  code: string;
  msg?: string;
  data: T;
};
