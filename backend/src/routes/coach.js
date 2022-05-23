const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");
const CoachModel = require("../models/coach");
const auth = require("../middlewares/auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootFolder = process.env.PWD;
    const uploadPath = path.join(rootFolder, "uploads");
    cb(null, uploadPath);
  },
  filename: async function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${v4()}${ext}`);
  },
});

const upload = multer({ storage: storage });

const createCoach = async (req, res, next) => {
  try {
    let data = req.body;
    let files = req.files;
    let image = files.splice(0, 1)[0];
    data.photo = image.filename;
    data.educations =
      data.educations &&
      data.educations.map((education, index) => {
        education.educational_state = education.educational_state_title;
        education.educational_document = files[index].filename;
        return education;
      });
    const coach = await CoachModel.create(data);
    res.json(coach);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const fetchCoaches = async (req, res, next) => {
  try {
    const education = req.query.education;
    const query = {};
    if (education) {
      query.education = education;
    }
    const coaches = await CoachModel.find(query);
    res.json(coaches);
  } catch (e) {
    next(e);
  }
};

const getSingleCoach = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coach = await CoachModel.findById(id);
    res.json(coach);
  } catch (e) {
    next(e);
  }
};

router.post(
  "/coaches",
  auth.authenticate,
  auth.is("admin"),
  upload.any(),
  createCoach
);
router.get("/coaches", auth.authenticate, auth.is("admin"), fetchCoaches);
router.get("/coaches/:id", auth.authenticate, auth.is("admin"), getSingleCoach);
module.exports = router;
