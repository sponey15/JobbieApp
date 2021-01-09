import { Photo } from "./photo";
import { WorkTask } from "./workTask";

export interface Work {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    isPaid?: boolean;
    workBegin?: Date;
    workEnd?: Date;
    longitude?: number;
    latitude?: number;
    offerId?: number;
    userId?: number;
    workStatusName: string;
    workTasks?: WorkTask[];
    photos?: Photo[];
}

export interface WorkStatus {
    [workStatusName: string]: string;
}

export enum WorkStatusName {
    Pending,
    InProgress,
    Archive
}