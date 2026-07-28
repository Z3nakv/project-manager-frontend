import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { getCloudinaryUrl } from "../../../utils/cloudinary";
import type { attachmentsSchemaType } from "../../../types/attachment";

const TaskAttachmentModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get("viewTask") ?? searchParams.get("task")!;
  const attachmentId = searchParams.get("viewAttachment")!;
  const handleClose = () => navigate(location.pathname, { replace: true });

  const queryClient = useQueryClient();
  const attachmentsData = queryClient.getQueryData<attachmentsSchemaType>([
    "taskAttachments",
    taskId,
  ]);
  const attachment = attachmentsData?.find((att) => att._id === attachmentId);

  if (attachmentId)
    return (
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={handleClose}>
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-lg max-h-[80vh] mt-30 overflow-y-auto scrollbar-thumb-indigo-50 scrollbar-auto bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8">
                  <div className="flex items-start justify-between mb-6">
                    {attachment && (
                      <img
                        src={getCloudinaryUrl(attachment.publicId, 600, 450)}
                        alt={attachment.filename}
                        className="rounded-lg w-full h-auto"
                      />
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
};

export default TaskAttachmentModal;
