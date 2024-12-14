import {ResolutionEnum} from "../validation/field-validator";


export type videoViewModule = {
    id: number,
    title:string,
    author:string,
    availableResolutions: availableResolution ,
    canBeDownloaded:boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string
}
export type availableResolution = [keyof typeof ResolutionEnum] | null;

export type videoInputType = {
    title:string,
    author:string,
    availableResolutions?: availableResolution ,
    canBeDownloaded?:boolean,
    minAgeRestriction?: number | null,
    publicationDate?: string
}


export type errorType = {
    message: string ,
    field: string
}

export type APIErrorResultType = {
    errorsMessages: errorType[]
}

