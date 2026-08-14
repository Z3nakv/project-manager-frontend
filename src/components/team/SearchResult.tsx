import { UserPlusIcon } from "@heroicons/react/20/solid";
import { useAddUserToProjectMutation } from "../../hooks/mutations/useTeamMembersMutation";
import type { TeamMember } from "../../types/team";
import useProjectId from "../../hooks/useProjectId";

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

const SearchResult = ({ user, reset } : SearchResultProps) => {
    const projectId = useProjectId();
    const { mutate } = useAddUserToProjectMutation({ user, reset, projectId });
    const handleAddUserToProject = () => {
        const data = {
            projectId,
            _id: user._id
        }
        mutate(data);
    }
    return (
        <div className="border-t border-border pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
                Resultado
            </p>

            <div className="flex items-center justify-between bg-surface-hover border border-border rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-muted">{user.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleAddUserToProject}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-text-on-primary text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-primary/20"
                >
                    <UserPlusIcon className="h-3.5 w-3.5" />
                    Agregar
                </button>
            </div>
        </div>
    );
}

export default SearchResult