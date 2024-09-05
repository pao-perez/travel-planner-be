# Travel Planner API Documentation

## Overview

This API is part of the Travel Planner application and is built using the NestJS framework. It provides essential features like retrieving information about cities and fetching real-time weather data based on city names. This document covers how to interact with the API, set it up, and run it locally, along with key information about its structure and endpoints.

### Demo

- **Hosted Demo:** [Travel Planner Backend](https://travel-planner-be-80b3f4e26651.herokuapp.com/cities)

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14+)
- npm (v6+)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

### Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

### Environment Variables

The environment variables in `.env.*` files need to be replaced for the APIs to work:

```env
CLIENT_URI=your_hosting_uri or localhost
WEATHER_API_KEY=your_weather_api_key
```

- Replace `your_weather_api_key` with your actual API key from WeatherAPI.

### Scripts

Here are the available npm scripts defined in `package.json`:

- **Build**: Compiles the TypeScript code.
  ```bash
  npm run build
  ```
- **Start (Production)**: Starts the production server.
  ```bash
  npm run start
  ```
- **Start (Development)**: Starts the development server with live reloading.
  ```bash
  npm run start:dev
  ```
- **Test**: Run unit tests using Jest.
  ```bash
  npm run test
  ```
  - **Test**: Run end to end tests using Jest.
  ```bash
  npm run test:e2e
  ```
- **Test with Coverage**: Run unit tests and get a coverage report.
  ```bash
  npm run test:cov
  ```

### Running the Application

To run the application in development mode:

```bash
npm run start:dev
```

To run the application in production mode:

```bash
npm run start
```

## API Endpoints

### Cities

#### `GET /cities`

Fetches a list of all available cities.

- **Response**:
  ```json
  [
    {
    "name": "france-paris",
    "label": "Paris"
    },
    {
    "name": "japan-tokyo",
    "label": "Tokyo"
    },
    ...
  ]
  ```

#### `GET /cities/:name`

Fetches detailed information about a specific city, including its description.

- **Request Parameters**:

  - `name`: A unique identified in the format of `${country}-${city}` (e.g., `france-paris`).

- **Response**:
  ```json
  {
    "name": "france-paris",
    "label": "Paris",
    "description": "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture."
  }
  ```

### Weather

#### `GET /weather/:name`

Fetches the current weather information for a given city by name.

- **Request Parameters**:

  - `name`: A unique identified in the format of `${country}-${city}` (e.g., `unitedkingdom-london`).

- **Response**:
  ```json
  {
    "location": {
      "name": "London",
      "region": "City of London, Greater London",
      "country": "United Kingdom",
      "lat": 51.52,
      "lon": -0.11,
      "tz_id": "Europe/London",
      "localtime_epoch": 1725519870,
      "localtime": "2024-09-05 08:04"
    },
    "current": {
      "last_updated_epoch": 1725519600,
      "last_updated": "2024-09-05 08:00",
      "temp_c": 14.1,
      "temp_f": 57.4,
      "is_day": 1,
      "condition": {
        "text": "Moderate rain",
        "icon": "//cdn.weatherapi.com/weather/64x64/day/302.png",
        "code": 1189
      }
    }
  }
  ```

## Project Structure

The project is structured as follows:

```
src/
│
├── city/
│   ├── city.controller.ts    # Controller for handling city-related endpoints
│   ├── city.service.ts       # Service to manage city data
│   ├── dtos/
│   │   └── city.dto.ts       # DTO (Data Transfer Object) for cities
│
├── weather/
│   ├── weather.controller.ts # Controller for handling weather-related endpoints
│   ├── weather.service.ts    # Service to fetch weather data from external API
│   ├── dtos/
│   │   └── weather.dto.ts    # DTO for weather data
│
├── app.module.ts             # Main module where all modules are imported
└── main.ts                   # Application entry point
```

## Testing

The project includes tests written using Jest.

- To run tests:
  ```bash
  npm run test
  ```
- To run end to end tests:
  ```bash
  npm run test:e2e
  ```

## Dependencies

Here is a list of key dependencies used in the project:

- **NestJS**: The core framework for building the server.
- **Axios**: For making HTTP requests to external APIs.
- **Jest**: For running tests.
