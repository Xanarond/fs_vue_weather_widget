export const getCurrentPosition: () => Promise<{
  lat: number;
  lon: number;
}> = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) =>
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      (error: GeolocationPositionError) => reject(error)
    );
  });
};
