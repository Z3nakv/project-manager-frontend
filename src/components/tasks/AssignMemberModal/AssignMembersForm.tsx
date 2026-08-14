import { useMemo, useState } from "react";
import type { User } from "../../../types/user";
import { useAssignTaskMutation } from "../../../hooks/mutations/useAssignTaskMutation";

type AssignTaskMembersProps = {
    projectTeam: User[];
    taskTeam: User['_id'][];
    taskId: string;
    projectId: string;
}

export default function AssignMembersForm({
    projectTeam,
    taskTeam,
    taskId,
    projectId,
}: AssignTaskMembersProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>(taskTeam);
    const mutation = useAssignTaskMutation({projectId, taskId});

    const hasChanges = useMemo(() => {
        if(selectedIds.length !== taskTeam.length) return true;

        const original = new Set(taskTeam);
        return selectedIds.some(id => !original.has(id));
    }, [selectedIds, taskTeam]);
    
    const toggleMember = (userId: string) => {
        setSelectedIds(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSubmit = () => {
        mutation.mutate(
            { userIds: selectedIds },
        );
    };

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                {projectTeam.map(member => (
                    <label
                        key={member._id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-input border border-border cursor-pointer hover:border-border-strong hover:bg-surface-hover transition-colors duration-150"
                    >
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(member._id)}
                            onChange={() => toggleMember(member._id)}
                            className="w-4 h-4 rounded accent-primary cursor-pointer"
                        />
                        <span className="text-sm text-text-primary">{member.name}</span>
                        <span className="text-xs text-text-muted ml-auto">{member.email}</span>
                    </label>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={!hasChanges || mutation.isPending}
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-text-on-primary text-sm font-semibold rounded-xl transition-colors duration-150 cursor-pointer shadow-md disabled:opacity-50"
            >
                {mutation.isPending ? "Guardando..." : "Guardar asignación"}
            </button>

            {mutation.error && (
                <p className="text-center text-sm text-error">{mutation.error.message}</p>
            )}
        </div>
    );
}