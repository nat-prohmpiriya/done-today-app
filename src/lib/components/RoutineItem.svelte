<script lang="ts">
    import type { Routine } from "$lib/types";

    interface Props {
        routine: Routine;
        onToggle: (id: string) => void;
        onEdit: (routine: Routine) => void;
        onDelete: (id: string) => void;
    }

    let { routine, onToggle, onEdit, onDelete }: Props = $props();

    function getFrequencyLabel(routine: Routine): string {
        switch (routine.frequency) {
            case "daily":
                return "Daily";
            case "weekly":
                if (routine.daysOfWeek?.length === 1) {
                    const days = [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                    ];
                    return days[routine.daysOfWeek[0]] || "Weekly";
                }
                return "Weekly";
            case "monthly":
                return `${routine.dayOfMonth}${getOrdinalSuffix(routine.dayOfMonth || 1)}`;
            case "custom":
                return routine.daysOfWeek?.length
                    ? `${routine.daysOfWeek.length}x/week`
                    : "Custom";
            default:
                return "Unknown";
        }
    }

    function getOrdinalSuffix(num: number): string {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return "st";
        if (j === 2 && k !== 12) return "nd";
        if (j === 3 && k !== 13) return "rd";
        return "th";
    }
</script>

<div
    class="flex items-center justify-between p-3 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
>
    <div class="flex items-center gap-3 flex-1">
        <input
            type="checkbox"
            checked={routine.enabled}
            onchange={() => onToggle(routine.id)}
            class="checkbox-task"
        />
        <div class="flex-1 min-w-0">
            <p class="font-medium text-sm">{routine.title}</p>
            <p class="text-xs text-gray-500">{getFrequencyLabel(routine)}</p>
        </div>
    </div>
    <div
        class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
    >
        <button
            onclick={() => onEdit(routine)}
            class="btn-icon text-blue-500 hover:text-blue-700"
            aria-label="Edit routine"
        >
            ✏️
        </button>
        <button
            onclick={() => onDelete(routine.id)}
            class="btn-icon text-red-500 hover:text-red-700"
            aria-label="Delete routine"
        >
            ×
        </button>
    </div>
</div>
