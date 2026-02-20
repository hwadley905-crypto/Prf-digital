<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Advanced Practice PRF</title>
<style>
:root{
  /* Default Dark Mode */
  --primary:#2979ff;
  --bg:#121212;
  --card-bg:#1E1E1E;
  --text:#E0E0E0;
  --border:#333;
  --divider:#2A2A2A;
  --green:#2e7d32;
  --amber:#f9a825;
  --red:#c62828;
  --highlight:#2979ff;
}
body{
  margin:0;
  font-family:Arial,Helvetica,sans-serif;
  background:var(--bg);
  color:var(--text);
}
.container{max-width:1000px;margin:25px auto;padding:20px;}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.logo{background:var(--primary);color:white;padding:8px 14px;border-radius:4px;font-weight:700;font-size:14px;}
h1{margin:0;font-size:18px;color:var(--primary);}
button{background:var(--primary);color:white;border:none;padding:8px 14px;border-radius:4px;cursor:pointer;font-weight:600;}
.section{background:var(--card-bg);padding:18px;margin-bottom:18px;border:1px solid var(--border);border-left:5px solid var(--primary);border-radius:6px;transition:0.3s;}
.section h2{margin:0 0 12px 0;font-size:15px;color:var(--primary);padding-bottom:6px;border-bottom:1px solid var(--divider);}
.field{margin-bottom:14px;}
label{font-size:13px;font-weight:600;display:block;margin-bottom:5px;}
textarea{width:100%;min-height:55px;resize:none;overflow:hidden;padding:10px;border-radius:4px;border:1px solid var(--border);background:var(--card-bg);color:var(--text);font-size:14px;line-height:1.4;box-sizing:border-box;}
input, select{width:100%;padding:6px;margin-bottom:8px;border-radius:4px;border:1px solid var(--border);box-sizing:border-box;font-size:14px;background:var(--card-bg);color:var(--text);}
.checkbox-group{display:flex;flex-wrap:wrap;gap:20px;margin-top:8px;}
.checkbox-group label{font-weight:500;}
.signature-box{height:100px;border:1px solid var(--border);border-radius:4px;background:var(--card-bg);cursor:crosshair;}
.small-note{font-size:12px;color:#aaa;margin-bottom:8px;}
.result-box{font-weight:700;font-size:18px;margin-top:10px;}
.low-risk{border-left-color:var(--green);}
.medium-risk{border-left-color:var(--amber);}
.high-risk{border-left-color:var(--red);}
.sepsis-box{display:none;background:#330000;border:1px solid var(--red);padding:15px;margin-top:15px;border-radius:6px;}
.sepsis-box h3{margin-top:0;color:var(--red);}
.image-preview{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;}
.image-preview img{width:120px;border:1px solid var(--border);border-radius:4px;}
table{width:100%;border-collapse:collapse;margin-bottom:10px;background:var(--card-bg);color:var(--text);}
th,td{border:1px solid var(--border);padding:6px;text-align:center;font-size:13px;}
th{background:var(--divider);}
.add-row-btn{margin-top:6px;background:var(--highlight);color:white;}
@media print{button,input[type=file]{display:none;}.section{page-break-inside:avoid;}}
</style>
</head>
<body>
<div class="container">
<header>
  <div style="display:flex;align-items:center;gap:12px;">
    <div class="logo">PRF</div>
    <h1>Practice PRF</h1>
  </div>
  <div style="display:flex;gap:8px;">
    <button onclick="window.print()">Print / Save PDF</button>
    <button id="modeToggle" onclick="toggleMode()">Switch to Light Mode</button>
  </div>
</header>

<!-- 1. Clinician Details -->
<section class="section">
<h2>Clinician Details</h2>
<div class="field"><textarea class="auto" placeholder="Clinician notes / team ID"></textarea></div>
</section>

<!-- 2. Call History -->
<section class="section">
<h2>Call History / Incident Details</h2>
<div class="field"><textarea class="auto"></textarea></div>
</section>

<!-- 3. Patient Details -->
<section class="section">
<h2>Patient Details</h2>
<div class="field"><label>Date of Birth</label><input type="date"></div>
<div class="field"><label>Allergies</label><textarea class="auto"></textarea></div>
<div class="field"><label>Next of Kin</label><textarea class="auto"></textarea></div>
<div class="field"><label>Capacity? RESPECT Form</label><textarea class="auto"></textarea></div>
<div class="field"><label>DNAR Form</label><textarea class="auto"></textarea></div>
<div class="field"><label>Patient Medications</label><textarea class="auto"></textarea></div>
<div class="field"><label>Past Medical History</label><textarea class="auto"></textarea></div>
<div class="field"><label>History of Presenting Complaint</label><textarea class="auto"></textarea></div>
<label>Add Medical History Image</label>
<input type="file" accept="image/*" multiple onchange="previewImages(event,'historyPreview')">
<div class="image-preview" id="historyPreview"></div>
</section>

<!-- 4. Primary Survey -->
<section class="section">
<h2>Primary Survey – DRCABCDE</h2>
<div class="field"><label>(D) Danger and SMART Assessment</label><textarea class="auto"></textarea></div>
<div class="field"><label>(R) Responsiveness</label><textarea class="auto"></textarea></div>
<div class="field"><label>(C) Catastrophic Haemorrhage, C-Spine and Trauma</label><textarea class="auto"></textarea></div>
<div class="field"><label>(A) Airway</label><textarea class="auto"></textarea></div>
<div class="field"><label>(B) Breathing</label><textarea class="auto"></textarea></div>
<div class="field"><label>(C) Circulation</label><textarea class="auto"></textarea></div>
<div class="field"><label>(D) Disability</label><textarea class="auto"></textarea></div>
<div class="field"><label>(E) Exposure</label><textarea class="auto"></textarea></div>
</section>

<!-- 5. GCS -->
<section class="section">
<h2>GCS Calculator</h2>
<label>Eye Response</label><select id="eye" onchange="calculateGCS()">
<option value="4">4 – Spontaneous</option>
<option value="3">3 – To Voice</option>
<option value="2">2 – To Pain</option>
<option value="1">1 – None</option>
</select>
<label>Verbal Response</label><select id="verbal" onchange="calculateGCS()">
<option value="5">5 – Oriented</option>
<option value="4">4 – Confused</option>
<option value="3">3 – Inappropriate Words</option>
<option value="2">2 – Incomprehensible</option>
<option value="1">1 – None</option>
</select>
<label>Motor Response</label><select id="motor" onchange="calculateGCS()">
<option value="6">6 – Obeys Commands</option>
<option value="5">5 – Localises Pain</option>
<option value="4">4 – Withdraws</option>
<option value="3">3 – Flexion</option>
<option value="2">2 – Extension</option>
<option value="1">1 – None</option>
</select>
<div class="result-box">Total GCS: <span id="gcsScore">15</span></div>
</section>

<!-- 6. NEWS2 -->
<section class="section">
<h2>NEWS2 & Sepsis Monitoring</h2>
<label>Respiratory Rate</label><input type="number" id="rr" oninput="calculateNEWS2()">
<label>Oxygen Saturation (%)</label><input type="number" id="spo2" oninput="calculateNEWS2()">
<label>Temperature (°C)</label><input type="number" step="0.1" id="temp" oninput="calculateNEWS2()">
<label>Systolic BP (mmHg)</label><input type="number" id="sbp" oninput="calculateNEWS2()">
<label>Heart Rate (bpm)</label><input type="number" id="hr" oninput="calculateNEWS2()">
<label>Consciousness</label>
<select id="acvpu" onchange="calculateNEWS2()">
<option value="0">Alert</option>
<option value="3">C/V/P/U</option>
</select>
<div class="result-box">NEWS2 Score: <span id="newsScore">0</span></div>
<div id="riskText"></div>
<div class="sepsis-box" id="sepsisBox">
<h3>🚨 Sepsis Screening Tool</h3>
<textarea placeholder="Suspected source of infection" class="auto"></textarea>
<h4>Sepsis 6 Checklist</h4>
<label><input type="checkbox"> High-flow Oxygen</label><br>
<label><input type="checkbox"> Blood Cultures</label><br>
<label><input type="checkbox"> IV Antibiotics</label><br>
<label><input type="checkbox"> IV Fluids</label><br>
<label><input type="checkbox"> Lactate Measurement</label><br>
<label><input type="checkbox"> Monitor Urine Output</label><br>
</div>
</section>

<!-- 7. Secondary Survey -->
<section class="section">
<h2>Secondary Survey</h2>
<div class="field"><label>Neurological</label><textarea class="auto"></textarea></div>
<div class="field"><label>Respiratory</label><textarea class="auto"></textarea></div>
<div class="field"><label>Cardiology and ECGs</label><textarea class="auto"></textarea></div>
<label>Add ECG / Cardiology Image</label>
<input type="file" accept="image/*" multiple onchange="previewImages(event,'ecgPreview')">
<div class="image-preview" id="ecgPreview"></div>
<div class="field"><label>Gastrointestinal</label><textarea class="auto"></textarea></div>
<div class="field"><label>Genitourinary</label><textarea class="auto"></textarea></div>
<div class="field"><label>Integumentary</label><textarea class="auto"></textarea></div>
<div class="field"><label>Musculo-skeletal</label><textarea class="auto"></textarea></div>
<div class="field"><label>Mental Health</label><textarea class="auto"></textarea></div>
<div class="field"><label>Trauma / Immobilisation</label><textarea class="auto"></textarea></div>
<div class="field"><label>Disease / Mechanism of Injury</label><textarea class="auto"></textarea></div>
<div class="field"><label>Working Diagnosis and Related Notes</label><textarea class="auto"></textarea></div>
</section>

<!-- 8. Patient Observations Table -->
<section class="section">
<h2>Patient Observations</h2>
<table id="obsTable">
<tr>
<th>Date</th><th>Time</th><th>Resp Rate</th><th>Pulse</th><th>SpO2</th><th>Temp</th><th>BP</th><th>HR</th><th>ETCO2</th><th>ACVPU</th><th>GCS</th><th>Pupils</th><th>NEWS2</th><th>APGARR</th><th>AVVV</th><th>FAST</th><th>Sepsis</th>
</tr>
<tr>
<td><input type="date"></td><td><input type="time"></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td>
</tr>
</table>
<button class="add-row-btn" onclick="addObsRow()">Add Observation Row</button>
</section>

<!-- 9. Interventions Table -->
<section class="section">
<h2>Interventions</h2>
<table id="interventionsTable">
<tr><th>Time</th><th>Type</th><th>Location</th><th>Outcome</th><th>Clinician</th><th>Reason</th></tr>
<tr><td><input type="time"></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td></tr>
</table>
<button class="add-row-btn" onclick="addInterventionRow()">Add Intervention Row</button>
</section>

<!-- 10. Drugs Administered Table -->
<section class="section">
<h2>Drugs Administered</h2>
<table id="drugsTable">
<tr><th>Name</th><th>Type</th><th>Location</th><th>Outcome</th><th>Reactions</th><th>Expiry</th><th>Batch Code</th></tr>
<tr><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input type="date"></td><td><input></td></tr>
</table>
<button class="add-row-btn" onclick="addDrugRow()">Add Drug Row</button>
</section>

<!-- 11. Body Map -->
<section class="section">
<h2>Body Map / Injury Documentation</h2>
<textarea placeholder="Describe injury locations..." class="auto"></textarea>
<label>Upload Body Map Image</label>
<input type="file" accept="image/*" multiple onchange="previewImages(event,'bodyPreview')">
<div class="image-preview" id="bodyPreview"></div>
</section>

<!-- 12. ATMIST -->
<section class="section">
<h2>ATMIST Pre-Alert</h2>
<textarea class="auto" rows="6">Age
Time of incident/onset
Mechanism / Complaint
Injuries / Info
Signs (vitals)
Treatment</textarea>
</section>

<!-- 13. Signature -->
<section class="section">
<h2>Signature</h2>
<canvas id="signatureCanvas" class="signature-box"></canvas>
<button onclick="clearSignature()">Clear Signature</button>
</section>

</div>

<script>
// Auto-expand textareas
document.querySelectorAll("textarea").forEach(t=>t.addEventListener("input",()=>{t.style.height="auto";t.style.height=t.scrollHeight+"px";}));

// Image preview
function previewImages(event,id){const preview=document.getElementById(id);preview.innerHTML="";Array.from(event.target.files).forEach(file=>{const img=document.createElement("img");img.src=URL.createObjectURL(file);preview.appendChild(img);});}

// Signature canvas
let canvas=document.getElementById("signatureCanvas"),ctx=canvas.getContext("2d"),drawing=false;
canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
canvas.addEventListener("mousedown",e=>{drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY);});
canvas.addEventListener("mousemove",e=>{if(drawing){ctx.lineTo(e.offsetX,e.offsetY);ctx.strokeStyle="white";ctx.lineWidth=2;ctx.stroke();}});
canvas.addEventListener("mouseup",()=>{drawing=false;}); canvas.addEventListener("mouseout",()=>{drawing=false;});
function clearSignature(){ctx.clearRect(0,0,canvas.width,canvas.height);}

// NEWS2 calculator
function scoreRR(rr){return rr<=8?3:rr<=11?1:rr<=20?0:rr<=24?2:3;}
function scoreSpO2(s){return s<=91?3:s<=93?2:s<=95?1:0;}
function scoreTemp(t){return t<=35?3:t<=36?1:t<=38?0:t<=39?1:2;}
function scoreSBP(s){return s<=90?3:s<=100?2:s<=110?1:s<=219?0:3;}
function scoreHR(h){return h<=40?3:h<=50?1:h<=90?0:h<=110?1:h<=130?2:3;}
function calculateNEWS2(){
let rr=parseFloat(document.getElementById("rr").value)||0;
let spo2=parseFloat(document.getElementById("spo2").value)||0;
let temp=parseFloat(document.getElementById("temp").value)||0;
let sbp=parseFloat(document.getElementById("sbp").value)||0;
let hr=parseFloat(document.getElementById("hr").value)||0;
let acvpu=parseInt(document.getElementById("acvpu").value)||0;
let total=scoreRR(rr)+scoreSpO2(spo2)+scoreTemp(temp)+scoreSBP(sbp)+scoreHR(hr)+acvpu;
document.getElementById("newsScore").innerText=total;
let sepsisBox=document.getElementById("sepsisBox"),riskText=document.getElementById("riskText");
let sepsisTrigger=(total>=5||rr>=22||hr>=90||temp>=38||temp<=36||sbp<=100);
if(sepsisTrigger){sepsisBox.style.display="block";riskText.innerHTML="<strong style='color:#c62828;'>Sepsis criteria met</strong>";} else {sepsisBox.style.display="none";riskText.innerHTML="";}
}

// GCS calculator
function calculateGCS(){
let eye=parseInt(document.getElementById("
