# LearnHub - Online Course Platform

A modern, full-featured online course platform built with React, Next.js, React Router, Firebase Authentication, and the FakeStore API.

## Features

- **Multiple Pages with React Router**
  - Home page with hero section and featured courses
  - Courses page with search functionality
  - Dynamic course details page (using URL parameters)
  - Protected dashboard for enrolled students
  - Login and Register pages
  - 404 Not Found page

- **Firebase Authentication**
  - Email & Password authentication
  - Google Sign-In
  - GitHub Sign-In
  - Protected routes with automatic redirection
  - User profile management

- **API Integration**
  - Fetches course data from FakeStore API
  - Loading and error state handling
  - Dynamic course details with useParams hook
  - Search and filter functionality

- **Modern UI/UX**
  - Responsive design (mobile & desktop)
  - Clean, educational theme with blue color scheme
  - Reusable components (Header, Footer, Course Cards)
  - Progress tracking for enrolled courses
  - Professional dashboard with statistics

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created at [firebase.google.com](https://firebase.google.com)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a Firebase project and enable:
   - Email/Password authentication
   - Google authentication
   - GitHub authentication

4. Add environment variables to your Vercel project or `.env.local` file:
   \`\`\`
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/
│   ├── course/[id]/      # Dynamic course details page
│   ├── courses/          # All courses page
│   ├── dashboard/        # Protected dashboard
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── layout.tsx        # Root layout with AuthProvider
│   ├── page.tsx          # Home page
│   ├── not-found.tsx     # 404 page
│   └── globals.css       # Global styles and theme
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── course-card.tsx   # Reusable course card
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Footer component
│   └── protected-route.tsx # Route protection wrapper
├── contexts/
│   └── auth-context.tsx  # Firebase auth context
└── lib/
    └── firebase.ts       # Firebase configuration
\`\`\`

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Firebase** - Authentication (Email/Password, Google, GitHub)
- **FakeStore API** - Course data (products)
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **TypeScript** - Type safety

## API Integration

This project uses the [FakeStore API](https://fakestoreapi.com/) to simulate course data:

- List all courses: `https://fakestoreapi.com/products`
- Single course: `https://fakestoreapi.com/products/{id}`

In a production app, replace this with your own course API.

## Assignment Requirements Met

- ✅ Responsive design (mobile & desktop)
- ✅ Reusable components (Navbar, Footer, Cards)
- ✅ React Hooks (useState, useEffect, useContext)
- ✅ 5+ routes with React Router (Home, Login, Register, Courses, Course Details, Dashboard, 404)
- ✅ Private routes with authentication check
- ✅ Dynamic routing with URL parameters
- ✅ API integration with loading/error states
- ✅ Firebase Authentication (Email/Password, Google, GitHub)
- ✅ Protected routes redirecting to login
- ✅ User profile display after login

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your Firebase environment variables in Vercel project settings
4. Deploy!

## License

MIT
