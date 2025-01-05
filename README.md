# Weather App Backend
A backend service that fetches and serves weather data from public APIs with an optimized caching mechanism to reduce redundant requests and improve performance.

---

## Features
- Fetch real-time weather data from public APIs.
- Implement caching to optimize repeated requests.
- Serve data via a RESTful API.

---

## Tech Stack

### **Programming Language**
- **Node.js**

### **Framework**
- **Express.js**

### **APIs**
- **OpenWeatherMap API**
- **WeatherAPI**
- **AccuWeather API**

### **Databases**
- **Redis**: For caching weather data.
- **MongoDB** (optional): For storing user preferences or historical logs.

### **Libraries and Tools**
- **Axios**: For HTTP requests to weather APIs.
- **Node-Cache**: Lightweight in-memory caching.
- **ioredis**: Integration with Redis.
- **dotenv**: For managing environment variables.
- **Jest** or **Mocha/Chai**: For testing.
- **Node-Schedule** or **Agenda**: For scheduling periodic cache updates.

### **Hosting Platforms**
- **Render**
- **Railway**

### **Tools**
- **Postman**: For testing API endpoints.
- **Docker**: For containerizing the application.
- **Git**: For version control.

### **DevOps**
- **GitHub Actions**: For CI/CD.

---

## Getting Started

### **Prerequisites**
1. **Node.js**: Ensure you have Node.js installed. 
2. **Redis**: Install and configure Redis for caching.
3. **MongoDB** (optional): Install MongoDB if storing additional data is required.
4. **API Keys**: Obtain API keys from your chosen weather data provider(s):
   - [OpenWeatherMap](https://openweathermap.org/api)
   - [WeatherAPI](https://www.weatherapi.com/)
   - [AccuWeather](https://developer.accuweather.com/)

---

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your API keys and configurations:
     ```env
     PORT=3000
     REDIS_HOST=127.0.0.1
     REDIS_PORT=6379
     WEATHER_API_KEY=your_api_key_here
     ```

---

## Project File Structure
```
weather-api/
├── .dockerignore                   # Ignore file for Docker.
├── .env                            # Environment variables.
├── .gitignore                      # Files and folders to ignore in Git.
├── docker-compose.yml              # Docker Compose configuration file.
├── Dockerfile                      # Docker configuration.
├── index.js                        # Entry point of your application.
├── package.json                    # Project dependencies and scripts.
├── package-lock.json               # npm package lock file.
├── README.md                       # Project documentation.
│
├── src/                            # Source code directory.
│   ├── app.js                      # Initializes Express app.
│   ├── config/                     # Configuration files.
│   │   ├── redisConfig.js          # Redis configuration setup.
│   │   └── dbConfig.js             # MongoDB configuration setup.
│   ├── controllers/                # Controllers for handling logic.
│   │   ├── weatherController.js    # Handles weather-related logic.
│   │   └── authController.js       # Logic for handling user authentication.
│   ├── routes/                     # API route definitions.
│   │   ├── weatherRoutes.js        # Defines API routes for weather endpoints.
│   │   └── authRoutes.js           # Defines routes for authentication.
│   ├── services/                   # Services for external API calls and business logic.
│   │   ├── weatherService.js       # Handles API calls to weather providers.
│   │   └── authService.js          # Logic for user authentication and management.
│   ├── models/                     # Database models.
│   │   ├── User.js                 # User model.
│   │   └── Weather.js              # Weather data model.
│   ├── utils/                      # Utility functions and modules.
│   │   ├── cache.js                # Redis cache utility.
│   │   ├── logger.js               # Logging utility.
│   │   ├── errorHandler.js         # Error handling utility.
│   │   └── scheduler.js            # Manages periodic cache updates.
│
└── tests/                          # Test files for your application.
    ├── weather.test.js             # Unit tests for weather endpoints.
    └── auth.test.js                # Unit tests for authentication functionality.
```

---

## Usage
1. Start the Redis server.
2. Run the application:
   ```bash
   npm start
   ```
3. Test the endpoints using Postman or curl.

---

## API Endpoints

### **GET /weather**
Fetch weather data for a given location.
- **Query Parameters**:
  - `location` (string): The location for which weather data is requested.

---

## Testing
Run tests using Jest or Mocha:
```bash
npm test
```

---

## Deployment
1. **Render** or **Railway**: Deploy the app using the respective CLI tools.
2. Configure environment variables on the hosting platform.

---

## Contributions
Contributions are welcome! Please fork the repository and create a pull request.

---

## License
This project is licensed under the MIT License.

