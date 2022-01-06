import { CurrentUser } from "./CurrentUser";

export interface Status {
    id: number;
    title: string;
    color: string;
}

export interface Type {
    id: number;
    title: string;
    color: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    timeTracked?: any;
    timeAllotted?: any;
    createdAt: string;
    updatedAt: string;
    projectId: number;
    status: Status;
    type: Type;
    user: CurrentUser;
    files: any[];
}