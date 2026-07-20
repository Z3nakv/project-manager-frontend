import { array, object, string } from "zod";

export const assignTaskSchema = object({
  userIDs: array(string()).min(0),
});
