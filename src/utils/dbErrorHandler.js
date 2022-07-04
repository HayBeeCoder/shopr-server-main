const getErrMsg = (err) => {
    let message = ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrMsg(err)
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message
        }
    }
    return message
}

const getUniqueErrMsg = (err) => {
    let output, e = err.message
    const l = (err, string) => err.lastIndexOf(string)
    // console.log(e.lastIndexOf("_1"))
    // console.log(e.lastIndexOf("index:"))
    // console.log(e)
    try {
        let fieldName =
            e.substring(l(e, 'index:') + 7, l(e, '_1'))
        console.log(fieldName)
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) +
            ' already exists'
    }
    catch (er) {
        output = 'Unique field already exists'
    }
    return output
}
export default { getErrMsg }