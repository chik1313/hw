

export const errorResponse = (errorsArray: Array<{message: string , field: string}>) => {
let errors_ = {
    errorsMessage: []  as Array<{message: string , field: string}>
}
errorsArray.forEach(error => {
    errors_.errorsMessage.push(error)
})
}
