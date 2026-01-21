<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>University College Birmingham PRF Simulation</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body {
    font-family: Arial, sans-serif;
    background: #f4f6f8;
    margin: 0;
    padding: 20px;
    color: #222;
}
h1, h2 {
    background: #005eb8;
    color: white;
    padding: 10px;
    margin: 0 0 10px 0;
}
.section {
    background: white;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
}
label {
    display: block;
    margin-top: 8px;
    font-weight: bold;
}
input, textarea, select {
    width: 100%;
    padding: 6px;
    margin-top: 4px;
    box-sizing: border-box;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 3px;
}
.checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 12px;
}
.checkbox-group label {
    display: grid;
    grid-template-columns: 24px 1fr 120px; /* checkbox | text | note */
    align-items: center;
    gap: 8px;
    margin: 0;
    font-weight: normal;
}
/* ensure native checkbox doesn't add unexpected spacing */
.checkbox-group input[type="checkbox"] {
    margin: 0;
    width: 18px;
    height: 18px;
    justify-self: start;
}
textarea {
    min-height: 40px;
    height: auto;
    overflow: hidden; /* hide scrollbars because we auto-expand */
    resize: none; /* prevent manual resizing; auto-expand handles it */
}
.small {
    width: 120px;
}
.vitals {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
}
.footer {
    text-align: center;
    font-size: 0.9em;
    color: #555;
    margin-top: 12px;
}
.top-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
}
.top-actions button {
    background: #005eb8;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
}
.top-actions button.secondary {
    background: #6c757d;
}
.top-actions button:active { transform: translateY(1px); }

/* note box sits in the right column */
.checkbox-group .note {
    margin: 0;
    width: 120px;
    min-height: 40px;
    padding: 6px;
    border-radius: 3px;
    border: 1px solid #ccc;
    overflow: hidden;
    resize: none;
}

/* Responsive fallback on small screens */
@media (max-width: 600px) {
    .checkbox-group {
        grid-template-columns: 1fr;
    }
    /* collapse each label to two columns: checkbox + text; move note full width below */
    .checkbox-group label {
        grid-template-columns: 24px 1fr;
        grid-row-gap: 6px;
    }
    .checkbox-group .note {
        grid-column: 1 / -1;
        width: 100%;
    }
}

/* Print styles */
@media print {
    body {
        background: white;
        padding: 10mm;
        color: #000;
    }
    .top-actions, button {
        display: none !important;
    }
    .section {
        page-break-inside: avoid;
        border-radius: 0;
        box-shadow: none;
    }
}
</style>
</head>
<body>

<h1>University College Birmingham Patient Report Form – Training Simulation</h1>

<div class="top-actions">
    <button id="savePdf">Save as PDF</button>
    <button id="printBtn" class="secondary">Print</button>
    <button id="resetBtn" class="secondary">Clear Form</button>
</div>

<div class="section">
<h2>Incident Details</h2>
<label>Date <input type="date" id="date"></label>
<label>Time <input type="time" id="time"></label>
<label>Location <input type="text" id="location"></label>
<label>Incident Type
<select id="incidentType">
<option>Medical</option>
<option>Trauma</option>
<option>RTC</option>
<option>Mental Health</option>
<option>Other</option>
</select>
</label>
</div>

<div class="section">
<h2>Patient Details</h2>
<label>Name <input type="text" id="patientName"></label>
<label>DOB / Age <input type="text" id="dobAge"></label>
<label>NHS Number <input type="text" id="nhsNumber"></label>
<label>Sex
<select id="sex">
<option>Male</option>
<option>Female</option>
<option>Other</option>
<option>Unknown</option>
</select>
</label>
</div>

<div class="section">
<h2>Chief Complaint & History</h2>
<label>Chief Complaint<textarea class="auto-expand" id="chiefComplaint"></textarea></label>
<label>History of Presenting Complaint (HPC)<textarea class="auto-expand" id="hpc"></textarea></label>
</div>

<div class="section">
<h2>Primary Survey</h2>
<div class="checkbox-group">
<label><input type="checkbox" class="chk"> <span>Airway clear</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Airway compromised</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Breathing adequate</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Respiratory distress</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Circulation stable</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Haemorrhage controlled</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Disability assessed</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Exposure completed</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
</div>
</div>

<div class="section">
<h2>Observations</h2>
<div class="vitals">
<input placeholder="HR" id="hr">
<input placeholder="BP" id="bp">
<input placeholder="RR" id="rr">
<input placeholder="SpO₂" id="spo2">
<input placeholder="Temp" id="temp">
<input placeholder="GCS" id="gcs">
<input placeholder="BM" id="bm">
</div>
</div>

<div class="section">
<h2>Treatment & Interventions</h2>
<div class="checkbox-group">
<label><input type="checkbox" class="chk"> <span>Oxygen</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>IV access</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Analgesia</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Anti-emetic</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Immobilisation</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Fluids</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>ECG</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Other</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
</div>
<label>Details<textarea class="auto-expand" id="treatmentDetails"></textarea></label>
</div>

<div class="section">
<h2>Safeguarding & Capacity</h2>
<div class="checkbox-group">
<label><input type="checkbox" class="chk"> <span>Capacity present</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Capacity lacking</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Safeguarding concern</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Mental health crisis</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Alcohol involved</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
<label><input type="checkbox" class="chk"> <span>Drugs involved</span> <textarea class="note auto-expand small" placeholder="notes"></textarea></label>
</div>
</div>

<div class="section">
<h2>Conveyance Decision</h2>
<div class="checkbox-group">
<label><input type="checkbox" id="conveyED"> Conveyed to ED</label>
<label><input type="checkbox" id="referredGP"> Referred to GP</label>
<label><input type="checkbox" id="referredUTC"> Referred to UTC</label>
<label><input type="checkbox" id="leftScene"> Left at scene</label>
<label><input type="checkbox" id="refused"> Patient refused conveyance</label>
</div>
<label>Decision Rationale<textarea class="auto-expand" id="decisionRationale"></textarea></label>
</div>

<div class="section">
<h2> Handover and transport notes</h2>
<textarea class="auto-expand" id="atmist"></textarea>
</div>

<div class="section">
<h2>Clinician Details</h2>
<label>Name <input type="text" id="clinicianName"></label>
<label>Role / HCPC Number <input type="text" id="clinicianRole"></label>
</div>

<div class="footer">
UCB PRF Simulation • Training use only • Not for live clinical use
</div>

<!-- html2pdf library from CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>

<script>
// Auto-expand textareas with class "auto-expand"
function autoExpandTextarea(textarea) {
    // Reset height to compute scrollHeight correctly
    textarea.style.height = 'auto';
    // Add a little extra so there's no cutting at the bottom
    textarea.style.height = (textarea.scrollHeight + 2) + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
    var textareas = document.querySelectorAll('textarea.auto-expand');
    textareas.forEach(function(t) {
        // Initialize height based on content (useful when loading filled data)
        autoExpandTextarea(t);
        // Adjust height on input
        t.addEventListener('input', function() { autoExpandTextarea(t); });
        // Also adjust on paste
        t.addEventListener('paste', function() {
            // Delay to let paste complete
            setTimeout(function() { autoExpandTextarea(t); }, 0);
        });
    });

    // Save as PDF button (uses html2pdf)
    var saveBtn = document.getElementById('savePdf');
    saveBtn.addEventListener('click', function() {
        // Temporarily expand all textareas to ensure content is fully captured
        var allTextareas = document.querySelectorAll('textarea');
        allTextareas.forEach(function(ta) {
            ta.style.height = 'auto';
            ta.style.height = (ta.scrollHeight + 2) + 'px';
        });

        // Options for html2pdf
        var opt = {
            margin:       10,                // mm
            filename:     'UCB_PRF_Simulation.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Choose the content you want to save - here we save the whole body.
        var element = document.body;

        // Use html2pdf to create the PDF and prompt download
        html2pdf().set(opt).from(element).save().catch(function(err){
            // Fallback: open print dialog if html2pdf fails
            console.error('html2pdf error:', err);
            window.print();
        });
    });

    // Print button - opens print dialog
    var printBtn = document.getElementById('printBtn');
    printBtn.addEventListener('click', function() {
        // Expand textareas first
        var allTextareas = document.querySelectorAll('textarea');
        allTextareas.forEach(function(ta) {
            ta.style.height = 'auto';
            ta.style.height = (ta.scrollHeight + 2) + 'px';
        });
        window.print();
    });

    // Reset / Clear form
    var resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', function() {
        if (!confirm('Clear all fields? This cannot be undone.')) return;
        var fields = document.querySelectorAll('input, textarea, select');
        fields.forEach(function(f) {
            if (f.type === 'checkbox' || f.type === 'radio') {
                f.checked = false;
            } else {
                f.value = '';
            }
        });
        // reset textareas heights
        var allTextareas = document.querySelectorAll('textarea');
        allTextareas.forEach(function(ta) {
            ta.style.height = '';
        });
    });
});
</script>

</body>
</html>
