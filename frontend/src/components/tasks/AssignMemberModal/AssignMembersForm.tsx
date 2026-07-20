import { useState } from "react";
import type { User } from "../../../types/user";
import { useAssignTaskMutation } from "../../../hooks/mutations/useAssignTaskMutation";

type AssignTaskMembersProps = {
    projectTeam: User[];
    taskTeam: User['_id'][];
    taskID: string;
    projectID: string;
}

export default function AssignMembersForm({
    projectTeam,
    taskTeam,
    taskID,
    projectID,
}: AssignTaskMembersProps) {
    const [selectedIDs, setSelectedIDs] = useState<string[]>(taskTeam);
    const mutation = useAssignTaskMutation({projectID, taskID});
    
    const toggleMember = (userID: string) => {
        setSelectedIDs(prev =>
            prev.includes(userID)
                ? prev.filter(id => id !== userID)
                : [...prev, userID]
        );
    };

    const handleSubmit = () => {
        mutation.mutate(
            { userIDs: selectedIDs },
        );
    };

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                {projectTeam.map(member => (
                    <label
                        key={member._id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#252d3d] border border-[#2d3348] cursor-pointer hover:border-indigo-500/50 transition-colors duration-150"
                    >
                        <input
                            type="checkbox"
                            checked={selectedIDs.includes(member._id)}
                            onChange={() => toggleMember(member._id)}
                            className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
                        />
                        <span className="text-sm text-slate-200">{member.name}</span>
                        <span className="text-xs text-slate-500 ml-auto">{member.email}</span>
                    </label>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={mutation.isPending}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20 disabled:opacity-50"
            >
                {mutation.isPending ? "Guardando..." : "Guardar asignación"}
            </button>

            {mutation.error && (
                <p className="text-center text-sm text-red-400">{mutation.error.message}</p>
            )}
        </div>
    );
}