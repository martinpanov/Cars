import { createCustomApi } from "../utils/api";

const carsApi = createCustomApi({
  endpoints: {
    sellCar: { method: "POST", endpoint: "/cars" },
    editCar: { method: "PUT", endpoint: ({ id }) => `/cars/${id}` },
    getCars: {
      method: "GET",
      endpoint: ({ queryString }) =>
        !queryString ? "/cars" : `/cars?${queryString}`,
    },
    getCar: { method: "GET", endpoint: ({ id }) => `/cars/${id}` },
    deleteCar: { method: "DELETE", endpoint: "/cars" },
  },
});

export const {
  useSellCarMutation,
  useEditCarMutation,
  useGetCarsQuery,
  useGetCarQuery,
  useDeleteCarMutation,
} = carsApi;
