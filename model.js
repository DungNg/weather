class Weather {
  constructor() {
    this.latitude = "10.75";
    this.longitude = "106.75";
    this.generationtime_ms = "";
    this.utc_offset_seconds = "";
    this.timezone = "";
    this.timezone_abbreviation = "";
    this.elevation = "";
    this.current_weather = {
      temperature: "",
      weathercode: "",
      windspeed: "",
      winddirection: "",
      time: "",
    };
  }

  initFromObj(obj) {
    let output = new Weather();
    if (obj) {
      output.latitude = obj.latitude;
      output.longitude = obj.longitude;
      output.generationtime_ms = obj.generationtime_ms;
      output.utc_offset_seconds = obj.utc_offset_seconds;
      output.timezone = obj.timezone;
      output.timezone_abbreviation = obj.timezone_abbreviation;
      output.elevation = obj.elevation;
      output.current_weather = obj.current_weather;
    }
    return output;
  }
}
