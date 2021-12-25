import { CurrentUser } from "./CurrentUser";

export interface Project {
    id: number;
    title: string;
    description: string;
    updatedAt: string;
    tasksCount: number;
    users: CurrentUser[];
}