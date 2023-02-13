import {
  calculateWindArrow,
  calculateWindDescription,
  calculateWindDirection,
} from "@/shared/api/openweather/lib/helpers";
import { getCurrentPosition } from "@/shared/api/openweather/lib/position";
import { instance } from "./api_instance";
export async function fetchCurrentWeather(city) {
  if (!city) {
    return getCurrentPosition()
      .then(async ({ lat, lon }) => {
        const coords_weather = await instance.get(
          `https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_APP_KEY}`
        );
        const coords_weather_onecall = await instance.get(
          `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VUE_APP_APP_KEY}`
        );
        const description = coords_weather.data.weather[0].description;
        const capitalizedDescription =
          description.charAt(0).toUpperCase() + description.slice(1);
        const weather_response = {
          city: coords_weather.data.name,
          country: coords_weather.data.sys.country,
          temperature: Math.round(coords_weather.data.main.temp),
          feels: Math.round(coords_weather.data.main.feels_like),
          weather: {
            main: String(coords_weather.data.weather[0].main),
            description: String(capitalizedDescription),
          },
          wind_info: {
            speed: Number(coords_weather.data.wind.speed).toFixed(1),
            deg: coords_weather.data.wind.deg,
          },
          wind_description: calculateWindDescription(
            Math.round(coords_weather.data.wind.speed)
          ),
          wind_direction: calculateWindDirection(coords_weather.data.wind.deg),
          wind_arrow: calculateWindArrow(coords_weather.data.wind.deg),
          pressure: coords_weather.data.main.pressure,
          humidity: coords_weather.data.main.humidity,
          visibility: (Number(coords_weather.data.visibility) / 1000).toFixed(
            1
          ),
          image_url: `https://openweathermap.org/img/wn/${coords_weather.data.weather[0].icon}@2x.png`,
          dew_point: Math.round(coords_weather_onecall.data.current.dew_point),
        };
        return weather_response;
      })
      .catch((error) => console.error(error));
  } else {
    const city_weather = await instance.get(
      `https://openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_APP_KEY}&units=metric`
    );
    const response_2 = await instance.get(
      `https://openweathermap.org/data/2.5/onecall?lat=${city_weather.data.coord.lat}&lon=${city_weather.data.coord.lon}&units=metric&appid=${process.env.VUE_APP_APP_KEY}`
    );
    const description = city_weather.data.weather[0].description;
    const capitalizedDescription =
      description.charAt(0).toUpperCase() + description.slice(1);
    return {
      city: city_weather.data.name,
      country: city_weather.data.sys.country,
      temperature: Math.round(city_weather.data.main.temp),
      feels: Math.round(city_weather.data.main.feels_like),
      weather: {
        main: String(city_weather.data.weather[0].main),
        description: String(capitalizedDescription),
      },
      wind_info: {
        speed: Number(city_weather.data.wind.speed).toFixed(1),
        deg: city_weather.data.wind.deg,
      },
      wind_description: calculateWindDescription(
        Math.round(city_weather.data.wind.speed)
      ),
      wind_direction: calculateWindDirection(city_weather.data.wind.deg),
      wind_arrow: calculateWindArrow(city_weather.data.wind.deg),
      pressure: city_weather.data.main.pressure,
      humidity: city_weather.data.main.humidity,
      visibility: (Number(city_weather.data.visibility) / 1000).toFixed(1),
      image_url: `https://openweathermap.org/img/wn/${city_weather.data.weather[0].icon}@2x.png`,
      dew_point: Math.round(response_2.data.current.dew_point),
    };
  }
}
//# sourceMappingURL=openweather.js.map
