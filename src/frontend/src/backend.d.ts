import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AppIdea {
    title: string;
    description: string;
}
export interface backendInterface {
    getLatestAppIdea(): Promise<AppIdea>;
    submitAppIdea(title: string, description: string): Promise<void>;
}
