export type BlogArticleDiv = {
    type: string;
    values: string[];
};

export type BlogArticle = {
    id: string;
    title: string;
    contents: BlogArticleDiv[];
    creationDate: Date;
};
