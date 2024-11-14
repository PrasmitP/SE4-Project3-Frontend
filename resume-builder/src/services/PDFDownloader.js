import { jsPDF } from 'jspdf';

import { generateTemplate1 } from '../templates/Template1';
import { generateTemplate2 } from '../templates/Template2';
import { generateTemplate3 } from '../templates/Template3';
import { generateTemplate4 } from '../templates/Template4';

/**
 * Generate a PDF resume based on selected template.
 * @param {Object} resumeData - The data to populate the resume.
 * @param {String} fileName - The file name for the downloaded PDF.
 * @param {String} templateId - The selected template ID (e.g., 'T1', 'T2').
 */
 export function generatePDF(resumeData, fileName, templateId) {
    const doc = new jsPDF();

    switch (templateId) {
        case "T1":
            generateTemplate1(doc, resumeData);
            break;
        
        case "T2":
            generateTemplate2(doc, resumeData);
            break;
        
        case "T3":
            generateTemplate3(doc, resumeData);
            break;

        case "T4":
            generateTemplate4(doc, resumeData);
            break;

        default:
            generateTemplate1(doc, resumeData); // Default to Template 1 if not specified
    }

    // Save/Download
    doc.save(`${fileName || "Resume"}.pdf`);
}