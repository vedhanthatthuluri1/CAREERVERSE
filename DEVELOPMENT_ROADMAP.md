# CAREERVERSE — Development Roadmap

**Document Version:** 1.0.0  
**Status:** Initial Development Baseline  
**Project:** University Career Guidance Platform  
**Execution Model:** Phased Development  
**Date:** November 2026

---

## 1. Roadmap Overview

CAREERVERSE will be developed in eight phases.

The development strategy prioritizes a stable frontend foundation, student experience, administrator controls, backend integration, security, and deployment.

### Technology Baseline

- Frontend: React 19, TypeScript, Vite.
- Styling: Tailwind CSS.
- Icons: Lucide React.
- Routing: React Router.
- Backend: Google Apps Script.
- Live database: Google Sheets.
- Content authoring: Microsoft Excel (.xlsx).
- Version control: Git and GitHub.
- Development environment: VS Code and Google Antigravity.

## 2. Development Phases

### Phase 0 — Project Foundation and Documentation

**Objective:** Establish the project structure and technical specifications.

Tasks:
- Initialize the React and TypeScript application.
- Configure Vite.
- Configure Tailwind CSS.
- Install Lucide React and React Router.
- Establish the folder structure.
- Configure Git and GitHub.
- Finalize project documentation.
- Define frontend types and API contracts.
- Establish the visual design system.

Deliverables:
- Running frontend application.
- Verified project structure.
- Architecture documentation.
- Database schema documentation.
- Development roadmap.

Acceptance criteria:
- Application runs locally.
- Dependencies install successfully.
- Git repository is initialized.
- Documentation matches the approved architecture.

### Phase 1 — Frontend Foundation and Design System

**Objective:** Build reusable interface components and application layouts.

Tasks:
- Create global typography and color tokens.
- Build reusable buttons, cards, inputs, badges, dialogs, and navigation components.
- Create responsive layouts.
- Configure application routing.
- Build loading, empty, error, and success states.
- Create typed API service interfaces.
- Implement mock API services for frontend development.

Deliverables:
- Reusable component library.
- Responsive application layout.
- Navigation structure.
- Mock API integration.

Acceptance criteria:
- Components render consistently.
- Navigation works.
- Desktop and mobile layouts are usable.
- Frontend can operate using mock data.

### Phase 2 — Student Entry and Dashboard

**Objective:** Build the student-facing application.

Tasks:
- Create student entry screen.
- Collect student name and registration number.
- Validate event access code through the API.
- Create student dashboard.
- Display chapter availability.
- Display progress indicators.
- Create student navigation.
- Add loading and error handling.

Deliverables:
- Student entry page.
- Student dashboard.
- Chapter navigation.
- Student session interface.

Acceptance criteria:
- Student entry flow works with mock services.
- Dashboard displays the correct student information.
- Locked chapters cannot be accessed through the interface.

### Phase 3 — Nine Chapters and Learning Activities

**Objective:** Implement the complete learning experience.

Tasks:
- Build the chapter overview page.
- Create chapter content pages.
- Add all nine approved chapter titles.
- Create MCQ assessment components.
- Support five single-answer MCQs per chapter.
- Display answer explanations.
- Build reflection polls.
- Implement activity countdown interfaces.
- Add anonymous question submission.
- Add feedback submission.
- Display assessment results.
- Track chapter progress.

Deliverables:
- Nine chapter interfaces.
- MCQ assessment system.
- Reflection poll interface.
- Anonymous question interface.
- Feedback interface.
- Progress tracking interface.

Acceptance criteria:
- All nine chapters are accessible according to release settings.
- MCQ options are selectable.
- Assessment results are displayed correctly.
- Activities reflect their open or closed state.
- Progress indicators update correctly.

### Phase 4 — Administrator Dashboard

**Objective:** Build administrative management functionality.

Tasks:
- Create administrator login interface.
- Create protected administrator dashboard.
- Display student participation statistics.
- Build chapter release and locking controls.
- Build activity open and close controls.
- Add timer configuration.
- Build question management interface.
- Add response review.
- Add anonymous question review.
- Add feedback review.
- Display results and progress.
- Add leaderboard visibility controls.
- Build student preview mode.

Deliverables:
- Administrator authentication interface.
- Admin dashboard.
- Chapter management.
- Activity management.
- Response management.
- Results management.

Acceptance criteria:
- Admin pages are protected.
- Administrative controls update the interface.
- Student preview displays the student experience.
- Administrative operations are recorded where required.

### Phase 5 — Google Apps Script Backend

**Objective:** Implement backend functionality and authorization.

Tasks:
- Create the Google Apps Script project.
- Configure application entry points.
- Implement request routing.
- Implement student access validation.
- Implement administrator authentication and authorization.
- Implement chapter retrieval.
- Implement question retrieval.
- Implement answer verification.
- Implement assessment scoring.
- Implement activity submission.
- Implement feedback and anonymous question handling.
- Implement progress calculations.
- Implement administrator management operations.
- Add structured error responses.

Deliverables:
- Apps Script backend.
- Typed API integration contract.
- Authentication and authorization logic.
- Server-side validation.
- Business logic.

Acceptance criteria:
- Requests are validated on the server.
- Student and administrator permissions are enforced.
- Scores are calculated on the server.
- Correct answers are never exposed through student-facing requests.

### Phase 6 — Google Sheets Database Integration

**Objective:** Connect the backend to the live database.

Required worksheets:

1. Students
2. Admins
3. Chapters
4. Questions
5. Options
6. Activities
7. Responses
8. Progress
9. Questions_Inbox
10. Feedback
11. Settings
12. Audit_Log

Tasks:
- Create the Google Sheets workbook.
- Add the required worksheet headers.
- Implement database initialization.
- Implement record creation and retrieval.
- Implement record updates.
- Generate unique record identifiers.
- Implement timestamp management.
- Add data validation.
- Import approved content from Excel.
- Test data consistency.

Deliverables:
- Initialized Google Sheets database.
- Apps Script database-access functions.
- Content import process.
- Verified data integration.

Acceptance criteria:
- Required worksheets exist.
- Backend reads and writes records correctly.
- Existing data is not erased during initialization.
- Database records maintain consistent identifiers.

### Phase 7 — Testing, Security, and Deployment

**Objective:** Prepare CAREERVERSE for the university event.

Tasks:
- Test student entry.
- Test chapter access.
- Test assessments and scoring.
- Test activity timers.
- Test anonymous questions and feedback.
- Test administrator operations.
- Test permissions and authorization.
- Verify answer-key protection.
- Test responsive layouts.
- Test expected concurrent usage.
- Fix critical defects.
- Configure frontend hosting.
- Deploy Google Apps Script as a Web App.
- Configure production settings.
- Perform a final event-readiness check.

Deliverables:
- Tested application.
- Deployed frontend.
- Deployed Apps Script backend.
- Connected Google Sheets database.
- Deployment documentation.

Acceptance criteria:
- Student and administrator workflows operate correctly.
- Unauthorized requests are rejected.
- Student answer keys remain protected.
- Application works on desktop and mobile.
- Event deployment is ready.

---

## 3. Development Order

Follow this sequence:

1. Complete project documentation.
2. Verify frontend configuration.
3. Build reusable UI components.
4. Build student entry and dashboard.
5. Build the nine learning chapters.
6. Build assessments and activities.
7. Build administrator interfaces.
8. Implement Google Apps Script.
9. Connect Google Sheets.
10. Test security and application workflows.
11. Deploy and validate the production application.

## 4. Development Rules

- Follow the approved project architecture.
- Use TypeScript for frontend code.
- Keep UI components reusable.
- Keep business logic outside presentation components.
- Use typed API service abstractions.
- Start with mock data and replace it with Apps Script integration.
- Validate all sensitive operations on the backend.
- Never expose answer keys or administrator credentials.
- Use Git commits at meaningful milestones.
- Do not add features outside the approved initial scope without a documented decision.

## 5. Scope Restrictions

The initial release does not include:

- Job marketplace.
- Recruiter portal.
- Applicant tracking system.
- Resume builder.
- Mentor booking.
- Job application tracking.
- Separate Node.js or Python backend.
- Firebase, Supabase, MongoDB, PostgreSQL, or Redis.

Google Apps Script and Google Sheets remain the approved backend and database.

---

**Final Milestone:** Deliver a secure, responsive university career guidance platform with nine learning chapters, interactive assessments, student progress tracking, and administrator event controls.