export type User = {
    id?: number;
    username?: string;
    email?: string;
    avatar?: string;
    color?: string;
    relevance?: number;
};

export type UpdatedUser = {
    id: number;
    username: string;
    email: string;
    avatar: string;
    color: string;
    password: string;
};
