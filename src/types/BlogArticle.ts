import type { RenderableContent } from './RenderableContent';

export type BlogArticle = {
    id: string;
    title: string;
    contents: RenderableContent[];
    creationDate: Date;
    readTimeMinutes: number;
    description: string;
};
