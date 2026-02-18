# Quick Start Guide - HealthWell Platform

## 🚀 Getting Started

### Server Status
✅ **Development Server Running**
- URL: http://localhost:5173/
- Auto-reload enabled
- Hot module reloading active

### First Steps

1. **Open the Application**
   - Click the link above or navigate to http://localhost:5173/
   - You'll see the HealthWell homepage

2. **Login to Explore**
   - Click "Sign In" or navigate to `/login`
   - Choose a demo account:

#### Demo Credentials

**Admin Account** (Full Access)
```
Email: admin@university.edu
Password: demo
```

**Student Account** (Limited Access)
```
Email: student@university.edu
Password: demo
```

## 📱 Features to Explore

### As a Student:
1. **Browse Resources** (`/resources`)
   - View health and wellness articles
   - Search and filter by category
   - Mental Health, Fitness, Nutrition

2. **Join Programs** (`/programs`)
   - View available wellness programs
   - Enroll in programs
   - See enrollment status

3. **Get Support** (`/support`)
   - Find mental health services
   - Access crisis hotlines
   - View support resources

### As an Admin:
1. **Dashboard** (`/admin/dashboard`)
   - View usage analytics
   - See resource popularity
   - Monitor program engagement

2. **Manage Resources** (`/admin/resources`)
   - Create new health resources
   - Edit existing articles
   - Delete resources

3. **Manage Programs** (`/admin/programs`)
   - Create wellness programs
   - Update program details
   - Track enrollments

## 🎯 Common Actions

### Student Actions
```
1. Login as student@university.edu
2. Go to Resources → View/Search articles
3. Go to Programs → Enroll in a program
4. Go to Support → View services
5. Check nav bar for enrollment status
```

### Admin Actions
```
1. Login as admin@university.edu
2. Visit Dashboard → View metrics
3. Go to Manage Resources → Create/Edit/Delete
4. Go to Manage Programs → Manage programs
5. Monitor analytics in Dashboard
```

## 🔧 Development

### Available Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### File Locations
- **Pages**: `src/pages/`
- **Components**: `src/components/`
- **State**: `src/context/`
- **Types**: `src/types/`
- **Styles**: `src/index.css`

## 🎨 Customization

### Colors
Edit in `tailwind.config.js`:
- Primary (Sky Blue): Used for buttons, links, highlights
- Secondary (Purple): Used for accents

### Mock Data
Edit in `src/context/HealthContext.tsx`:
- Replace mock resources
- Update programs
- Modify services

### Pages Content
Each page in `src/pages/` can be customized:
- Update text and descriptions
- Modify layouts
- Add new sections

## 📊 Project Structure Overview

```
e:\SDP36/
├── src/
│   ├── components/          # Reusable UI parts
│   ├── context/             # State management
│   ├── pages/               # Full pages
│   ├── types/               # Type definitions
│   ├── api/                 # API setup
│   ├── App.tsx              # Main app
│   ├── main.tsx             # Entry point
│   └── index.css            # Styles
├── public/                  # Static files
├── index.html               # HTML template
├── vite.config.ts           # Vite config
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind config
└── package.json             # Dependencies
```

## 🔐 User Roles & Permissions

| Feature | Student | Admin |
|---------|---------|-------|
| View Resources | ✅ | ✅ |
| Create Resource | ❌ | ✅ |
| Edit Resource | ❌ | ✅ |
| Delete Resource | ❌ | ✅ |
| View Programs | ✅ | ✅ |
| Enroll in Program | ✅ | ❌ |
| Create Program | ❌ | ✅ |
| Edit Program | ❌ | ✅ |
| Delete Program | ❌ | ✅ |
| View Dashboard | ❌ | ✅ |
| View Metrics | ❌ | ✅ |

## 🐛 Troubleshooting

### Page Not Loading
- Check browser console (F12)
- Verify server is running
- Check URL is correct

### Styles Not Showing
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check Tailwind CSS is compiled

### Login Not Working
- Verify email format
- Check password field
- Use demo accounts provided

### Module Not Found Errors
- Check all imports use `@/` aliases
- Verify files exist in correct paths
- Restart dev server

## 📚 Learning Resources

### React
- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com)
- [Color Reference](https://tailwindcss.com/docs/customizing-colors)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Vite
- [Vite Guide](https://vite.dev/guide)

## 🚀 Next Steps

1. **Explore the Code**
   - Open files in `src/` directory
   - Understand component structure
   - Review state management

2. **Make Changes**
   - Edit components
   - Changes auto-reload
   - See updates instantly

3. **Add Features**
   - Create new pages
   - Add components
   - Extend state context

4. **Deploy**
   - Run `npm run build`
   - Deploy `dist/` folder
   - Works with any static host

## 💡 Tips

1. **Hot Reload**: Changes save instantly without page refresh
2. **DevTools**: Use React Developer Tools browser extension
3. **Types**: TypeScript catches errors before runtime
4. **Responsive**: Test with browser resize or mobile view
5. **Logout**: Click profile avatar to logout

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Review the IMPLEMENTATION_GUIDE.md
3. Check component files for examples
4. Refer to official documentation

---

**Happy coding! 🎉**

The HealthWell platform is ready for development and customization.
