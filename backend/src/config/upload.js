const multer = require('multer');
const path = require('path');


module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, callback) {
            // Get current date
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + mm + dd;

            // Generate hash from var today
            for (var i = 0, hash = 0; i < today.length; i++)
                hash = Math.imul(31, hash) + today.charCodeAt(i) | 0;

            // change to name file
            // include hash    
            let fileName = file.originalname.replace(/\s/g, '-'); // change space for hífen
            const [name, extension] = fileName.split('.');
            fileName = `${name}${hash}.${extension}`;

            callback(null, fileName);
        }
    })
}