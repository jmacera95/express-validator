const path = require('path');
var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const { userRegisterValidations } = require('../validations/usersValidations');

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/images/users'))
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + "-" + file.originalname;
            cb(null, filename);
        }
    }
);

function fileFilter(req, file, cb) {
    const acceptedFileExtensions = [".jpg", ".png", ".jpeg"];
    const isAccepted = acceptedFileExtensions.includes(path.extname(file.originalname));
    if (!isAccepted) {
        req.file = file;
    }
    cb(null, isAccepted);
}

const upload = multer({storage: storage, fileFilter: fileFilter});

/* GET users listing. */
router.get('/', usersController.list);

/* GET users register page */
router.get('/register', usersController.register);
/* Process user registration*/
router.post('/register', upload.single('img'), userRegisterValidations, usersController.processRegister);

module.exports = router;
