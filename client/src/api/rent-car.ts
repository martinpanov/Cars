import { createCustomApi } from "../utils/api";

const rentCarApi = createCustomApi({
  endpoints: {
    rentCar: { method: 'POST', endpoint: '/rentcar' },
    getRentCars: { method: 'GET', endpoint: ({ queryString }) => queryString ? `/rentcar?${queryString}` : '/rentcar' },
  }
});

export const {
  useGetRentCarsQuery,
  useRentCarMutation,
} = rentCarApi;
