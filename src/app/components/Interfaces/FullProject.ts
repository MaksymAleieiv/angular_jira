import { CurrentUser } from "./CurrentUser";
import { Task } from "./Task";

export interface FullProject {
    id: number;
    title: string;
    description: string;
    updatedAt: string;
    tasksCount: number;
    users: CurrentUser[];
    tasks: Task[];
}