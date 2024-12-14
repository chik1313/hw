import {APIErrorResultType, errorType} from "../types/types";


export const errorResponse = (errorsArray: errorType[] ):APIErrorResultType => {
let errors_: APIErrorResultType = {
    errorsMessages: []
}
errorsArray.forEach(error => {
    errors_.errorsMessages.push(error)
})
    return errors_
}
