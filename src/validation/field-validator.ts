type TitleValidatorPropsType = {
    title: string | undefined;
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


export enum ResolutionEnum  {
    "P144" = "P144",
    "P240" = "P240",
    "P360" = "P360",
    "P480" = "P480",
    "P720" = "P720",
    "P1080" = "P1080",
    "P1440" = "P1440",
    "P2160" = "P2160"
}
