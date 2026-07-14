import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeamMember } from "../../types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { addUserToProject } from "../../services/teamService";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import { socket } from "../../lib/socket";

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

const SearchResult = ({ user, reset } : SearchResultProps) => {

    const navigate = useNavigate();
    const params = useParams();
    const projectID = params.projectID!;
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onSuccess: (data) => {

            socket.emit('member_added',{
                message: `${user?.name} te agregó como colaborador al proyecto`,
                userID: user._id
            });

            toast.success(data);
            reset()
            navigate(location.pathname, {replace: true});
            queryClient.invalidateQueries({queryKey:['projectTeam', projectID]});
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleAddUserToProject = () => {
        const data = {
            projectID,
            _id: user._id
        }
        mutate(data);
    }
    
    
    return (
        <div className="border-t border-[#2d3348] pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                Resultado
            </p>

            <div className="flex items-center justify-between bg-[#252d3d] border border-[#2d3348] rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/25 flex items-center justify-center shrink-0">
                        <span className="text-indigo-400 font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-200">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleAddUserToProject}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20"
                >
                    <UserPlusIcon className="h-3.5 w-3.5" />
                    Agregar
                </button>
            </div>
        </div>
    );
}

export default SearchResult