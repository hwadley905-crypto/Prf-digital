<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WMAS Practice PRF</title>
<style>
:root{
  --primary:#005EB8; --bg:#f4f7fb; --card-bg:#fff; --text:#111; --border:#cfddea; --divider:#e6eef6;
  --green:#2e7d32; --amber:#f9a825; --red:#c62828;
}
body.dark{
  --bg:#1e1e1e; --card-bg:#2a2a2a; --text:#e0e0e0; --border:#555; --divider:#444;
}
body{margin:0;font-family:Arial,Helvetica,sans-serif;background:var(--bg);color:var(--text);}
.container{max-width:1000px;margin:25px auto;padding:20px;}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.logo{background:var(--primary);color:white;padding:8px 14px;border-radius:4px;font-weight:700;font-size:14px;}
h1{margin:0;font-size:18px;color:var(--primary);}
button{background:var(--primary);color:white;border:none;padding:8px 14px;border-radius:4px;cursor:pointer;font-weight:600;}
.section{background:var(--card-bg);padding:18px;margin-bottom:18px;border:1px solid var(--border);border-left:5px solid var(--primary);border-radius:6px;transition:0.3s;}
.section h2{margin:0 0 12px 0;font-size:15px;color:var(--primary);padding-bottom:6px;border-bottom:1px solid var(--divider);}
.field{margin-bottom:14px;}
label{font-size:13px;font-weight:600;display:block;margin-bottom:5px;}
textarea,input,select{width:100%;padding:6px;margin-bottom:8px;border-radius:4px;border:1px solid var(--border);box-sizing:border-box;font-size:14px;background:var(--card-bg);color:var(--text);}
textarea{resize:none;overflow:hidden;min-height:50px;}
.signature-box{height:120px;border:1px solid var(--border);border-radius:4px;background:var(--card-bg);cursor:crosshair;}
.result-box{font-weight:700;font-size:18px;margin-top:10px;}
.sepsis-box{display:none;background:#330000;border:1px solid var(--red);padding:15px;margin-top:15px;border-radius:6px;}
.sepsis-box h3{margin-top:0;color:var(--red);}
.image-preview{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;}
.image-preview img{width:120px;border:1px solid var(--border);border-radius:4px;}
table{width:100%;border-collapse:collapse;margin-bottom:10px;background:var(--card-bg);color:var(--text);}
th,td{border:1px solid var(--border);padding:6px;text-align:center;font-size:13px;}
th{background:var(--divider);}
.add-row-btn{margin-top:6px;background:var(--primary);color:white;}
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
    <button id="modeToggle">Toggle Dark/Light</button>
  </div>
</header>

<!-- Clinician Details -->
<section class="section"><h2>Clinician Details</h2>
<div class="field"><textarea class="auto" placeholder="Clinician notes / team ID"></textarea></div>
</section>

<!-- Call History -->
<section class="section"><h2>Call History / Incident Details</h2>
<div class="field"><textarea class="auto"></textarea></div>
</section>

<!-- Patient Details -->
<section class="section"><h2>Patient Details</h2>
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

<!-- Primary Survey -->
<section class="section"><h2>Primary Survey – DRCABCDE</h2>
<div class="field"><label>(D) Danger & SMART Assessment</label><textarea class="auto"></textarea></div>
<div class="field"><label>(R) Responsiveness</label><textarea class="auto"></textarea></div>
<div class="field"><label>(C) Catastrophic Haemorrhage / C-Spine</label><textarea class="auto"></textarea></div>
<div class="field"><label>(A) Airway</label><textarea class="auto"></textarea></div>
<div class="field"><label>(B) Breathing</label><textarea class="auto"></textarea></div>
<div class="field"><label>(C) Circulation</label><textarea class="auto"></textarea></div>
<div class="field"><label>(D) Disability</label><textarea class="auto"></textarea></div>
<div class="field"><label>(E) Exposure</label><textarea class="auto"></textarea></div>
</section>

<!-- GCS -->
<section class="section"><h2>GCS Calculator</h2>
<label>Eye Response</label><select id="eye"><option value="4">4 – Spontaneous</option><option value="3">3 – To Voice</option><option value="2">2 – To Pain</option><option value="1">1 – None</option></select>
<label>Verbal Response</label><select id="verbal"><option value="5">5 – Oriented</option><option value="4">4 – Confused</option><option value="3">3 – Inappropriate Words</option><option value="2">2 – Incomprehensible</option><option value="1">1 – None</option></select>
<label>Motor Response</label><select id="motor"><option value="6">6 – Obeys Commands</option><option value="5">5 – Localises Pain</option><option value="4">4 – Withdraws</option><option value="3">3 – Flexion</option><option value="2">2 – Extension</option><option value="1">1 – None</option></select>
<div class="result-box">Total GCS: <span id="gcsScore">15</span></div>
</section>

<!-- NEWS2 -->
<section class="section"><h2>NEWS2 & Sepsis Monitoring</h2>
<label>Respiratory Rate</label><input type="number" id="rr">
<label>Oxygen Saturation (%)</label><input type="number" id="spo2">
<label>Temperature (°C)</label><input type="number" step="0.1" id="temp">
<label>Systolic BP (mmHg)</label><input type="number" id="sbp">
<label>Heart Rate (bpm)</label><input type="number" id="hr">
<label>Consciousness</label><select id="acvpu"><option value="0">Alert</option><option value="3">C/V/P/U</option></select>
<div class="result-box">NEWS2 Score: <span id="newsScore">0</span></div>
<div id="riskText"></div>
<div class="sepsis-box" id="sepsisBox"><h3>🚨 Sepsis Screening Tool</h3>
<textarea class="auto" placeholder="Suspected source of infection"></textarea>
<h4>Sepsis 6 Checklist</h4>
<label><input type="checkbox"> High-flow Oxygen</label><br>
<label><input type="checkbox"> Blood Cultures</label><br>
<label><input type="checkbox"> IV Antibiotics</label><br>
<label><input type="checkbox"> IV Fluids</label><br>
<label><input type="checkbox"> Lactate Measurement</label><br>
<label><input type="checkbox"> Monitor Urine Output</label><br>
</div>
</section>

<!-- Secondary Survey -->
<section class="section"><h2>Secondary Survey</h2>
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

<!-- Patient Observations Table -->
<section class="section"><h2>Patient Observations</h2>
<table id="obsTable">
<tr>
<th>Date</th><th>Time</th><th>Resp Rate</th><th>Pulse</th><th>SpO2</th><th>Temp</th><th>BP</th><th>HR</th><th>ETCO2</th><th>ACVPU</th><th>GCS</th><th>Pupils</th><th>NEWS2</th>
</tr>
<tr>
<td><input type="date"></td><td><input type="time"></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td>
</tr>
</table>
<button class="add-row-btn" onclick="addObsRow()">Add Observation Row</button>
</section>

<!-- Interventions Table -->
<section class="section"><h2>Interventions</h2>
<table id="interventionsTable">
<tr><th>Time</th><th>Type</th><th>Location</th><th>Outcome</th><th>Clinician</th><th>Reason</th></tr>
<tr><td><input type="time"></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td></tr>
</table>
<button class="add-row-btn" onclick="addInterventionRow()">Add Intervention Row</button>
</section>

<!-- Drugs Table -->
<section class="section"><h2>Drugs Administered</h2>
<table id="drugsTable">
<tr><th>Name</th><th>Type</th><th>Location</th><th>Outcome</th><th>Reactions</th><th>Expiry</th><th>Batch Code</th></tr>
<tr><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input type="date"></td><td><input></td></tr>
</table>
<button class="add-row-btn" onclick="addDrugRow()">Add Drug Row</button>
</section>

<!-- Body Map -->
<section class="section"><h2>Body Map / Injury Documentation</h2>
<textarea placeholder="Describe injury locations..." class="auto"></textarea>
<label>Upload Body Map Image</label>
<input type="file" accept="image/*" multiple onchange="previewImages(event,'bodyPreview')">
<div class="image-preview" id="bodyPreview"></div>
</section>

<!-- ATMIST -->
<section class="section"><h2>ATMIST Pre-Alert</h2>
<textarea id="atmistBox" class="auto">Age&#10;Time of incident/onset&#10;Mechanism / Complaint&#10;Injuries / Info&#10;Signs (vitals)&#10;Treatment</textarea>
</section>

<!-- Outcome of case -->
<section class="section"><h2>Outcome of Case</h2>
<textarea class="auto"></textarea>
</section>

<!-- Signature -->
<section class="section"><h2>Sign Off</h2>
<div class="field"><label>Clinician Name</label><input type="text"></div>
<div class="field"><label>Role</label><input type="text"></div>
<div class="field"><label>Professional PIN</label><input type="text"></div>
<div class="field"><label>Date</label><input type="date"></div>
<div class="field"><label>Time</label><input type="time"></div>
<div class="field"><label>Signature</label><canvas id="signatureCanvas" class="signature-box"></canvas></div>
</section>

</div>

<script>
// Auto-expand textareas
document.querySelectorAll('textarea').forEach(t=>{
  t.style.height='auto';
  t.style.height=t.scrollHeight+'px';
  t.addEventListener('input',()=>{t.style.height='auto';t.style.height=t.scrollHeight+'px';});
});

// ATMIST placeholder clear
let atmist=document.getElementById('atmistBox');
atmist.addEventListener('focus',()=>{if(atmist.value.includes('Age')) atmist.value='';});

// Dark/light toggle
document.getElementById('modeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');});

// GCS calculator
['eye','verbal','motor'].forEach(id=>document.getElementById(id).addEventListener('change',()=>{
  let g=parseInt(document.getElementById('eye').value)+parseInt(document.getElementById('verbal').value)+parseInt(document.getElementById('motor').value);
  document.getElementById('gcsScore').innerText=g;
}));

// NEWS2 calculator
function scoreRR(r){return r<=8?3:r<=11?1:r<=20?0:r<=24?2:3;}
function scoreSpO2(s){return s<=91?3:s<=93?2:s<=95?1:0;}
function scoreTemp(t){return t<=35?3:t<=36?1:t<=38?0:t<=39?1:2;}
function scoreSBP(s){return s<=90?3:s<=100?2:s<=110?1:s<=219?0:3;}
function scoreHR(h){return h<=40?3:h<=50?1:h<=90?0:h<=110?1:h<=130?2:3;}
['rr','spo2','temp','sbp','hr','acvpu'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{
  let rr=parseFloat(document.getElementById('rr').value)||0,
      spo2=parseFloat(document.getElementById('spo2').value)||0,
      t=parseFloat(document.getElementById('temp').value)||0,
      sbp=parseFloat(document.getElementById('sbp').value)||0,
      hr=parseFloat(document.getElementById('hr').value)||0,
      acvpu=parseInt(document.getElementById('acvpu').value)||0,
      total=scoreRR(rr)+scoreSpO2(spo2)+scoreTemp(t)+scoreSBP(sbp)+scoreHR(hr)+acvpu,
      sepsisTrigger=(total>=5||rr>=22||hr>=90||t>=38||t<=36||sbp<=100);
  document.getElementById('newsScore').innerText=total;
  document.getElementById('sepsisBox').style.display=sepsisTrigger?'block':'none';
  document.getElementById('riskText').innerHTML=sepsisTrigger?"<strong style='color:#c62828;'>Sepsis criteria met</strong>":"";
}));

// Image preview
function previewImages(event,id){
  const preview=document.getElementById(id);
  preview.innerHTML='';
  for(const file of event.target.files){
   
