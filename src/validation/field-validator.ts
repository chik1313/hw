import {availableResolution} from "../types/types";


export const titleValidator = (title: string | undefined,
errorsArray: Array<{ field: string, message: string }>) => {
    if (!title) {
        errorsArray.push({field: 'title', message: 'no title'});
    }
    if (title && title.trim().length > 40) {
        errorsArray.push({
            field: 'title',
            message: 'more than 40 symbols'
        });
    }
    if (title && title.trim().length < 1) {
        errorsArray.push({
            field: 'title',
            message: 'add title'
        });
    }
}
export const authorValidator = (author: string | undefined, errorsArray: Array<{ field: string, message: string }>) => {
    if (!author) {
        errorsArray.push({field: 'author', message: 'no author'});
    }
    if (author && author.trim().length > 20) {
        errorsArray.push({field: 'author', message: 'more than 20'});
    }
    if (author && author.trim().length < 1) {
        errorsArray.push({field: 'author', message: 'add author'});
    }
}
export const availableResolutionsFieldValidator = (availableResolution: availableResolution | undefined,
                                                   errorsArray: Array<{ field: string, message: string }>) => {
    if (availableResolution && availableResolution.length) {
        availableResolution.forEach((resolution: string) => {
            if (!Object.keys(ResolutionEnum).includes(resolution)) {
                errorsArray.push({
                    field: 'availableResolution',
                    message: 'exist not valid value'
                })
                return
            }
        })
    }
}



export enum ResolutionEnum {
    "P144" = "P144",
    "P240" = "P240",
    "P360" = "P360",
    "P480" = "P480",
    "P720" = "P720",
    "P1080" = "P1080",
    "P1440" = "P1440",
    "P2160" = "P2160"
}

