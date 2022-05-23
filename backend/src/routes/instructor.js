const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");
const InstractorModel = require("../models/instructor");
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

const createInstructor = async (req, res, next) => {
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
    const instructor = await InstractorModel.create(data);
    res.json(instructor);
  } catch (e) {
    next(e);
  }
};

const getInstractors = async (req, res, next) => {
  try {
    const education = req.query.education;
    const query = {};
    if (education) {
      query.education = education;
    }
    const instractors = await InstractorModel.find(query);
    res.json(instractors);
  } catch (e) {
    next(e);
  }
};

const getSingleInsructor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const instractor = await InstractorModel.findById(id);
    res.json(instractor);
  } catch (e) {
    next(e);
  }
};
router.get("/instructors", auth.authenticate, auth.is("admin"), getInstractors);
router.post(
  "/instructors",
  auth.authenticate,
  auth.is("admin"),
  upload.any(),
  createInstructor
);

router.get(
  "/instructors/:id",
  auth.authenticate,
  auth.is("admin"),
  getSingleInsructor
);
module.exports = router;
