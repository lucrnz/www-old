import { pageTitleFormat } from '../config/pageTitle';
const getNewPageTitle = (value: string) => pageTitleFormat.replaceAll('%title%', value);

export default getNewPageTitle;
