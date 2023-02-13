const calculateWindDescription = (windSpeed: number) => {
  if (windSpeed < 1) {
    return "Calm";
  }
  if (windSpeed >= 1 && windSpeed < 5) {
    return "Light breeze";
  }
  if (windSpeed >= 5 && windSpeed < 10) {
    return "Gentle breeze";
  }
  if (windSpeed >= 10) {
    return "Strong wind";
  }
};

const calculateWindDirection = (windAngle: number) => {
  if (windAngle >= 337.5 || windAngle < 11.25) {
    return "N";
  }
  if (windAngle >= 11.25 && windAngle < 33.75) {
    return "NNE";
  }
  if (windAngle >= 33.75 && windAngle < 56.25) {
    return "NE";
  }
  if (windAngle >= 56.25 && windAngle < 78.75) {
    return "ENE";
  }
  if (windAngle >= 78.75 && windAngle < 101.25) {
    return "E";
  }
  if (windAngle >= 101.25 && windAngle < 123.75) {
    return "ESE";
  }
  if (windAngle >= 123.75 && windAngle < 146.25) {
    return "SE";
  }
  if (windAngle >= 146.25 && windAngle < 168.75) {
    return "SSE";
  }
  if (windAngle >= 168.75 && windAngle < 191.25) {
    return "S";
  }
  if (windAngle >= 191.25 && windAngle < 213.75) {
    return "SSW";
  }
  if (windAngle >= 213.75 && windAngle < 236.25) {
    return "SW";
  }
  if (windAngle >= 236.25 && windAngle < 258.75) {
    return "WSW";
  }
  if (windAngle >= 258.75 && windAngle < 281.25) {
    return "W";
  }
  if (windAngle >= 281.25 && windAngle < 303.75) {
    return "WNW";
  }
  if (windAngle >= 303.75 && windAngle < 326.25) {
    return "NW";
  }
  if (windAngle >= 326.25 && windAngle < 337.5) {
    return "NNW";
  }
};

const calculateWindArrow = (degree: number) => {
  if (degree >= 337.5 || degree < 22.5) {
    return "mdi-arrow-down-thick";
  } else if (degree >= 22.5 && degree < 67.5) {
    return "mdi-arrow-top-right-thick";
  } else if (degree >= 67.5 && degree < 112.5) {
    return "mdi-arrow-left-thick";
  } else if (degree >= 112.5 && degree < 157.5) {
    return "mdi-arrow-bottom-right-thick";
  } else if (degree >= 157.5 && degree < 202.5) {
    return "mdi-arrow-up-thick";
  } else if (degree >= 202.5 && degree < 247.5) {
    return "mdi-arrow-top-right-thick";
  } else if (degree >= 247.5 && degree < 292.5) {
    return "mdi-arrow-right-thick";
  } else if (degree >= 292.5 && degree < 337.5) {
    return "mdi-arrow-top-right-thick";
  }
};

export { calculateWindDescription, calculateWindDirection, calculateWindArrow };
