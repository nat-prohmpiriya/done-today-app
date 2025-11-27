# DoneToday - App Specification

> "What you'll get done today"

## Overview

DoneToday is a minimalist PWA task management app focused on daily productivity. Tasks that are not completed automatically roll over to the next day.

---

## Why DoneToday? (vs Google Calendar)

| Aspect | Google Calendar | DoneToday |
|--------|-----------------|-----------|
| **Focus** | Time-based (When?) | Task-based (What?) |
| **Unit** | Events with start/end time | Tasks without fixed time |
| **View** | Calendar (day/week/month) | Today's list + Priority Matrix |
| **Incomplete tasks** | Disappear / manual move | **Auto rollover** |
| **Priority** | None | 4-quadrant Matrix |
| **Routine** | Recurring events (fixed time) | Flexible routines (no time required) |

### Use Cases

| Use Google Calendar for | Use DoneToday for |
|-------------------------|-------------------|
| Meeting at 10:00 AM | Prepare slides before meeting |
| Doctor appointment 2 PM | Book doctor appointment |
| Flight at 6 PM | Pack luggage |

**Key Insight:**
- Google Calendar = Appointments with fixed time
- DoneToday = Things to get done (time-flexible)

### DoneToday Advantages

| Feature | Benefit |
|---------|---------|
| Auto Rollover | Never lose incomplete tasks |
| No time required | Less pressure, more flexibility |
| Matrix Priority | See what's truly important |
| Focus on "Today" | No overwhelm from future tasks |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | SvelteKit |
| Styling | Tailwind CSS |
| Language | TypeScript |
| PWA | vite-plugin-pwa |
| Local Storage | IndexedDB (via `idb` library) |
| Cloud Storage | Firebase Firestore |
| Authentication | Firebase Auth |
| Hosting | Firebase Hosting (optional) |

---

## App Structure

### Navigation (Bottom Nav - 4 items)

```
+------------------------------------------+
|      ⚡        🎯        ✅        👤     |
|      Do       Goal      Done    Account  |
+------------------------------------------+
```

| Page | Icon | Description |
|------|------|-------------|
| Do | ⚡ | Today's tasks + add new task input |
| Goal | 🎯 | Matrix (4 quadrants) + Routine management |
| Done | ✅ | Completed tasks history (grouped by date) |
| Account | 👤 | Profile, settings, backup, logout |

---

## Pages Specification

### 1. Do Page (Home)

**Purpose:** Show and manage today's tasks

**Layout:**
```
+------------------------------------------+
|  ⚡ DO                          [date]   |
|  ------------------------------------    |
|  +----------------------------------+    |
|  | + Add task for today...          |    |
|  +----------------------------------+    |
|                                          |
|  [ ] Task 1                              |
|  [ ] Task 2 (rolled over)                |
|  [x] Task 3 (completed)                  |
|                                          |
+------------------------------------------+
```

**Features:**
- Input field to add new tasks (at top)
- List of today's tasks
- Tap to mark complete/incomplete
- Swipe to delete (optional)
- Visual indicator for rolled-over tasks
- Completed tasks shown with strikethrough
- Tasks from Routine appear automatically

---

### 2. Goal Page (Matrix + Routine)

**Purpose:** Organize tasks using Eisenhower Matrix AND manage recurring routines

**Layout (with Tabs):**
```
+------------------------------------------+
|  🎯 GOAL                                 |
|  ------------------------------------    |
|                                          |
|  [Matrix]  [Routine]     <- Tab switch   |
|                                          |
+------------------------------------------+
```

#### Tab 1: Matrix

```
+------------------------------------------+
|    +---------------+---------------+     |
|    | 🔥 DO FIRST   | 📅 SCHEDULE   |     |
|    | Urgent +      | Important     |     |
|    | Important     | Not Urgent    |     |
|    |               |               |     |
|    | - Task A      | - Task C      |     |
|    | - Task B      |               |     |
|    +---------------+---------------+     |
|    | ⚡ DELEGATE   | 🗑️ ELIMINATE  |     |
|    | Urgent        | Not Urgent    |     |
|    | Not Important | Not Important |     |
|    |               |               |     |
|    | - Task D      | - Task E      |     |
|    +---------------+---------------+     |
+------------------------------------------+
```

**Matrix Quadrants:**

| Quadrant | Name | Criteria | Action |
|----------|------|----------|--------|
| Q1 | DO FIRST | Urgent + Important | Do today (appears in Do page) |
| Q2 | SCHEDULE | Important, Not Urgent | Plan for later |
| Q3 | DELEGATE | Urgent, Not Important | Quick tasks |
| Q4 | ELIMINATE | Not Urgent, Not Important | Consider removing |

**Matrix Features:**
- Drag and drop tasks between quadrants
- Add task directly to any quadrant
- Tasks in Q1 (DO FIRST) automatically appear in Do page
- Tap task to edit

#### Tab 2: Routine

```
+------------------------------------------+
|                                          |
|  + Add routine...                        |
|                                          |
|  +-----------------------------------+   |
|  | [x] Exercise              Daily   |   |
|  | [x] Team meeting          Mon     |   |
|  | [x] Weekly review         Fri     |   |
|  | [x] Pay bills             1st     |   |
|  | [x] Gym                   M/W/F   |   |
|  +-----------------------------------+   |
|                                          |
+------------------------------------------+
```

**Routine Frequency Options:**

| Frequency | Example | Description |
|-----------|---------|-------------|
| Daily | Every day | Runs every day |
| Weekly | Mon / Tue / etc. | Specific day of week |
| Custom Days | M/W/F | Multiple days of week (e.g., Mon, Wed, Fri) |
| Monthly | 1st / 15th / etc. | Specific day of month |

**Routine Features:**
- Add/Edit/Delete routines
- Toggle routine on/off (enabled/disabled)
- Assign default quadrant for generated tasks
- View which routines are active today

---

### 3. Done Page (History)

**Purpose:** View completed tasks history

**Layout:**
```
+------------------------------------------+
|  ✅ DONE                                 |
|  ------------------------------------    |
|                                          |
|  Today (27 Nov)              3 tasks     |
|  +- [x] Task 1                           |
|  +- [x] Task 2                           |
|  +- [x] Task 3                           |
|                                          |
|  Yesterday (26 Nov)          5 tasks     |
|  +- [x] Task A                           |
|  +- [x] Task B                           |
|  +- ...                                  |
|                                          |
|  25 Nov                      2 tasks     |
|  +- ...                                  |
|                                          |
+------------------------------------------+
```

**Features:**
- Tasks grouped by completion date
- Task count per day
- Tap to restore task back to Do page
- Infinite scroll or pagination
- Optional: Stats/summary view

---

### 4. Account Page

**Purpose:** User profile and app settings

**Layout:**
```
+------------------------------------------+
|  👤 ACCOUNT                              |
|  ------------------------------------    |
|                                          |
|  +----------------------------------+    |
|  |  [Avatar]                        |    |
|  |  user@email.com                  |    |
|  |  [Sign Out]                      |    |
|  +----------------------------------+    |
|                                          |
|  Settings                                |
|  +- 🌙 Dark Mode           [Toggle]      |
|  +- 🔔 Notifications       [Toggle]      |
|  +- ⏰ Rollover Time       [00:00]       |
|  +- 🌐 Language            [English]     |
|                                          |
|  Data                                    |
|  +- 📤 Export Data                       |
|  +- 📥 Import Data                       |
|  +- 🗑️ Delete All Data                  |
|                                          |
|  About                                   |
|  +- 📖 How to Use                        |
|  +- 📝 Feedback                          |
|  +- ℹ️ Version 1.0.0                     |
|                                          |
+------------------------------------------+
```

**Features:**
- Login/logout with Firebase Auth
- Theme toggle (light/dark)
- Notification settings
- Custom rollover time
- Export/Import data (JSON)
- Delete all data option

---

## Data Models

### Task

```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  dueDate: Date;                          // The date task should appear in Do page
  quadrant: 'q1' | 'q2' | 'q3' | 'q4';    // Matrix position
  rolledOver: boolean;                    // Was this rolled over from previous day?
  rolloverCount: number;                  // How many times rolled over
  routineId?: string;                     // If created from a routine
  userId?: string;                        // For cloud sync
}
```

### Routine

```typescript
interface Routine {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  daysOfWeek?: number[];                  // [1,3,5] = Mon, Wed, Fri (0=Sun, 6=Sat)
  dayOfMonth?: number;                    // 1-31 for monthly
  quadrant: 'q1' | 'q2' | 'q3' | 'q4';    // Default quadrant for generated tasks
  enabled: boolean;                       // Toggle on/off
  createdAt: Date;
  userId?: string;                        // For cloud sync
}
```

### User Settings

```typescript
interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  rolloverTime: string;                   // "00:00" format (midnight default)
  notifications: boolean;
  language: 'en' | 'th';
}
```

---

## Core Logic

### Auto Rollover

```
At rollover time (default: 00:00 midnight):
1. Find all incomplete tasks where dueDate < today
2. For each task:
   - Update dueDate to today
   - Set rolledOver = true
   - Increment rolloverCount
3. Save changes to local DB
4. Sync to Firebase if online
```

### Routine Task Generation

```
At rollover time (after rollover):
1. Get all routines where enabled = true
2. For each routine, check if today matches:
   - daily: always matches
   - weekly: check if today's day matches daysOfWeek[0]
   - monthly: check if today's date matches dayOfMonth
   - custom: check if today's day is in daysOfWeek[]
3. If matches, create new Task:
   - title = routine.title
   - dueDate = today
   - quadrant = routine.quadrant
   - routineId = routine.id
   - completed = false
4. Save to local DB and sync
```

### Sync Strategy (Local + Firebase)

```
1. Always save to IndexedDB first (offline-first)
2. If online and logged in:
   - Push changes to Firebase
   - Pull remote changes
   - Merge conflicts (last-write-wins)
3. If offline:
   - Queue changes
   - Sync when back online
```

---

## Project Structure

```
donetoday/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── BottomNav.svelte
│   │   │   ├── TaskItem.svelte
│   │   │   ├── TaskInput.svelte
│   │   │   ├── MatrixGrid.svelte
│   │   │   ├── MatrixQuadrant.svelte
│   │   │   ├── RoutineList.svelte
│   │   │   ├── RoutineItem.svelte
│   │   │   └── ...
│   │   ├── stores/
│   │   │   ├── tasks.ts           # Task state management
│   │   │   ├── routines.ts        # Routine state management
│   │   │   ├── settings.ts        # User settings
│   │   │   └── auth.ts            # Auth state
│   │   ├── services/
│   │   │   ├── db.ts              # IndexedDB operations
│   │   │   ├── firebase.ts        # Firebase config & operations
│   │   │   ├── sync.ts            # Sync logic
│   │   │   ├── rollover.ts        # Auto rollover logic
│   │   │   └── routine.ts         # Routine task generation
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript interfaces
│   │   └── utils/
│   │       └── date.ts            # Date helpers
│   ├── routes/
│   │   ├── +layout.svelte         # App layout with BottomNav
│   │   ├── +page.svelte           # Do page (home)
│   │   ├── goal/
│   │   │   └── +page.svelte       # Goal page (matrix + routine tabs)
│   │   ├── done/
│   │   │   └── +page.svelte       # Done page (history)
│   │   └── account/
│   │       └── +page.svelte       # Account page
│   ├── app.css                    # Global styles + Tailwind
│   └── app.html
├── static/
│   ├── manifest.json              # PWA manifest
│   ├── icons/                     # App icons
│   └── ...
├── svelte.config.js
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Design Guidelines

### Colors (Suggested)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | #FFFFFF | #1A1A1A |
| Surface | #F5F5F5 | #2D2D2D |
| Primary | #4F46E5 (Indigo) | #818CF8 |
| Text | #1F2937 | #F9FAFB |
| Completed | #9CA3AF | #6B7280 |

### Matrix Colors

| Quadrant | Color |
|----------|-------|
| Q1 - Do First | Red (#EF4444) |
| Q2 - Schedule | Blue (#3B82F6) |
| Q3 - Delegate | Yellow (#F59E0B) |
| Q4 - Eliminate | Gray (#6B7280) |

---

## Future Features (Optional)

| Feature | Description | Priority |
|---------|-------------|----------|
| Google Calendar Quick Add | Button to open Google Calendar with task info pre-filled | High |
| AI Smart Input | Parse "meeting tomorrow 10am" automatically | Medium |
| AI Auto Priority | Suggest which quadrant for new tasks | Medium |
| Widgets | Home screen widget showing today's tasks | High |
| Notifications | Remind incomplete tasks | Medium |
| Streak | Track consecutive days of completing all tasks | Low |
| Share | Share daily accomplishments | Low |
| Subtasks | Break down tasks into smaller items | Medium |
| Tags/Categories | Organize tasks by category | Low |

---

## Google Calendar Integration (Quick Add)

### How it works

```
DoneToday                         Google Calendar
+------------------+              +------------------+
| [ ] ประชุมทีม     |              | New Event        |
|                  |    tap 📅    |                  |
|   [📅 Calendar]  | -----------> | Title: ประชุมทีม  | <- auto-filled
|                  |              | Date: 27 Nov     | <- auto-filled
+------------------+              | Time: ___        | <- user fills
                                  |                  |
                                  | [Save]           |
                                  +------------------+
```

### Implementation

```typescript
// Generate Google Calendar URL with pre-filled data
function openGoogleCalendar(task: Task) {
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: task.title,
    dates: formatDateForCalendar(task.dueDate),  // YYYYMMDD format
    // Optional: add details
    details: `Created from DoneToday`,
  });

  window.open(`${baseUrl}?${params.toString()}`, '_blank');
}

// Helper function
function formatDateForCalendar(date: Date): string {
  const dateStr = date.toISOString().replace(/[-:]/g, '').split('T')[0];
  // Format: YYYYMMDD/YYYYMMDD (all-day event)
  return `${dateStr}/${dateStr}`;
}
```

### UI Location

Add calendar button in Task item:

```
+------------------------------------------+
|  [ ] Task title                    [📅]  |  <- Calendar button
+------------------------------------------+
```

Or in task detail/edit modal:

```
+------------------------------------------+
|  Edit Task                               |
|  ------------------------------------    |
|  Title: [ประชุมทีม                    ]  |
|                                          |
|  [📅 Add to Google Calendar]             |
|                                          |
|  [Save]  [Delete]                        |
+------------------------------------------+
```

### Benefits

- No Google API key required
- No authentication needed
- Works instantly
- User controls their own calendar

---

## Development Phases

### Phase 1: MVP
- [ ] Project setup (SvelteKit + Tailwind + PWA)
- [ ] Bottom navigation
- [ ] Do page (add, complete, delete tasks)
- [ ] Local storage (IndexedDB)
- [ ] Auto rollover logic

### Phase 2: Full Features
- [ ] Goal page - Matrix tab
- [ ] Goal page - Routine tab
- [ ] Routine task generation
- [ ] Done page (History)
- [ ] Account page (Settings)
- [ ] Dark mode

### Phase 3: Cloud Sync
- [ ] Firebase setup
- [ ] Authentication (Google login)
- [ ] Cloud sync
- [ ] Offline support

### Phase 4: Polish
- [ ] Animations
- [ ] PWA install prompt
- [ ] Performance optimization
- [ ] Testing

### Phase 5: AI Features (Optional)
- [ ] Smart input parsing
- [ ] Auto priority suggestions

---

## Commands to Start

```bash
# Create project
npm create svelte@latest donetoday
cd donetoday

# Install dependencies
npm install -D tailwindcss postcss autoprefixer
npm install firebase idb
npm install -D vite-plugin-pwa

# Initialize Tailwind
npx tailwindcss init -p

# Run dev server
npm run dev
```

---

*Last updated: November 27, 2024*
