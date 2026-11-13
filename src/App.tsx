
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Public Pages
const PublicHome = lazy(() => import('./pages/PublicHome'))
const PortalSelection = lazy(() => import('./pages/PortalSelection'))

// Admin Portal
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const StudentManagement = lazy(() => import('./pages/admin/StudentManagement'))
const StudentProfile = lazy(() => import('./pages/admin/StudentProfile'))
const StudentAnalytics = lazy(() => import('./pages/admin/StudentAnalytics'))

// Student Authentication
const StudentLogin = lazy(() => import('./pages/auth/StudentLogin'))
const LiveRegistration = lazy(() => import('./pages/auth/LiveRegistration'))

// Student Dashboard
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'))

// Chapter 1
const ChapterOne = lazy(() => import('./pages/student/ChapterOne'))
const ChapterOneQuiz = lazy(() => import('./pages/student/ChapterOneQuiz'))

// Chapter 2
const ChapterTwo = lazy(() => import('./pages/student/ChapterTwo'))
const ChapterTwoQuiz = lazy(() => import('./pages/student/ChapterTwoQuiz'))

// Chapter 3
const ChapterThree = lazy(() => import('./pages/student/ChapterThree'))
const ChapterThreePoll = lazy(() => import('./pages/student/ChapterThreePoll'))

// Chapter 4
const ChapterFour = lazy(() => import('./pages/student/ChapterFour'))
const ChapterFourAssessment = lazy(() => import('./pages/student/ChapterFourAssessment'))

// Chapters 5–9
const ChapterFive = lazy(() => import('./pages/student/ChapterFive'))
const ChapterSix = lazy(() => import('./pages/student/ChapterSix'))
const ChapterSeven = lazy(() => import('./pages/student/ChapterSeven'))
const ChapterEight = lazy(() => import('./pages/student/ChapterEight'))
const ChapterNine = lazy(() => import('./pages/student/ChapterNine'))

// Loading Screen
function PageLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700 shadow-sm">
          <span className="absolute h-full w-full animate-ping rounded-2xl bg-blue-200/40 opacity-75" />
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-700 border-t-transparent" />
        </div>

        <div className="mt-5">
          <p className="text-base font-bold tracking-tight text-blue-700">
            CAREERVERSE
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Loading learning environment...
          </p>
        </div>
      </div>
    </div>
  )
}

// Main Application
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>

          {/* Public Homepage */}
          <Route path="/" element={<PublicHome />} />

          {/* Portal Selection */}
          <Route path="/portals" element={<PortalSelection />} />

          {/* Admin Portal */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentManagement />} />

          <Route
            path="/admin/students/:studentId"
            element={<StudentProfile />}
          />

          <Route
            path="/admin/analytics"
            element={<StudentAnalytics />}
          />

          {/* Student Authentication */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/live/register" element={<LiveRegistration />} />

          {/* Student Dashboard */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          {/* Chapter 1 */}
          <Route path="/student/chapter/1" element={<ChapterOne />} />
          <Route path="/student/chapter/1/quiz" element={<ChapterOneQuiz />} />

          {/* Chapter 2 */}
          <Route path="/student/chapter/2" element={<ChapterTwo />} />
          <Route
            path="/student/chapter/2/quiz/:quizId"
            element={<ChapterTwoQuiz />}
          />

          {/* Chapter 3 */}
          <Route path="/student/chapter/3" element={<ChapterThree />} />
          <Route path="/student/chapter/3/poll" element={<ChapterThreePoll />} />

          {/* Chapter 4 */}
          <Route path="/student/chapter/4" element={<ChapterFour />} />
          <Route
            path="/student/chapter/4/assessment"
            element={<ChapterFourAssessment />}
          />

          {/* Chapters 5–9 */}
          <Route path="/student/chapter/5" element={<ChapterFive />} />
          <Route path="/student/chapter/6" element={<ChapterSix />} />
          <Route path="/student/chapter/7" element={<ChapterSeven />} />
          <Route path="/student/chapter/8" element={<ChapterEight />} />
          <Route path="/student/chapter/9" element={<ChapterNine />} />

          {/* Unknown Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
