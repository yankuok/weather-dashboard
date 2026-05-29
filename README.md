# 🌍 Weather Dashboard

A modern, responsive weather dashboard built with **React**, **TypeScript**, and the **Open-Meteo Free Weather API**.

## ✨ Features

- ✅ **Real-time Weather Data** - Current temperature, humidity, and wind speed
- ✅ **7-Day Forecast** - Daily predictions with high/low temperatures and precipitation
- ✅ **Location Search** - Search any city worldwide with autocomplete
- ✅ **Geolocation Support** - Auto-detect user's location (with fallback to New York)
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Free API** - Uses Open-Meteo with no authentication required
- ✅ **Weather Emojis** - Visual indicators for weather conditions
- ✅ **Error Handling** - Graceful fallbacks and user-friendly messages
- ✅ **TypeScript** - Fully typed for better development experience

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yankuok/weather-dashboard.git
cd weather-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx         # Location search with autocomplete
│   ├── WeatherCard.tsx       # Current weather display
│   ├── ForecastCard.tsx      # 7-day forecast grid
│   └── LoadingSpinner.tsx    # Loading state indicator
├── services/
│   └── weatherApi.ts         # API calls and weather utilities
├── types/
│   └── weather.ts            # TypeScript interfaces
├── App.tsx                   # Main application component
├── App.css                   # Global styles
└── index.tsx                 # React entry point
```

## 🌐 API Information

### Open-Meteo Weather API
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Authentication**: None required
- **Rate Limit**: Generous free tier
- **Documentation**: [open-meteo.com](https://open-meteo.com)

### Geocoding API
- **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
- **Purpose**: Convert city names to coordinates
- **Rate Limit**: Unlimited

## 🎨 Customization

### Change Default Location

In `src/App.tsx`, modify the fallback location:

```typescript
// Default to London instead of New York
fetchWeather(51.5074, -0.1278, "London");
```

### Update Gradient Background

In `src/App.css`, change the gradient:

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add More Weather Parameters

Edit `src/services/weatherApi.ts` to include additional data:

```typescript
current: "temperature_2m,wind_speed_10m,visibility"
```

## 🔧 Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### Weather data not loading
1. Check internet connection
2. Verify geolocation permissions in browser
3. Check browser console for API errors

### Location search not working
1. Ensure location name has at least 2 characters
2. Try using English city names
3. Check network tab for API responses

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙌 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Open-Meteo API](https://open-meteo.com/en/docs)
- [Create React App](https://create-react-app.dev)

---

**Developed with ❤️ by GitHub Copilot**