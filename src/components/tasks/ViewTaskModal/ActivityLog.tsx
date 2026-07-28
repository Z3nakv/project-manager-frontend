import { statusTranslations } from "../../../constants/statusColors";
import type { Task } from "../../../types/task";

type ActivityLogProps = {
  taskData: Task;
};

const ActivityLog = ({ taskData }: ActivityLogProps) => {
  return (
    <>
      {taskData.completedBy.length ? (
        <div className="space-y-4">
          <p className="font-bold text-2xl text-slate-600 my-5">
            Historial de cambios
          </p>

          <ul
            className="relative border-l-2 border-slate-300 max-h-48 overflow-y-auto
                                          [&::-webkit-scrollbar]:w-1.5
                                          [&::-webkit-scrollbar-track]:bg-transparent
                                          [&::-webkit-scrollbar-thumb]:bg-[#2d3348]
                                          [&::-webkit-scrollbar-thumb]:rounded-full
                                          [&::-webkit-scrollbar-thumb:hover]:bg-[#3d4663]"
          >
            {taskData.completedBy.map((activityLog, index) => (
              <li key={activityLog._id} className="mb-6 ml-13">
                <div className="absolute left-3 w-6 h-6 bg-slate-500 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-xs text-white">{index + 1}</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-600">
                    {statusTranslations[activityLog.status]}
                  </span>{" "}
                  <span className="text-slate-500">por : </span>{" "}
                  <span className="text-slate-500 font-black">
                    {activityLog.user.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default ActivityLog;
