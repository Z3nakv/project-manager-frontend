export const SocketEvents = {

  //connection
  SOCKET_CONNECT: "connect",
  // Auth
  JOIN_USER: "join_user",

  // Notifications
  NEW_NOTIFICATION: "static_notification",

  // Projects
  PROJECT_UPDATED: "project_updated_notification",
  PROJECT_DELETED: "project_deleted_notification",

  // Members
  MEMBER_ADDED: "member_added_notification",
  MEMBER_REMOVED: "member_removed_notification",

  // Tasks
  TASK_CREATED: "task_created_notification",
  TASK_UPDATED: "task_updated_notification",
  TASK_DELETED: "task_deleted_notification",
  TASK_STATUS_UPDATED: "task_status_updated_notification",

  // Client -> Server
  SEND_MESSAGE: "send_message",

} as const;