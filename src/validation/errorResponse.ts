type errorsArayPropsType = {
    errorsArray: [{message: string , field: string}];
}

export const errorResponse = (props: errorsArayPropsType) => {
let errors_ = {
    errorsMessage: []  as Array<{message: string , field: string}>
}
props.errorsArray.forEach(error => {
    errors_.errorsMessage.push(error)
})
}
