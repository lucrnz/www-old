import type { RenderableContent } from './RenderableContent';

export type ContentPage = {
    id: string;
    title: string;
    contents: RenderableContent[];
};
