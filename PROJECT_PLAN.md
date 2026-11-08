# CAREERVERSE — Project Plan

**Project Type:** University Career Guidance and Learning Platform  
**Target Audience:** First- and second-year B.Tech students  
**Initial Users:** Fewer than 50 students  
**Version:** 1.0.0  
**Status:** Initial Release Specification  
**Date:** November 2026

## 1. Project Overview

CAREERVERSE is a university-focused career guidance web application designed to help students understand career opportunities, explore technology domains, develop relevant skills, and plan their professional growth.

The initial release is designed for a university career guidance event. Students access nine structured learning chapters containing educational content, MCQ assessments, reflection polls, and interactive activities.

The platform also provides an administrator dashboard to manage chapters, activities, questions, responses, and event settings.

CAREERVERSE is an educational guidance platform, not a job marketplace or recruitment management system.

## 2. Problem Statement

Students in the early years of engineering often face difficulties understanding:

- Career opportunities available after B.Tech.
- Technology domains and their associated tools.
- Skills required for different career paths.
- How to build practical projects and demonstrate their abilities.
- How research, artificial intelligence, and industry experience contribute to career development.
- How to create a realistic four-year development roadmap.

CAREERVERSE addresses these challenges through structured learning, interactive assessments, progress tracking, and guided career exploration.

## 3. Project Objectives

1. Introduce students to different technology domains and career pathways.
2. Explain the four-year B.Tech career development journey.
3. Help students understand technical and professional skills.
4. Introduce useful learning, development, and portfolio platforms.
5. Explain research and responsible AI usage.
6. Encourage practical experience and professional visibility.
7. Promote consistent learning habits and career planning.
8. Measure student participation and learning progress.
9. Provide administrators with centralized event management.

## 4. Target Users

### Student

Students can:

- Enter the platform using their name, registration number, and event access code.
- Access released learning chapters.
- Complete MCQ assessments.
- View explanations after answering questions.
- Participate in reflection polls.
- Submit anonymous questions.
- Provide feedback.
- Track chapter completion and assessment results.
- View the leaderboard when enabled by an administrator.

### Administrator

Administrators can:

- Log in through a protected administrator interface.
- View student participation.
- Release or lock chapters.
- Open or close activities.
- Configure activity countdown timers.
- Manage assessment questions and options.
- Review student responses.
- Review anonymous questions and feedback.
- View student progress and results.
- Control leaderboard visibility.
- Preview the platform from a student perspective.

## 5. Learning Structure — Nine Chapters

1. **The Master Strategy** — Understanding career planning and long-term professional development.
2. **The Four-Year Roadmap** — Planning academic and technical growth throughout B.Tech.
3. **Domains and Tools** — Exploring software development, AI/ML, cybersecurity, cloud, DevOps, and other technology domains.
4. **Skills Mastery** — Understanding programming, problem-solving, communication, and professional skills.
5. **Platforms That Build Your Proof** — Exploring GitHub, developer platforms, certifications, and project portfolios.
6. **Research and AI** — Understanding research fundamentals, artificial intelligence, and responsible AI tools.
7. **Experience and Visibility** — Learning about internships, projects, hackathons, competitions, and professional presence.
8. **Beyond Placements** — Exploring higher education, entrepreneurship, research careers, and alternative professional pathways.
9. **Habits and Wrap-Up** — Building productive learning habits and creating an actionable career development plan.

## 6. Core Functional Requirements

### Student Application

- Student entry and access-code validation.
- Student dashboard.
- Nine-chapter learning interface.
- Chapter availability and completion indicators.
- Five single-answer MCQs per chapter.
- Answer explanations.
- Reflection polls.
- Activity countdown timers.
- Anonymous question submission.
- Feedback submission.
- Progress and result tracking.
- Optional leaderboard.

### Administrator Application

- Protected administrator login.
- Administrator dashboard.
- Chapter release and locking controls.
- Activity management.
- Timer configuration.
- Question and option management.
- Response and feedback review.
- Student progress monitoring.
- Results management.
- Leaderboard visibility controls.
- Student preview.

## 7. Assessment Requirements

Each chapter contains five single-answer multiple-choice questions.

The assessment system must:

- Display available answer options.
- Accept one answer per question.
- Validate submissions on the server.
- Calculate scores on the server.
- Provide explanations after answering.
- Record assessment responses.
- Prevent unauthorized access to answer keys.
- Support configurable activity timers.

Reflection polls are separate from scored MCQ assessments.

## 8. Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- React Router

### Backend

- Google Apps Script

### Live Database

- Google Sheets

### Content Authoring

- Microsoft Excel (.xlsx)

### Development and Version Control

- Visual Studio Code
- Google Antigravity
- Git
- GitHub

### Deployment

- Static frontend hosting.
- Google Apps Script Web App deployment.

## 9. System Architecture

The application follows a frontend-and-serverless-backend architecture.

The React frontend communicates with Google Apps Script through a typed API service abstraction.

Google Apps Script handles:

- Authentication and authorization.
- Input validation.
- Business logic.
- Database operations.
- Assessment scoring.
- Progress updates.
- Administrative actions.

Google Sheets stores the application's live records.

The frontend initially uses mock data for development. The Apps Script adapter will be integrated after the interface and API contracts are established.

## 10. Security Requirements

- Validate all incoming requests on the server.
- Enforce student and administrator permissions on the server.
- Never expose administrator credentials in frontend code.
- Never send assessment answer keys to student-facing requests.
- Validate event access codes on the backend.
- Restrict administrator operations to authorized sessions.
- Record important administrative actions.
- Minimize collection of personal information.
- Avoid trusting frontend role values or score calculations.

**Important:** Registration number and event access code provide basic event access, not strong identity verification.

## 11. Project Constraints

The initial release will use Google Sheets as its live database and Google Apps Script as its backend.

The project will not introduce:

- Firebase
- Supabase
- MongoDB
- PostgreSQL
- Redis
- Express.js backend
- Separate Python backend
- Recruiter portals
- Job marketplaces
- Applicant tracking systems
- Mentor booking systems
- Direct job applications

These exclusions keep the initial release focused on university career guidance and event management.

## 12. Expected Outcomes

- A functional student-facing career guidance platform.
- Nine structured learning chapters.
- Interactive assessments and reflection activities.
- Student progress and result tracking.
- An administrator dashboard.
- Centralized event content and response management.
- A reusable foundation for future university career guidance events.

## 13. Success Criteria

The initial release will be considered successful when:

1. Students can enter the platform successfully.
2. Students can access released chapters.
3. Assessments and polls work correctly.
4. Responses are stored in Google Sheets.
5. Scores and progress are calculated correctly.
6. Administrators can manage chapters and activities.
7. Unauthorized administrative operations are rejected.
8. Assessment answer keys remain protected.
9. The application works on desktop and mobile devices.

---

**Architecture Decision:** CAREERVERSE is a university career guidance and learning platform. React and TypeScript provide the frontend, Google Apps Script provides the backend, and Google Sheets serves as the live database. Excel remains the master content-authoring format.