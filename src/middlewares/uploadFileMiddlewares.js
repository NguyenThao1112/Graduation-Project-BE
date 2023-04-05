const configConstants = require('../constants/configConstants');
const messageConstants = require('../constants/messageConstants');
const path = require("path");

//Middleware to check the limit of an uploaded file
/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {Express.Request} next
 * @returns
 */
 function checkFileSizeLimit(request, response, next) {
    const files = request.files ?? null;

    //If the user didn't send files
    if (null === files) {
        next();
        return;
    }

    const overlimitFiles = [];

    //Which files are over the limit?
    Object.keys(files).forEach(key => {
        const file = files[key];

        if (Array.isArray(file)) {
            file.forEach(f => {
                if (f.size > configConstants.FILE_SIZE_LIMIT) {
                    overlimitFiles.push(f.name);
                }
            })
        } else {
            if (file.size > configConstants.FILE_SIZE_LIMIT) {
                overlimitFiles.push(file.name);
            }
        }

    })

    if (overlimitFiles.length) {
        const properVerb = overlimitFiles.length > 1 ? 'are' : 'is';
        const sentence = 
            `Upload failed. ${overlimitFiles.toString()} ${properVerb} over the file size limit of ${configConstants.FILE_SIZE} MB`
            .replaceAll(",", ", ");
        const message = overlimitFiles.length < 3
            ? sentence.replace(",", ", ")   //if there is 2 object => replace the "," with "and"
            : sentence.replace(/,(?=[^,]*$)/, " and") // if else, replace the last "," with "and"
    
        const responseJSON = {
            code: messageConstants.ARTICLE_SAVED_OVERLIMIT_FILE_SIZE_CODE,
            message: message,
        }

        return response
            .status(413)
            .json(responseJSON);

    }

    next();
 }


//Middleware to check if the files has the allowed extension
/**
 *
 * @param {Array<String>} request
 * @returns {Closure}
 */
 function checkFileExtension(allowedExtensions) {
    return (request, response, next) => {
        const files = request.files ?? null;
        if (null === files) {
            next();
            return;
        }

        //Get all the extensions of the upload files
        const fileExtensions = []
        Object.keys(files).forEach(key => {
            const file = files[key];

            if (Array.isArray(file)) {
                file.forEach(f => {
                    fileExtensions.push(path.extname(f.name));
                })
            } else {
                fileExtensions.push(path.extname(file.name));
            }
        })

        //Are the file extension allowed ?
        const allowed = fileExtensions
            .every(extension => allowedExtensions.includes(extension));

        if (!allowed) {
            const message = 
                `Upload failed. Only ${allowedExtensions.toString()} files allowed`
                .replaceAll(",", ", ");

            const responseJson = {
                code: messageConstants.ARTICLE_SAVED_INVALID_EXTENSIONS_FILE,
                message: message,
            }

            return response
                .status(422)
                .json(responseJson);
        }

        next();
    }
 }

 module.exports = {
    checkFileSizeLimit,
    checkFileExtension,
 }