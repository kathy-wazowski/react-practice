import React from "react";
import { Action, Task } from "../reducers/taskReducer";
import { Dispatch } from "react";

interface TasksContextType {
  tasks: Task[];
  dispatch: Dispatch<Action>;
}
const TasksContext = React.createContext<TasksContextType>(
  {} as TasksContextType
);
export default TasksContext;
