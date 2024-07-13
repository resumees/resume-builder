const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");

// Multer middleware setup for file upload
const upload = multer({ dest: "uploads/" });

router.post("/upload/resume", upload.single("resume"), (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    // Read uploaded file
    const filePath = req.file.path;
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();

    // Check file type and process accordingly
    if (fileExtension === "pdf") {
        // Read PDF file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return res.status(500).send("Error reading PDF file.");
            }

            // Parse PDF content
            pdf(data).then(function(data) {
                // Extract text
                const resumeText = data.text;
                res.send(resumeText);
            }).catch(function(err) {
                // Handle parsing error
                res.status(500).send("Error parsing PDF file.");
            });
        });
    } else if (fileExtension === "docx") {
        // Read DOCX file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return res.status(500).send("Error reading DOCX file.");
            }

            // Extract text from DOCX
            mammoth.extractRawText({ buffer: data })
                .then(function(result) {
                    // Extracted text
                    const resumeText = result.value;
                    res.send(resumeText);
                })
                .catch(function(err) {
                    // Handle extraction error
                    res.status(500).send("Error extracting text from DOCX file.");
                });
        });
    } else {
        res.status(400).send("Unsupported file format. Only PDF and DOCX files are supported.");
    }
});

module.exports = router;
