import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import ScrollToTop from './components/layout/ScrollToTop'
import AppLayout from './components/layout/AppLayout'
import LMSLayout from './components/layout/LMSLayout'
import { RequireAuth, RedirectIfAuthed } from './components/auth/RouteGuards'
import { ProfileProvider } from './contexts/ProfileContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { isAuthenticated } from './lib/auth'
import { OfflineBanner } from './components/system/OfflineBanner'

// Landing page stays eager: it is the public entry point and must paint immediately.
import LandingPage from './pages/LandingPage'

// Every other page is split into its own chunk and fetched on first visit.
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const CoursesPage = lazy(() => import('./pages/CoursesPage'))
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'))
const LMSPage = lazy(() => import('./pages/LMSPage'))
const ModuleViewerPage = lazy(() => import('./pages/ModuleViewerPage'))
const QuizEnginePage = lazy(() => import('./pages/QuizEnginePage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const ProblemPage = lazy(() => import('./pages/ProblemPage'))
const CourseChallengeIDEPage = lazy(() => import('./pages/CourseChallengeIDEPage'))
const CompetePage = lazy(() => import('./pages/CompetePage'))
const HackathonsPage = lazy(() => import('./pages/HackathonsPage'))
const ContestDetailPage = lazy(() => import('./pages/ContestDetailPage'))
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
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
    <div className="min-h-screen w-full bg-page flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="w-8 h-8 rounded-full border-2 border-line-strong border-t-strong/60 animate-spin" />
    </div>
  )
}

function RootPage() {
  return isAuthenticated() ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LandingPage />
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ProfileProvider>
        <SidebarProvider>
          <OfflineBanner />
          <Routes>
            {/* Public — the landing page decides for itself based on session */}
            <Route path={ROUTES.HOME} element={<RootPage />} />

            {/* Auth pages — pointless once a session exists, so bounce to the app */}
            <Route element={<RedirectIfAuthed />}>
              <Route
                path={ROUTES.LOGIN}
                element={<Suspense fallback={<RouteFallback />}><LoginPage /></Suspense>}
              />
              <Route
                path={ROUTES.SIGNUP}
                element={<Suspense fallback={<RouteFallback />}><SignupPage /></Suspense>}
              />
            </Route>

            {/* Everything below needs a session; RequireAuth bounces to /login */}
            <Route element={<RequireAuth />}>
              {/* Standalone — no app chrome */}
              <Route
                path="/practice/:problemId"
                element={<Suspense fallback={<RouteFallback />}><ProblemPage /></Suspense>}
              />

              {/* App chrome mounts once; only the outlet swaps */}
              {/* Chrome only — these pages manage their own width and background */}
              <Route element={<AppLayout variant="bare" />}>
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                <Route path={ROUTES.SETTINGS} element={<ProfileSettingsPage />} />
              </Route>

              <Route element={<AppLayout />}>
                <Route path={ROUTES.COURSES} element={<CoursesPage />} />
                <Route path="/courses/:courseId" element={<CourseDetailPage />} />
                <Route path={ROUTES.MASTERCLASSES} element={<MasterclassesPage />} />
                <Route path="/masterclasses/:masterclassId" element={<MasterclassDetailPage />} />

                <Route path={ROUTES.DAILY_CHALLENGE} element={<DailyChallengePage />} />

                <Route path={ROUTES.COMPETE} element={<CompetePage />} />
                <Route path={ROUTES.HACKATHONS} element={<HackathonsPage />} />
                <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
                <Route path="/compete/contests/:contestId" element={<ContestDetailPage />} />
                <Route path="/hackathons/:hackathonId" element={<HackathonDetailPage />} />

                <Route path={ROUTES.EVENTS} element={<EventsPage />} />
                <Route path={ROUTES.ARCADE} element={<ArcadePage />} />
              </Route>

              {/* Full-height, non-scrolling shell */}
              <Route element={<AppLayout variant="fixed" />}>
                {/* Dashboard needs a non-scrolling shell: its two columns own
                    their own scrollbars, and it reaches the viewport edge so
                    the activity rail can dock right like the sidebar docks
                    left. */}
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={ROUTES.PRACTICE} element={<PracticePage />} />
                <Route path={ROUTES.PLAYGROUND} element={<PlaygroundPage />} />
              </Route>

              {/* Standalone layout for LMS viewer */}
              <Route element={<LMSLayout />}>
                <Route path="/lms/:courseId" element={<LMSPage />} />
              </Route>
              
              {/* Standalone layout for Module Viewer */}
              <Route 
                path="/lms/:courseId/module/:moduleId" 
                element={<Suspense fallback={<RouteFallback />}><ModuleViewerPage /></Suspense>} 
              />
              <Route 
                path="/lms/:courseId/module/:moduleId/topic/:topicId" 
                element={<Suspense fallback={<RouteFallback />}><ModuleViewerPage /></Suspense>} 
              />

              {/* Standalone layout for Quiz Engine */}
              <Route 
                path="/lms/:courseId/quiz/:topicId" 
                element={<Suspense fallback={<RouteFallback />}><QuizEnginePage /></Suspense>} 
              />
              
              {/* Standalone layout for Course Challenges (IDE) */}
              <Route 
                path="/lms/:courseId/challenge/:challengeId" 
                element={<Suspense fallback={<RouteFallback />}><CourseChallengeIDEPage /></Suspense>} 
              />
            </Route>

            {/* Redirect old routes */}
            <Route path="/learn" element={<Navigate to={ROUTES.COURSES} replace />} />
            <Route path="/learn/:sectionId" element={<Navigate to={ROUTES.COURSES} replace />} />

            {/* Catch all. A silent redirect to "/" moved people without
                explaining anything — and for a signed-in user "/" redirects
                again to the dashboard, so a typo landed them somewhere they
                never asked for. */}
            <Route
              path="*"
              element={<Suspense fallback={<RouteFallback />}><NotFoundPage /></Suspense>}
            />
          </Routes>
        </SidebarProvider>
      </ProfileProvider>
    </Router>
  )
}

export default App
