export type WeatherModel = {
  city: string;
  country: string;
  feels: number;
  visibility: string;
  temperature: number;
  weather: { main: string; description: string };
  wind_info: { speed: string; deg: number };
  wind_description?: string;
  wind_direction?: string;
  wind_arrow?: string;
  humidity: number;
  dew_point: number;
  pressure: number;
  image_url: string;
};
