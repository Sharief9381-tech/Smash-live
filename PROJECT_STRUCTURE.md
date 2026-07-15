# SmashLive Project Structure

/*
Purpose:
Used By:
Responsibilities:
*/

## 1. Architecture Overview

SmashLive is now organized into two clear parts:

- Client: everything the browser uses
- Server: everything the API and database use

This keeps the project easy to learn, easy to extend, and easy to explain in interviews.

## 2. Folder Responsibilities

### client/
The frontend application.

- assets/: static media such as images and logos
- components/: shared UI pieces used across many screens
- features/: business features such as auth, matches, tournaments, and profile
- pages/: route-level screens
- hooks/: reusable React hooks
- services/: API calls and browser-side integrations
- contexts/: global state providers
- store/: state management if needed later
- utils/: small helper functions
- types/: shared TypeScript types
- constants/: reusable values and labels
- styles/: global styling and theme files

### server/
The backend application.

- config/: environment and application configuration
- database/: MongoDB connection setup
- middlewares/: request validation and auth checks
- models/: MongoDB schemas
- controllers/: request handlers
- routes/: URL endpoints
- services/: business logic
- validations/: input validation rules
- sockets/: real-time socket handlers
- utils/: shared backend helpers

## 3. How to Create a New File

Create a new file when:

- one feature needs its own UI, hook, or API layer
- a file starts doing more than one job
- a shared helper is used in more than one place

### Rule of thumb

- Page file: one route screen
- Feature component: one reusable part of a feature
- Service file: one API or external system integration
- Model file: one MongoDB collection

## 4. How to Create a New Folder

Create a new folder when:

- a feature becomes large enough to have its own components, hooks, and services
- several files belong to the same domain
- the current folder is becoming crowded

Example:

- matches/ for all match-related pages and logic
- tournaments/ for everything tournament related
- profile/ for player profile experience

## 5. Data Flow

Browser
↓
React Page
↓
Component
↓
API Service
↓
Express Route
↓
Controller
↓
Service
↓
MongoDB Model
↓
Database

Responses return back through the same chain in reverse.

## 6. Authentication Flow

1. A user opens a login screen.
2. The frontend sends credentials to the auth service.
3. The server route calls the auth controller.
4. The controller uses the auth service and user model.
5. A token is created and returned.
6. The browser stores the token and uses it for protected requests.

## 7. API Request Flow

1. A page calls a service from the client.
2. The service sends a request to the server API.
3. The route receives the request.
4. The controller passes the task to a service.
5. The service uses the model to read or write data.
6. The response is returned to the client.

## 8. Socket.IO Flow

Socket.IO is used for real-time updates.

- The server creates a socket server.
- The client connects to the socket.
- Match events are emitted when the score or match state changes.
- Clients receive updates without reloading the page.

## 9. MongoDB Model Flow

- Each model maps to one collection in MongoDB.
- Controllers do not talk to the database directly.
- Services use the model.
- This keeps business logic separated from database details.

## 10. File Movement Plan

Old Location → New Location → Reason

- src/App.tsx → client/src/App.tsx → frontend entry point now lives in client/
- src/server.ts → server/src/server.ts → backend entry point now lives in server/
- src/pages/* → client/src/pages/* → route screens stay in the frontend
- src/controllers/* → server/src/controllers/* → backend logic belongs in server/
- src/models/* → server/src/models/* → database schemas belong in server/
- src/routes/* → server/src/routes/* → API endpoints belong in server/
- src/services/* → client/src/services/* for frontend services and server/src/services/* for backend services → split by responsibility

## 11. Files to Merge or Split

### Merge when:

- two utilities are doing the same job
- a feature has multiple tiny files that only support one screen
- helper logic is duplicated across pages

### Split when:

- a component becomes too long
- a controller grows beyond 150 lines
- a service becomes too crowded
- one file handles UI, data fetching, and formatting at once

## 12. Duplicate Code to Remove Later

Look for duplicate code in:

- toast handling
- auth/session storage
- repeated form layouts
- repeated match and score UI blocks

Keep one shared helper or shared component instead of copying logic.

## 13. Naming Improvements

Use simple, clear names such as:

- MatchCard.tsx
- LoginForm.tsx
- TournamentTable.tsx
- PlayerProfile.tsx

Avoid names like:

- MatchCardComponentNew.tsx
- CommonSharedHelper.ts
- UtilityFunctions.ts

## 14. Suggested Import Aliases

- @/* → client/src/*
- @/features/* → client/src/features/*
- @/services/* → client/src/services/*
- @/components/* → client/src/components/*

## 15. Beginner-Friendly Architectural Decisions

- Frontend and backend are separated so you can learn one side at a time.
- Features are grouped by business area so related code stays together.
- Pages are route-level screens, while features hold the logic behind each screen.
- Services keep API calls in one place.
- Models hold database rules in one place.
- This structure is simple, common, and easy to explain.
