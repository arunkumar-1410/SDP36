# HealthWell - Student Wellness Platform

A comprehensive web application providing access to health and wellness resources for students, including mental health support, fitness programs, and nutrition advice.

## Features

### For Students
- **Access Health Resources**: Browse and explore articles on mental health, fitness, and nutrition
- **Join Wellness Programs**: Enroll in expert-led fitness classes, mindfulness workshops, and wellness programs
- **Find Support Services**: Access 24/7 mental health support, counseling services, and crisis hotlines
- **Track Progress**: Monitor your wellness program enrollments and achievements

### For Administrators
- **Manage Resources**: Create, edit, and delete health and wellness articles
- **Manage Programs**: Add new programs, update schedules, and track participant enrollment
- **View Analytics**: Monitor platform usage metrics, track resource views, and program participation
- **Dashboard**: Get insights into resource popularity and program engagement

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── ResourceCard.tsx
│   ├── ProgramCard.tsx
│   ├── ServiceCard.tsx
│   └── ProtectedRoute.tsx
├── context/            # Global state management
│   ├── AuthContext.tsx
│   └── HealthContext.tsx
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   ├── ResourcesPage.tsx
│   ├── ProgramsPage.tsx
│   ├── SupportPage.tsx
│   ├── AdminDashboard.tsx
│   ├── ManageResources.tsx
│   └── ManagePrograms.tsx
├── types/              # TypeScript type definitions
├── api/                # API client configuration
├── App.tsx             # Main app component
├── main.tsx            # React DOM render
└── index.css           # Global styles
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm 8+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Demo Accounts

The application includes demo accounts for testing:

- **Admin Account**: `admin@university.edu` / `demo`
- **Student Account**: `student@university.edu` / `demo`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Authentication
- User login with role-based access control
- Two roles: Admin and Student
- Protected routes based on user role
- Persistent authentication using localStorage

### Health Resources
- Browse resources by category (Mental Health, Fitness, Nutrition)
- Search functionality
- Filter by category
- Resource cards with author and creation date information

### Wellness Programs
- View available programs with details
- Enroll in programs as a student
- Track participant enrollment
- Capacity management for programs

### Support Services
- Access mental health counseling services
- Crisis hotline information
- Chat support services
- Resource library

### Admin Features
- Dashboard with usage analytics
- Resource management (CRUD operations)
- Program management (CRUD operations)
- View resource popularity metrics
- Monitor program enrollment

## Styling

The application uses Tailwind CSS with a custom color scheme:
- **Primary Color**: Sky Blue (#0ea5e9)
- **Secondary Color**: Purple (#a78bfa)

All components are fully responsive and mobile-friendly.

## State Management

The application uses React Context API for state management:
- **AuthContext**: Manages user authentication and role
- **HealthContext**: Manages health resources, programs, services, and metrics

## Future Enhancements

- Backend API integration
- User profile management
- Progress tracking and reports
- Email notifications
- Payment integration for premium services
- Social features (comments, ratings)
- Mobile app version
- Advanced analytics and reporting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please contact the development team at support@healthwell.edu
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
