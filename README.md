# Mango-yield-Prediction-and-agri-waste-management

Mango yield prediction and the Agriculture upcycling waste management system.

## Features

- **Yield Prediction**: AI-powered mango yield prediction based on weather, climate, and soil conditions
- **Waste Management**: Convert agricultural waste into valuable resources and connect with local buyers
- **User Authentication**: Secure login and registration system
- **Interactive Maps**: Location-based industry connections for waste management
- **Real-time Weather**: Weather data integration for accurate predictions

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL (configurable)
- **ML Model**: Scikit-learn for yield prediction
- **Maps**: Folium integration
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=farm2value_db
OPENWEATHER_API_KEY=your_openweather_api_key
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Additional styles
```

## Deployment

The app is configured for deployment on Vercel with automatic deployments from the main branch.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
