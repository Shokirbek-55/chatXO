import { Channel } from "./channel";

export interface User {
    id?: number;
    color?: string;
    email?: string;
    avatar?: string;
    active?: boolean;
    username?: string;
    createdAt?: string;
    updatedAt?: string;
    channels?: Channel[] | any; // then_will_do!
    // channels?: Channel[];
    relevance?: number;
    judgement?: number;
    status?: string;
    latitude?: string;
    longitude?: string;
    isAdded?: boolean;
}
