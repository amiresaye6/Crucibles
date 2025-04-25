const express = require("express");
const router = express.Router();
const {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
} = require("../controllers/report.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");

router.get('/', protect, authorizeRoles('admin', 'department', 'user'), getAllReports);
router.post('/', protect, authorizeRoles('user', 'admin', 'department'), createReport); // Add multer middleware
router.get('/:id', protect, authorizeRoles('admin', 'department', 'user'), getReportById);
router.put('/:id', protect, authorizeRoles('admin', 'department'), updateReport);
router.delete('/:id', protect, authorizeRoles('admin'), deleteReport);

module.exports = router;
