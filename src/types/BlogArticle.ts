export type BlogArticleDiv = {
    type: string;
    params: { [key: string]: string };
};

export type BlogArticle = {
    id: string;
    title: string;
    contents: BlogArticleDiv[];
    creationDate: Date;
    readTimeMinutes: number;
    description: string;
};
