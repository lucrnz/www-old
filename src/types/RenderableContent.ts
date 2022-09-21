export enum RenderableContentType {
    Paragraph,
    Section,
    ToggeableSection,
    Text,
    Link,
    Image,
    Title,
}

export type RenderableContentParams = {
    [key: string]: string | RenderableContent[];
};

export type RenderableContent = {
    type: RenderableContentType;
    params: RenderableContentParams;
};
