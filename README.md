<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Practice PRF</title>

<!-- Simple, subtle NHS-like blue: #005EB8 and softer variants -->
<style>
  :root{
    --nhs-blue: #005EB8;
    --nhs-blue-50: #e6f0fb;
    --page-bg: #ffffff;
    --muted: #4a4a4a;
    --card-shadow: 0 1px 4px rgba(0,0,0,0.08);
    --gap: 14px;
    --radius: 8px;
  }

  html,body{
    height:100%;
    margin:0;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: linear-gradient(180deg, var(--nhs-blue-50) 0%, #f7fbff 100%);
    color: #1a1a1a;
    -webkit-font-smoothing:antialiased;
  }

  .container{
    max-width:1100px;
    margin:28px auto;
    padding:18px;
  }

  header.app-header{
    display:flex;
    align-items:center;
    gap:12px;
    justify-content:space-between;
    margin-bottom:18px;
  }

  .brand{
    display:flex;
    gap:12px;
    align-items:center;
  }

  .logo{
    width:56px;
    height:56px;
    border-radius:10px;
    background:var(--nhs-blue);
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
    font-weight:700;
    box-shadow: var(--card-shadow);
  }

  h1.title{
    margin:0;
    font-size:18px;
    color:var(--nhs-blue);
  }
  .sub{
    color:var(--muted);
    font-size:13px;
  }

  .actions{
    display:flex;
    gap:8px;
    align-items:center;
  }
  button.btn{
    background:var(--nhs-blue);
    color:white;
    border:0;
    padding:8px 12px;
    border-radius:8px;
    cursor:pointer;
    font-weight:600;
    box-shadow: none;
  }
  button.btn.ghost{
    background:transparent;
    color:var(--nhs-blue);
    border:1px solid rgba(0,94,184,0.12);
  }

  /* Form card */
  .card{
    background:var(--page-bg);
    padding:16px;
    border-radius:12px;
    box-shadow: var(--card-shadow);
    margin-bottom:14px;
  }

  .section{
    margin-bottom:16px;
  }

  .section h2{
    margin:0 0 10px 0;
    color:var(--nhs-blue);
    font-size:15px;
  }

  label{
    display:block;
    font-size:13px;
    margin-bottom:6px;
    color:#333;
  }

  textarea.auto{
    width:100%;
    min-height:44px;
    max-height:600px;
    resize:none;
    overflow:hidden;
    padding:10px;
    border-radius:8px;
    border:1px solid #e6eefc;
    background: #fbfdff;
    font-size:14px;
    box-sizing:border-box;
    line-height:1.4;
  }

  /* Two-column layout where required */
  .row{
    display:flex;
    gap:12px;
    flex-wrap:wrap;
  }
  .col{
    flex:1;
    min-width:220px;
  }
  .small{
    flex:0 0 160px;
  }

  /* Tables */
  .table-wrap{
    overflow:auto;
    border-radius:10px;
    border:1px solid rgba(0,0,0,0.06);
  }
  table.prf-table{
    width:100%;
    border-collapse:collapse;
    min-width:900px;
  }
  table.prf-table th, table.prf-table td{
    border-bottom:1px solid rgba(0,0,0,0.04);
    padding:6px;
    text-align:left;
    vertical-align:top;
    font-size:13px;
  }
  table.prf-table th{
    background: #fbfbfb;
    color:#333;
    font-weight:600;
    position:sticky;
    top:0;
    z-index:1;
  }
  .cell-input{
    width:100%;
    min-height:38px;
    max-height:400px;
    padding:6px;
    resize:none;
    overflow:hidden;
    border-radius:6px;
    border:1px solid #eef6ff;
    background:white;
    font-size:13px;
  }

  .table-controls{
    display:flex;
    gap:8px;
    align-items:center;
    margin-bottom:8px;
  }

  .row-controls{
    display:flex;
    gap:6px;
    align-items:center;
  }

  .tiny{
    padding:6px 8px;
    font-size:12px;
    border-radius:6px;
    background:#f3f6fb;
    border:1px solid rgba(0,94,184,0.06);
    color:var(--nhs-blue);
  }

  .muted{
    color:var(--muted);
    font-size:13px;
  }

  footer.note{
    text-align:center;
    color:var(--muted);
    margin-top:8px;
    font-size:13px;
  }

  /* responsive */
  @media (max-width:880px){
    .brand h1.title{font-size:16px;}
    .actions{flex-wrap:wrap;}
    .logo{width:46px;height:46px;}
  }
</style>
</head>
<body>
  <div class="container">
    <header class="app-header">
      <div class="brand">
        <div class="logo">PRF</div>
        <div>
          <h1 class="title">Practice PRF</h1>
          <div class="sub">WMAS-style patient report form — blue & white theme</div>
        </div>
      </div>

      <div class="actions">
        <button class="btn" id="btnPrint" title="Print">🖨️ Print</button>
        <button class="btn" id="btnPdf" title="Download PDF">⬇️ Download PDF</button>
        <button class="btn ghost" id="btnReset" title="Clear form">Reset</button>
      </div>
    </header>

    <main id="prfRoot">
      <!-- 1 Clinician details -->
      <section class="card section" id="clinicianSection">
        <h2>Clinician details</h2>
        <label for="clinicianText">Details</label>
        <textarea id="clinicianText" class="auto" placeholder="Enter clinician name, station, role, contact..."></textarea>
      </section>

      <!-- 2 Call history and incident details -->
      <section class="card section" id="callHistorySection">
        <h2>Call history and incident details</h2>
        <label for="callHistoryText">Details</label>
        <textarea id="callHistoryText" class="auto" placeholder="Call timeline, dispatch notes, incident location or details..."></textarea>
      </section>

      <!-- 3 Patient details -->
      <section class="card section" id="patientDetailsSection">
        <h2>Patient details</h2>

        <div class="row">
          <div class="col">
            <label for="dob">Date of birth</label>
            <input id="dob" type="date" style="padding:8px;border-radius:8px;border:1px solid #e8f1ff;width:100%;box-sizing:border-box" />
          </div>

          <div class="col">
            <label for="allergies">Allergies</label>
            <textarea id="allergies" class="auto" placeholder="List allergies..."></textarea>
          </div>

          <div class="col">
            <label for="nok">Next of kin</label>
            <textarea id="nok" class="auto" placeholder="Name / contact / relationship"></textarea>
          </div>
        </div>

        <div style="height:10px"></div>

        <div class="row">
          <div class="col small">
            <label for="capacity">Capacity?</label>
            <select id="capacity" style="padding:9px;border-radius:8px;border:1px solid #e8f1ff;width:100%;box-sizing:border-box">
              <option value="">Select...</option>
              <option>Capacitous</option>
              <option>Not capacitous</option>
              <option>Fluctuating capacity</option>
            </select>
          </div>

          <div class="col">
            <label for="respect">RESPECT form</label>
            <textarea id="respect" class="auto" placeholder="RESPECT form details..."></textarea>
          </div>

          <div class="col">
            <label for="dnar">DNAR form</label>
            <textarea id="dnar" class="auto" placeholder="DNAR details..."></textarea>
          </div>
        </div>

        <div style="height:10px"></div>

        <label for="meds">Patient medications</label>
        <textarea id="meds" class="auto" placeholder="Regular meds, PRN meds, doses..."></textarea>

        <div style="height:10px"></div>

        <label for="pmh">Past medical history</label>
        <textarea id="pmh" class="auto" placeholder="Relevant PMH..."></textarea>

        <div style="height:10px"></div>

        <label for="hpc">History of presenting complaint</label>
        <textarea id="hpc" class="auto" placeholder="Presenting complaint, timeline, mechanism..."></textarea>
      </section>

      <!-- 4 Primary Survey -->
      <section class="card section" id="primarySurvey">
        <h2>Primary Survey</h2>
        <div class="row">
          <!-- D R C A B C D E (8 boxes) -->
          <div class="col small">
            <label for="ps-D">D</label>
            <textarea id="ps-D" class="auto" placeholder="D..."></textarea>
          </div>
          <div class="col small">
            <label for="ps-R">R</label>
            <textarea id="ps-R" class="auto" placeholder="R..."></textarea>
          </div>
          <div class="col small">
            <label for="ps-C1">C</label>
            <textarea id="ps-C1" class="auto" placeholder="C..."></textarea>
          </div>
          <div class="col small">
            <label for="ps-A">A</label>
            <textarea id="ps-A" class="auto" placeholder="A..."></textarea>
          </div>
          <div class="col small">
            <label for="ps-B">B</label>
            <textarea id="ps-B" class="auto" placeholder="B..."></textarea>
          </div>
          <div class="col small">
            <label for="ps-C2">C</label>
            <textarea id="ps-C2" class="auto" placeholder="C..."></textarea>
          </div>
          <div class="col small">
            <label for="ps-D2">D</label>
            <textarea id="ps-D2" class="auto" placeholder="D..."></textarea>
          </div>
          <div class="col small">
            <label for="ps-E">E</label>
            <textarea id="ps-E" class="auto" placeholder="E..."></textarea>
          </div>
        </div>
      </section>

      <!-- 5 Secondary Survey -->
      <section class="card section" id="secondarySurvey">
        <h2>Secondary Survey</h2>

        <div class="row">
          <div class="col">
            <label>Neurological</label>
            <textarea class="auto" id="sec-neuro" placeholder="Neurological exam..."></textarea>
          </div>
          <div class="col">
            <label>Respiratory</label>
            <textarea class="auto" id="sec-resp" placeholder="Respiratory exam..."></textarea>
          </div>
        </div>

        <div style="height:8px"></div>

        <div class="row">
          <div class="col">
            <label>Gastrointestinal</label>
            <textarea class="auto" id="sec-gastro" placeholder="GI exam..."></textarea>
          </div>
          <div class="col">
            <label>Genitourinary</label>
            <textarea class="auto" id="sec-uro" placeholder="GU exam..."></textarea>
          </div>
        </div>

        <div style="height:8px"></div>

        <div class="row">
          <div class="col">
            <label>Integumentary</label>
            <textarea class="auto" id="sec-skin" placeholder="Skin..."></textarea>
          </div>
          <div class="col">
            <label>Musculo-skeletal</label>
            <textarea class="auto" id="sec-msk" placeholder="MSK..."></textarea>
          </div>
        </div>

        <div style="height:8px"></div>

        <div class="row">
          <div class="col">
            <label>Mental health</label>
            <textarea class="auto" id="sec-mental" placeholder="Mental state..."></textarea>
          </div>
          <div class="col">
            <label>Trauma / Immobilisation</label>
            <textarea class="auto" id="sec-trauma" placeholder="Trauma / immobilisation..."></textarea>
          </div>
        </div>

        <div style="height:8px"></div>

        <div class="row">
          <div class="col">
            <label>Disease</label>
            <textarea class="auto" id="sec-disease" placeholder="Underlying disease considerations..."></textarea>
          </div>
          <div class="col">
            <label>Mechanism of injury</label>
            <textarea class="auto" id="sec-mech" placeholder="Mechanism of injury..."></textarea>
          </div>
        </div>
      </section>

      <!-- 6 Patient observations (excel-style) -->
      <section class="card section" id="observationsSection">
        <h2>Patient observations</h2>
        <div class="table-controls">
          <div class="muted">Add/remove observations rows</div>
          <button class="tiny" onclick="addObservationRowAtEnd()">+ Add row</button>
          <button class="tiny" onclick="resetObservations()">Reset table</button>
        </div>

        <div class="table-wrap" id="obsTableWrap">
          <table class="prf-table" id="obsTable" aria-label="Observations table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Resp Rate</th>
                <th>Pulse Rate</th>
                <th>SpO₂</th>
                <th>Temp</th>
                <th>BG</th>
                <th>BP</th>
                <th>HR</th>
                <th>ETCO₂</th>
                <th>ACVPU</th>
                <th>GCS</th>
                <th>Pupils</th>
                <th>NEWS2</th>
                <th>APGARR</th>
                <th>AVVV</th>
                <th>FAST</th>
                <th>Sepsis</th>
                <th style="min-width:120px">Actions</th>
              </tr>
            </thead>
            <tbody id="obsTbody">
              <!-- initial sample row -->
              <tr>
                <td><input type="date" class="cell-input" /></td>
                <td><input type="time" class="cell-input" /></td>
                <td><textarea class="cell-input auto-row" placeholder=""></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td>
                  <div class="row-controls">
                    <button class="tiny" onclick="addObservationRowBelow(this)">Add below</button>
                    <button class="tiny" onclick="removeRow(this)">Remove</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 7 Interventions -->
      <section class="card section" id="interventionsSection">
        <h2>Interventions</h2>
        <div class="table-controls">
          <div class="muted">Each row: Time / Type / Location / Outcome / Clinician / Reason</div>
          <button class="tiny" onclick="addInterventionRowAtEnd()">+ Add row</button>
          <button class="tiny" onclick="resetInterventions()">Reset table</button>
        </div>

        <div class="table-wrap">
          <table class="prf-table" id="intTable">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Location</th>
                <th>Outcome</th>
                <th>Clinician</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="intTbody">
              <tr>
                <td><input type="time" class="cell-input"/></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td>
                  <div class="row-controls">
                    <button class="tiny" onclick="addInterventionRowBelow(this)">Add below</button>
                    <button class="tiny" onclick="removeRow(this)">Remove</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 8 Drugs list -->
      <section class="card section" id="drugsSection">
        <h2>Drugs list</h2>
        <div class="table-controls">
          <div class="muted">Each row: Name / Type / Location / Outcome / Reactions / Expiry / Batch</div>
          <button class="tiny" onclick="addDrugRowAtEnd()">+ Add row</button>
          <button class="tiny" onclick="resetDrugs()">Reset table</button>
        </div>

        <div class="table-wrap">
          <table class="prf-table" id="drugTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Outcome</th>
                <th>Reactions</th>
                <th>Expiry</th>
                <th>Batch code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="drugTbody">
              <tr>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td><input type="date" class="cell-input" /></td>
                <td><textarea class="cell-input auto-row"></textarea></td>
                <td>
                  <div class="row-controls">
                    <button class="tiny" onclick="addDrugRowBelow(this)">Add below</button>
                    <button class="tiny" onclick="removeRow(this)">Remove</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 9 Care Plan -->
      <section class="card section">
        <h2>Care Plan</h2>
        <label for="carePlan">Plan</label>
        <textarea id="carePlan" class="auto" placeholder="Care plan details..."></textarea>
      </section>

      <!-- 10 Any referrals made -->
      <section class="card section">
        <h2>Any referrals made</h2>
        <label for="referrals">Referrals</label>
        <textarea id="referrals" class="auto" placeholder="Details of any referrals..."></textarea>
      </section>

      <!-- 11 ROLE criteria -->
      <section class="card section">
        <h2>ROLE criteria</h2>
        <label for="roleCriteria">ROLE</label>
        <textarea id="roleCriteria" class="auto" placeholder="ROLE criteria notes..."></textarea>
      </section>

      <!-- 12 Call outcome and sign off -->
      <section class="card section">
        <h2>Call outcome and sign off</h2>
        <label for="outcome">Outcome / Sign off</label>
        <textarea id="outcome" class="auto" placeholder="Final outcome, signatures, times..."></textarea>
      </section>

      <footer class="note">Practice PRF — designed for copy/paste into GitHub. Use Print or Download PDF to export the filled form.</footer>
    </main>
  </div>

  <!-- html2pdf for PDF export -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>

  <script>
    // Auto-expand utility for textareas
    function autoExpand(el){
      if(!el) return;
      el.style.height = 'auto';
      // add small extra for padding
      el.style.height = (el.scrollHeight + 2) + 'px';
    }

    // Initialize auto-resize for existing textareas
    function initAutoExpand(){
      const autos = document.querySelectorAll('textarea.auto, textarea.auto-row, .cell-input[type="textarea"]');
      autos.forEach(t => {
        // apply initial sizing
        autoExpand(t);
        t.addEventListener('input', () => autoExpand(t));
      });
    }

    // For table "cell-input" textareas created later, use delegation to apply autoExpand on focus/input:
    document.addEventListener('input', function(e){
      if(e.target && e.target.matches('textarea.cell-input, textarea.auto-row, textarea.auto')){
        autoExpand(e.target);
      }
    });

    // Row operations (generic)
    function removeRow(btn){
      const tr = btn.closest('tr');
      if(!tr) return;
      const tbody = tr.parentElement;
      // if only one row left, just clear contents
      if(tbody.rows.length === 1){
        Array.from(tr.querySelectorAll('input, textarea')).forEach(i => {
          if(i.type==='date' || i.type==='time' || i.type==='text') i.value = '';
          else if(i.tagName.toLowerCase()==='textarea') i.value = '';
        });
        // adjust heights
        initAutoExpand();
        return;
      }
      tr.remove();
    }

    /* Observations table helpers */
    function addObservationRowBelow(btn){
      const tr = btn.closest('tr');
      const tbody = document.getElementById('obsTbody');
      const newRow = tr.cloneNode(true);
      // clear inputs in clone
      clearRowInputs(newRow);
      tbody.insertBefore(newRow, tr.nextSibling);
      initAutoExpand();
    }
    function addObservationRowAtEnd(){
      const tbody = document.getElementById('obsTbody');
      const template = tbody.rows[tbody.rows.length-1];
      const newRow = template.cloneNode(true);
      clearRowInputs(newRow);
      tbody.appendChild(newRow);
      initAutoExpand();
    }
    function resetObservations(){
      const tbody = document.getElementById('obsTbody');
      tbody.innerHTML = '';
      // insert one blank row
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="date" class="cell-input" /></td>
        <td><input type="time" class="cell-input" /></td>
        ${Array(16).fill('<td><textarea class="cell-input auto-row"></textarea></td>').join('')}
        <td>
          <div class="row-controls">
            <button class="tiny" onclick="addObservationRowBelow(this)">Add below</button>
            <button class="tiny" onclick="removeRow(this)">Remove</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
      initAutoExpand();
    }

    /* Interventions */
    function addInterventionRowBelow(btn){
      const tr = btn.closest('tr');
      const tbody = document.getElementById('intTbody');
      const newRow = tr.cloneNode(true);
      clearRowInputs(newRow);
      tbody.insertBefore(newRow, tr.nextSibling);
      initAutoExpand();
    }
    function addInterventionRowAtEnd(){
      const tbody = document.getElementById('intTbody');
      const template = tbody.rows[tbody.rows.length-1];
      const newRow = template.cloneNode(true);
      clearRowInputs(newRow);
      tbody.appendChild(newRow);
      initAutoExpand();
    }
    function resetInterventions(){
      const tbody = document.getElementById('intTbody');
      tbody.innerHTML = '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="time" class="cell-input" /></td>
        ${Array(5).fill('<td><textarea class="cell-input auto-row"></textarea></td>').join('')}
        <td>
          <div class="row-controls">
            <button class="tiny" onclick="addInterventionRowBelow(this)">Add below</button>
            <button class="tiny" onclick="removeRow(this)">Remove</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
      initAutoExpand();
    }

    /* Drugs */
    function addDrugRowBelow(btn){
      const tr = btn.closest('tr');
      const tbody = document.getElementById('drugTbody');
      const newRow = tr.cloneNode(true);
      clearRowInputs(newRow);
      tbody.insertBefore(newRow, tr.nextSibling);
      initAutoExpand();
    }
    function addDrugRowAtEnd(){
      const tbody = document.getElementById('drugTbody');
      const template = tbody.rows[tbody.rows.length-1];
      const newRow = template.cloneNode(true);
      clearRowInputs(newRow);
      tbody.appendChild(newRow);
      initAutoExpand();
    }
    function resetDrugs(){
      const tbody = document.getElementById('drugTbody');
      tbody.innerHTML = '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        ${Array(5).fill('<td><textarea class="cell-input auto-row"></textarea></td>').join('')}
        <td><input type="date" class="cell-input" /></td>
        <td><textarea class="cell-input auto-row"></textarea></td>
        <td>
          <div class="row-controls">
            <button class="tiny" onclick="addDrugRowBelow(this)">Add below</button>
            <button class="tiny" onclick="removeRow(this)">Remove</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
      initAutoExpand();
    }

    function clearRowInputs(row){
      Array.from(row.querySelectorAll('input')).forEach(inp => inp.value = '');
      Array.from(row.querySelectorAll('textarea')).forEach(ta => ta.value = '');
    }

    // Print and PDF
    document.getElementById('btnPrint').addEventListener('click', function(){
      window.print();
    });

    document.getElementById('btnPdf').addEventListener('click', function(){
      // Export the whole prfRoot container
      const element = document.getElementById('prfRoot');
      // basic options - set margins and scale for legibility
      const opt = {
        margin:       0.4,
        filename:     'practice_prf.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: -window.scrollY },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      // trigger
      html2pdf().set(opt).from(element).save();
    });

    // Reset form: clears everything
    document.getElementById('btnReset').addEventListener('click', function(){
      if(!confirm('Clear the entire form? This will remove all entered text.')) return;
      document.querySelectorAll('input').forEach(i => { if(i.type!=='button') i.value = ''; });
      document.querySelectorAll('textarea').forEach(t => t.value = '');
      // reset tables to single blank row
      resetObservations();
      resetInterventions();
      resetDrugs();
      initAutoExpand();
    });

    // When page loads
    window.addEventListener('DOMContentLoaded', function(){
      initAutoExpand();
      // ensure one blank table row in each table if multiple clones created by editing
      if(!document.querySelector('#obsTbody tr')) resetObservations();
      if(!document.querySelector('#intTbody tr')) resetInterventions();
      if(!document.querySelector('#drugTbody tr')) resetDrugs();
    });
  </script>
</body>
</html>


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
