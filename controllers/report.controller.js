const Report = require("../models/Report");
const { generateReport } = require("./generateReport");


exports.createReport = async (req, res) => {
    try {
        // Prepare report data
        const report = await generateReport(req.body.description); // Call AI API for report
        console.log(report);

        const reportData = {
            reporterId: req.user.id,
            priority: report.priority,
            description: req.body.description,
            location: req.body.location,
            aiConfidence: report.confidence,
            department: report.department,
            priorityScore: report.priorityScore
        };

        const newReport = await Report.create(reportData);
        res.status(201).json(newReport);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all reports (with optional filters)
exports.getAllReports = async (req, res) => {
    try {
        const { role, id: userId, department } = req.user;
        let filter = {};

        if (role === "user") {
            filter.reporterId = userId;
        } else if (role === "department") {
            filter.department = department;
        }
        // Admin gets all reports, no filter needed
        console.log(filter, req.user)
        const reports = await Report.find(filter).sort({ priorityScore: 1 });
        res.json({ from: req.user.role, ...reports });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single report by ID
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ error: "Report not found" });
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update report (e.g., change status, add resolution info)
exports.updateReport = async (req, res) => {
    try {
        const updated = await Report.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ error: "Report not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a report
exports.deleteReport = async (req, res) => {
    try {
        const deleted = await Report.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Report not found" });
        res.json({ message: "Report deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
