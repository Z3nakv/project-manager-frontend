export const SocketEvents = {

  //connection
  SOCKET_CONNECT: "connect",
  // Auth
  JOIN_USER: "join_user",

  // Notifications
  NEW_NOTIFICATION: "new_notification",

  // Projects
  PROJECT_UPDATED: "project_updated_notification",
  PROJECT_DELETED: "receive_project_deleted",

  // Members
  MEMBER_ADDED: "member_added_notification",
  MEMBER_REMOVED: "member_removed_notification",

  // Tasks
  TASK_CREATED: "taskCreatedMessage",
  TASK_UPDATED: "taskUpdatedMessage",
  TASK_DELETED: "taskDeletedMessage",
  TASK_STATUS_UPDATED: "task_status_updated_notification",

  // Client -> Server
  SEND_MESSAGE: "send_message",

} as const;