# CAREERVERSE

### A University Career Guidance and Learning Platform

CAREERVERSE is a structured career-guidance platform designed to help first- and second-year B.Tech students understand career opportunities, explore technology domains, develop essential skills, and plan their four-year academic journey.

The platform delivers guided learning through nine chapters, interactive assessments, reflection activities, progress tracking, and administrator-managed content.

## Project Objectives

- Provide structured career guidance to university students.
- Help students understand technology domains and career pathways.
- Encourage skill development and practical learning.
- Introduce research, AI tools, and professional development opportunities.
- Track student learning progress.
- Give administrators control over learning content and activities.

## Target Audience

- First-year B.Tech students.
- Second-year B.Tech students.
- University administrators managing the programme.

**Initial deployment target:** Fewer than 50 students.

## Learning Chapters

1. The Master Strategy
2. The Four-Year Roadmap
3. Domains and Tools
4. Skills Mastery
5. Platforms That Build Your Proof
6. Research and AI
7. Experience and Visibility
8. Beyond Placements
9. Habits and Wrap-Up

Each chapter can include learning material, five single-answer MCQs, answer explanations, reflection polls, and timed activities.

## Core Features

### Student Portal
- Student entry using name, registration number, and event access code.
- Personalized student dashboard.
- Nine structured learning chapters.
- Chapter progress tracking.
- Interactive MCQ assessments.
- Answer explanations and reflection activities.
- Anonymous questions and feedback.
- Results and optional leaderboard.

### Administrator Portal
- Secure administrator access.
- Chapter release and locking controls.
- Activity opening and closing controls.
- Assessment timer management.
- Student response management.
- Question and feedback review.
- Results and leaderboard visibility controls.
- Student preview functionality.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 |
| Language | TypeScript |
| Development Server | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Routing | React Router |
| Backend | Google Apps Script |
| Live Database | Google Sheets |
| Master Content Authoring | Microsoft Excel (.xlsx) |
| Version Control | Git and GitHub |
| Development Tools | VS Code and Google Antigravity |

## Architecture

CAREERVERSE follows a lightweight architecture:

- React frontend for the student and administrator interfaces.
- Google Apps Script for backend operations and server-side validation.
- Google Sheets for live application data.
- Excel workbooks for preparing and maintaining master learning content.
- A typed frontend API service abstraction to separate UI components from backend implementation.

The frontend will initially use mock services during interface development. Google Apps Script integration will be introduced in a later development phase.

## Project Structure

```text
CAREERVERSE/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── chapters/
│   │   ├── activities/
│   │   └── admin/
│   ├── pages/
│   │   ├── auth/
│   │   ├── student/
│   │   └── admin/
│   ├── layouts/
│   ├── hooks/
│   ├── context/
│   ├── services/
│   │   ├── api/
│   │   └── mock/
│   ├── types/
│   ├── utils/
│   ├── data/
│   ├── App.tsx
│   └── main.tsx
├── docs/
├── .env.example
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following:

- Node.js (LTS version recommended).
- npm.
- Git.
- Visual Studio Code or Google Antigravity.

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd CAREERVERSE
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173/
```

### Available Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Security Principles

- Validate all important inputs on the backend.
- Enforce administrator permissions server-side.
- Never expose assessment answer keys in frontend code.
- Do not store administrator credentials in public frontend files.
- Restrict access to protected administrative operations.
- Treat registration number and event access code as programme-entry credentials, not strong identity verification.

## Development Roadmap

Development will follow these phases:

1. Project foundation and documentation.
2. Frontend foundation and design system.
3. Student entry and dashboard.
4. Nine chapters and learning activities.
5. Administrator dashboard.
6. Google Apps Script backend.
7. Google Sheets database integration.
8. Testing, security, and deployment.

Refer to `DEVELOPMENT_ROADMAP.md` for implementation details.

## Project Scope

CAREERVERSE is a university career-guidance and learning platform.

It is not intended to be:

- A job marketplace.
- A recruitment or applicant tracking system.
- A recruiter portal.
- A mentor-booking platform.
- A commercial job-search service.

The initial release focuses on the student learning experience and administrator-controlled programme delivery.

## Project Status

**Current Stage:** Project foundation and documentation.

Further development will proceed phase by phase, with version control and testing at each milestone.

## License

License and distribution terms will be defined before public release.