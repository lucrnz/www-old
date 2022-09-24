export const blogArticle = 'blog-articles';
export const contentPage = 'content-pages';
export const image = 'image';
export const blogArticleById = (id: string) => `${blogArticle}/${id}`;
export const contentPageById = (id: string) => `${contentPage}/${id}`;
export const imageById = (id: number) => `${image}/${id}`;
