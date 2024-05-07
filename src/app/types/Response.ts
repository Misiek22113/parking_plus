type CustomResponse<T> = {
  isSuccessful: boolean;
  message: string;
  data: T;
};

export default CustomResponse;
