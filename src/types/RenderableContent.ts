export type RenderableContentParams = {
    [key: string]: string | RenderableContent[];
};

export type RenderableContent = {
    type: number;
    params: RenderableContentParams;
};
