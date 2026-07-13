export type NotificationType =
  | "project_updated"
  | "project_deleted"
  | "member_added"
  | "member_removed"
  | "task_created"
  | "task_updated"
  | "task_deleted"
  | "task_status_updated";

export interface SocketNotification {
  type: NotificationType;
  message: string;
  projectId: string;
  taskId?: string;
}