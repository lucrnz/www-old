import type { RenderableContentParams, RenderableContent } from '../../types/RenderableContent';

export const getParamAsString = (paramName: string, params: RenderableContentParams): string =>
    params[paramName] as string;

export const getParamAsRenderableContentArray = (
    paramName: string,
    params: RenderableContentParams
): RenderableContent[] => params[paramName] as RenderableContent[];
