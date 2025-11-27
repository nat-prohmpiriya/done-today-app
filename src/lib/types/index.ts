// Task interface
export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
    dueDate: Date; // The date task should appear in Do page
    quadrant: 'q1' | 'q2' | 'q3' | 'q4'; // Matrix position
    rolledOver: boolean; // Was this rolled over from previous day?
    rolloverCount: number; // How many times rolled over
    routineId?: string; // If created from a routine
    userId?: string; // For cloud sync
}

// Routine interface
export interface Routine {
    id: string;
    title: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    daysOfWeek?: number[]; // [1,3,5] = Mon, Wed, Fri (0=Sun, 6=Sat)
    dayOfMonth?: number; // 1-31 for monthly
    quadrant: 'q1' | 'q2' | 'q3' | 'q4'; // Default quadrant for generated tasks
    enabled: boolean; // Toggle on/off
    createdAt: Date;
    userId?: string; // For cloud sync
}

// User Settings interface
export interface UserSettings {
    userId: string;
    theme: 'light' | 'dark' | 'system';
    rolloverTime: string; // "00:00" format (midnight default)
    notifications: boolean;
    language: 'en' | 'th';
}

// Matrix quadrant info
export interface QuadrantInfo {
    id: 'q1' | 'q2' | 'q3' | 'q4';
    name: string;
    emoji: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

export const QUADRANTS: Record<string, QuadrantInfo> = {
    q1: {
        id: 'q1',
        name: 'DO FIRST',
        emoji: '🔥',
        description: 'Urgent + Important',
        color: 'text-q1',
        bgColor: 'bg-red-50 dark:bg-red-950',
        borderColor: 'border-q1',
    },
    q2: {
        id: 'q2',
        name: 'SCHEDULE',
        emoji: '📅',
        description: 'Important, Not Urgent',
        color: 'text-q2',
        bgColor: 'bg-blue-50 dark:bg-blue-950',
        borderColor: 'border-q2',
    },
    q3: {
        id: 'q3',
        name: 'DELEGATE',
        emoji: '⚡',
        description: 'Urgent, Not Important',
        color: 'text-q3',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950',
        borderColor: 'border-q3',
    },
    q4: {
        id: 'q4',
        name: 'ELIMINATE',
        emoji: '🗑️',
        description: 'Not Urgent, Not Important',
        color: 'text-q4',
        bgColor: 'bg-gray-50 dark:bg-gray-950',
        borderColor: 'border-q4',
    },
};
