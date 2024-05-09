import express from "express";
import multer from "multer";
import { allUser, allUserName, deleteUser, registerEmpolye, registerUser, userLogin } from "../controlars/userControlars.js";
// upload = multer({dest:'uploads/'})
const router = express.Router();


// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });

  const upload = multer({ storage: storage });

router.get('/users', allUser)
router.post('/register', upload.single('userImg'),registerUser)
router.post('/login', userLogin)
router.delete('/users/:name', deleteUser)
router.get('/usersname', allUserName)
router.post('/employeregistration', registerEmpolye)


export default router;