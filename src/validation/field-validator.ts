type TitleValidatorPropsType = {
    title: string | undefined;
    errorsArray: [
        { field: string, message: string }
    ]
}

type availableResolutionsValidatorPropsType = {
    availableResolution: string[],
    errorsArray: [
        { field: string, message: string }
    ]
}


export const TitleValidator = (props: TitleValidatorPropsType) => {
    if (!props.title) {
        props.errorsArray.push({field: 'title', message: 'no title'});
    }
    if (props.title && props.title.trim().length > 40) {
        props.errorsArray.push({
            field: 'title',
            message: 'more than 40 symbols'
        });
    }
    if (props.title && props.title.trim().length < 1) {
        props.errorsArray.push({
            field: 'title',
            message: 'add title'
        });
    }
}

export const availableResolutionsFieldValidator = (props: availableResolutionsValidatorPropsType) => {
    if (props.availableResolution && props.availableResolution.length) {
        props.availableResolution.forEach((resolution: string) => {
            if (!Object.keys(ResolutionEnum).includes(resolution)) {
                props.errorsArray.push({
                    field: 'availableResolution',
                    message: 'exist not valid value'
                })
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
