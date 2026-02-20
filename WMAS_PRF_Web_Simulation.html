<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Advanced Practice PRF</title>

<style>
:root{
  --nhs-blue:#005EB8;
  --border:#cfddea;
  --divider:#e6eef6;
  --green:#2e7d32;
  --amber:#f9a825;
  --red:#c62828;
}

body{
  margin:0;
  font-family:Arial, Helvetica, sans-serif;
  background:#f4f7fb;
}

.container{
  max-width:1000px;
  margin:25px auto;
  padding:20px;
}

.section{
  background:white;
  padding:18px;
  margin-bottom:18px;
  border:1px solid var(--border);
  border-left:5px solid var(--nhs-blue);
  transition:0.3s ease;
}

.section h2{
  margin:0 0 10px 0;
  font-size:15px;
  color:var(--nhs-blue);
  border-bottom:1px solid var(--divider);
  padding-bottom:6px;
}

input, select, textarea{
  width:100%;
  padding:6px;
  margin-bottom:8px;
  border-radius:4px;
  border:1px solid var(--border);
  box-sizing:border-box;
  font-size:14px;
}

textarea{
  min-height:80px;
  resize:vertical;
}

.result-box{
  font-weight:bold;
  font-size:18px;
}

.low-risk{border-left-color:var(--green);}
.medium-risk{border-left-color:var(--amber);}
.high-risk{border-left-color:var(--red);}

.sepsis-box{
  display:none;
  background:#fff5f5;
  border:1px solid var(--red);
  padding:15px;
  margin-top:15px;
}

.sepsis-box h3{
  margin-top:0;
  color:var(--red);
}

.image-preview{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:10px;
}

.image-preview img{
  width:120px;
  border:1px solid var(--border);
  border-radius:4px;
}

button{
  background:var(--nhs-blue);
  color:white;
  border:none;
  padding:8px 14px;
  border-radius:4px;
  cursor:pointer;
}

@media print{
  button,input[type=file]{display:none;}
}
</style>
</head>

<body>
<div class="container">

<!-- NEWS2 -->
<section class="section" id="newsSection">
<h2>NEWS2 & Sepsis Monitoring</h2>

<label>Respiratory Rate</label>
<input type="number" id="rr" oninput="calculateNEWS2()">

<label>Oxygen Saturation (%)</label>
<input type="number" id="spo2" oninput="calculateNEWS2()">

<label>Temperature (°C)</label>
<input type="number" step="0.1" id="temp" oninput="calculateNEWS2()">

<label>Systolic BP (mmHg)</label>
<input type="number" id="sbp" oninput="calculateNEWS2()">

<label>Heart Rate (bpm)</label>
<input type="number" id="hr" oninput="calculateNEWS2()">

<label>Consciousness</label>
<select id="acvpu" onchange="calculateNEWS2()">
<option value="0">Alert</option>
<option value="3">C / V / P / U</option>
</select>

<div class="result-box">
NEWS2 Score: <span id="newsScore">0</span>
</div>

<div id="riskText"></div>

<!-- AUTO SEPSIS EXPANSION -->
<div class="sepsis-box" id="sepsisBox">
<h3>🚨 Sepsis Screening Tool</h3>

<label>Suspected Source of Infection</label>
<textarea placeholder="e.g. Chest / Urinary / Abdominal / Skin / Unknown"></textarea>

<h4>Sepsis 6 Checklist</h4>
<label><input type="checkbox"> High-flow Oxygen</label><br>
<label><input type="checkbox"> Blood Cultures</label><br>
<label><input type="checkbox"> IV Antibiotics</label><br>
<label><input type="checkbox"> IV Fluids</label><br>
<label><input type="checkbox"> Lactate Measurement</label><br>
<label><input type="checkbox"> Monitor Urine Output</label><br>

</div>

</section>

<!-- PATIENT MEDICAL HISTORY -->
<section class="section">
<h2>Patient Medical History</h2>
<textarea placeholder="PMH / Medications / Allergies"></textarea>

<label>Add Image Attachment</label>
<input type="file" accept="image/*" multiple onchange="previewImages(event,'historyPreview')">
<div class="image-preview" id="historyPreview"></div>
</section>

<!-- BODY MAP -->
<section class="section">
<h2>Body Map / Injury Documentation</h2>
<textarea placeholder="Describe injury locations..."></textarea>

<label>Upload Body Map Image</label>
<input type="file" accept="image/*" multiple onchange="previewImages(event,'bodyPreview')">
<div class="image-preview" id="bodyPreview"></div>
</section>

<!-- ECG SECTION -->
<section class="section">
<h2>Cardiology & ECG Documentation</h2>
<textarea placeholder="ECG interpretation notes..."></textarea>

<label>Upload ECG Strip Image</label>
<input type="file" accept="image/*" multiple onchange="previewImages(event,'ecgPreview')">
<div class="image-preview" id="ecgPreview"></div>
</section>

</div>

<script>

function scoreRR(rr){
  if(rr<=8) return 3;
  if(rr<=11) return 1;
  if(rr<=20) return 0;
  if(rr<=24) return 2;
  return 3;
}

function scoreSpO2(spo2){
  if(spo2<=91) return 3;
  if(spo2<=93) return 2;
  if(spo2<=95) return 1;
  return 0;
}

function scoreTemp(temp){
  if(temp<=35) return 3;
  if(temp<=36) return 1;
  if(temp<=38) return 0;
  if(temp<=39) return 1;
  return 2;
}

function scoreSBP(sbp){
  if(sbp<=90) return 3;
  if(sbp<=100) return 2;
  if(sbp<=110) return 1;
  if(sbp<=219) return 0;
  return 3;
}

function scoreHR(hr){
  if(hr<=40) return 3;
  if(hr<=50) return 1;
  if(hr<=90) return 0;
  if(hr<=110) return 1;
  if(hr<=130) return 2;
  return 3;
}

function calculateNEWS2(){

  let rr=parseFloat(document.getElementById("rr").value)||0;
  let spo2=parseFloat(document.getElementById("spo2").value)||0;
  let temp=parseFloat(document.getElementById("temp").value)||0;
  let sbp=parseFloat(document.getElementById("sbp").value)||0;
  let hr=parseFloat(document.getElementById("hr").value)||0;
  let acvpu=parseInt(document.getElementById("acvpu").value)||0;

  let total=scoreRR(rr)+scoreSpO2(spo2)+scoreTemp(temp)+scoreSBP(sbp)+scoreHR(hr)+acvpu;

  document.getElementById("newsScore").innerText=total;

  let sepsisBox=document.getElementById("sepsisBox");
  let riskText=document.getElementById("riskText");

  let sepsisTrigger = (
    total>=5 ||
    rr>=22 ||
    hr>=90 ||
    temp>=38 || temp<=36 ||
    sbp<=100
  );

  if(sepsisTrigger){
    sepsisBox.style.display="block";
    riskText.innerHTML="<strong style='color:#c62828;'>Sepsis criteria met – Immediate clinical review required.</strong>";
  }else{
    sepsisBox.style.display="none";
    riskText.innerHTML="";
  }

}

function previewImages(event,previewId){
  let preview=document.getElementById(previewId);
  preview.innerHTML="";
  for(let file of event.target.files){
    let reader=new FileReader();
    reader.onload=function(e){
      let img=document.createElement("img");
      img.src=e.target.result;
      preview.appendChild(img);
    }
    reader.readAsDataURL(file);
  }
}

</script>

</body>
</html>
