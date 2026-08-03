import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import ScrollToTop from './components/layout/ScrollToTop'
import AppLayout from './components/layout/AppLayout'
import { ProfileProvider } from './contexts/ProfileContext'
import { SidebarProvider } from './contexts/SidebarContext'

// Landing page stays eager: it is the public entry point and must paint immediately.
import LandingPage from './pages/LandingPage'

// Every other page is split into its own chunk and fetched on first visit.
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const CoursesPage = lazy(() => import('./pages/CoursesPage'))
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const ProblemPage = lazy(() => import('./pages/ProblemPage'))
const CompetePage = lazy(() => import('./pages/CompetePage'))
const HackathonsPage = lazy(() => import('./pages/HackathonsPage'))
const ContestDetailPage = lazy(() => import('./pages/ContestDetailPage'))
const HackathonDetailPage = lazy(() => import('./pages/HackathonDetailPage'))
const ArcadePage = lazy(() => import('./pages/ArcadePage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const ProfileSettingsPage = lazy(() => import('./pages/ProfileSettingsPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const SignupPage = lazy(() => import('./pages/auth/SignupPage'))
const MasterclassesPage = lazy(() => import('./pages/MasterclassesPage'))
const MasterclassDetailPage = lazy(() => import('./pages/MasterclassDetailPage'))
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'))
const DailyChallengePage = lazy(() => import('./pages/DailyChallengePage'))

function RouteFallback() {
  return (
    <div className="min-h-screen w-full bg-primary flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="w-8 h-8 rounded-full border-2 border-white/15 border-t-white/60 animate-spin" />
    </div>
  )
}

function RootPage() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LandingPage />
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ProfileProvider>
        <SidebarProvider>
          <Routes>
            {/* Standalone pages — no app chrome */}
            <Route path={ROUTES.HOME} element={<RootPage />} />
            <Route
              path={ROUTES.LOGIN}
              element={<Suspense fallback={<RouteFallback />}><LoginPage /></Suspense>}
            />
            <Route
              path={ROUTES.SIGNUP}
              element={<Suspense fallback={<RouteFallback />}><SignupPage /></Suspense>}
            />
            <Route
              path="/practice/:problemId"
              element={<Suspense fallback={<RouteFallback />}><ProblemPage /></Suspense>}
            />

            {/* App chrome mounts once; only the outlet swaps */}
            <Route element={<AppLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

              <Route path={ROUTES.COURSES} element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route path={ROUTES.MASTERCLASSES} element={<MasterclassesPage />} />
              <Route path="/masterclasses/:masterclassId" element={<MasterclassDetailPage />} />

              <Route path={ROUTES.DAILY_CHALLENGE} element={<DailyChallengePage />} />

              <Route path={ROUTES.COMPETE} element={<CompetePage />} />
              <Route path={ROUTES.HACKATHONS} element={<HackathonsPage />} />
              <Route path="/compete/contests/:contestId" element={<ContestDetailPage />} />
              <Route path="/compete/hackathons/:hackathonId" element={<HackathonDetailPage />} />

              <Route path={ROUTES.ARCADE} element={<ArcadePage />} />
            </Route>

            {/* Chrome only — these pages manage their own width and background */}
            <Route element={<AppLayout variant="bare" />}>
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.SETTINGS} element={<ProfileSettingsPage />} />
            </Route>

            {/* Full-height, non-scrolling shell */}
            <Route element={<AppLayout variant="fixed" />}>
              <Route path={ROUTES.PRACTICE} element={<PracticePage />} />
              <Route path={ROUTES.PLAYGROUND} element={<PlaygroundPage />} />
            </Route>

            {/* Redirect old routes */}
            <Route path="/learn" element={<Navigate to={ROUTES.COURSES} replace />} />
            <Route path="/learn/:sectionId" element={<Navigate to={ROUTES.COURSES} replace />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SidebarProvider>
      </ProfileProvider>
    </Router>
  )
}

export default App
