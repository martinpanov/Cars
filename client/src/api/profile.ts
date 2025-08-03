import { createCustomApi } from "../utils/api";

const profileApi = createCustomApi({
  endpoints: {
    getProfilePicture: { method: 'GET', endpoint: '/myprofile/picture' },
    postProfilePicture: { method: 'POST', endpoint: '/myprofile/picture' },
    getUserCars: { method: 'GET', endpoint: '/myprofile/cars' },
    getUserRentCars: { method: 'GET', endpoint: '/myprofile/rentcars' }
  }
});

export const {
  useGetProfilePictureQuery,
  usePostProfilePictureMutation,
  useGetUserCarsQuery,
  useGetUserRentCarsQuery
} = profileApi;
