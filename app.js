'use strict';
const APP_VERSION='24.0.8';
window.PRF_APP_VERSION=APP_VERSION;
function showVersionFailure(details){
 document.body.innerHTML=`<main class="version-error"><h1>Application update incomplete</h1><p>The application files do not belong to the same release. No clinical form has been opened.</p><pre>${details}</pre><button onclick="location.reload()">Reload application</button></main>`;
 throw new Error(details);
}
function verifyReleaseVersions(){
 const htmlVersion=document.body?.dataset.appVersion||'missing';
 const cssVersion=getComputedStyle(document.documentElement).getPropertyValue('--prf-css-version').replace(/["']/g,'').trim()||'missing';
 if(htmlVersion!==APP_VERSION||cssVersion!==APP_VERSION)showVersionFailure(`HTML: ${htmlVersion}\nJavaScript: ${APP_VERSION}\nCSS: ${cssVersion}`);
 const badge=document.getElementById('versionBadge');if(badge)badge.textContent=`v${APP_VERSION}`;
}


// v15 startup controller: registered before the main PRF initialisation.
(() => {
  const onReady=()=>{
    const gate=document.getElementById('startupGate'),ready=document.getElementById('readyPanel'),loading=document.getElementById('loadingPanel'),yes=document.getElementById('readyYes'),no=document.getElementById('readyNo'),newCase=document.getElementById('startupNewCase'),openJson=document.getElementById('startupOpenJson'),stop=document.getElementById('startupStopEffects'),message=document.getElementById('startupMessage'),audio=document.getElementById('newIncidentAudio'),caseFile=document.getElementById('caseFile');
    if(!gate||!yes||!loading)return;
    const stopEffects=(text='')=>{audio.pause();audio.currentTime=0;gate.classList.add('effects-off');message.textContent=text;};
    const closeGate=()=>{stopEffects();gate.classList.add('is-closed');};
    yes.addEventListener('click',async()=>{ready.hidden=true;loading.hidden=false;gate.classList.remove('effects-off');message.textContent='Loading case options…';audio.loop=true;audio.currentTime=0;try{await audio.play();message.textContent='New Incident alert active';}catch(e){message.textContent='Audio file unavailable or blocked. Red and blue lights remain active.';}});
    no.addEventListener('click',()=>{ready.querySelector('p').textContent='The form remains locked until Yes is selected.';});
    stop.addEventListener('click',()=>stopEffects('Audio and lights stopped. Choose an option to continue.'));
    newCase.addEventListener('click',()=>{localStorage.removeItem('prf_current');localStorage.removeItem('prf_priority');localStorage.removeItem('prf_case_id');sessionStorage.setItem('prf_new_case_start','1');closeGate();location.reload();});
    openJson.addEventListener('click',()=>caseFile.click());
    caseFile.addEventListener('change',()=>{if(caseFile.files.length)closeGate();});
    if(sessionStorage.getItem('prf_new_case_start')==='1'){sessionStorage.removeItem('prf_new_case_start');closeGate();}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',onReady,{once:true});else onReady();
})();

const $=id=>document.getElementById(id);
const pages=['incident','patient','primary','secondary','observations','consent','trauma','interventions','drugs','als','outcome','signoff'];
const labels={incident:'Incident',patient:'Patient',primary:'Primary',secondary:'Secondary',observations:'Observ.',consent:'COI',trauma:'Trauma',interventions:'Intervent.',drugs:'Drugs',als:'ALS',outcome:'Outcome',signoff:'Sign off'};
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.nav-button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));$('pageTitle').textContent=labels[id];localStorage.setItem('prf_page',id);growAll();}
pages.forEach(id=>{const b=document.createElement('button');b.className='nav-button';b.dataset.page=id;b.textContent=labels[id];$('nav').appendChild(b);});
document.addEventListener('click',e=>{if(e.target.dataset.page)showPage(e.target.dataset.page);if(e.target.dataset.close)$(e.target.dataset.close).classList.remove('open');});
function grow(el){if(el?.tagName==='TEXTAREA'){el.style.height='auto';el.style.height=Math.max(34,el.scrollHeight)+'px';}}
function growAll(root=document){root.querySelectorAll('textarea').forEach(grow);}
new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1)growAll(n);}))).observe(document.body,{childList:true,subtree:true});
document.addEventListener('input',e=>{grow(e.target);updatePrimary();updateAlert();clearTimeout(window.saveTimer);window.saveTimer=setTimeout(saveDraft,250);});
window.addEventListener('beforeprint',growAll);
const schemas={incident:['Surge level','CAD Daily ID','Type','CAD ID','Call type','Building number / name','CAD call sign','Road name','Scene contact number','District','Reported condition','Town','Post-dispatch instructions','Postcode','Alerts','Incident notes'],patient:['Patient name','NHS number','Date of birth','Age','Address','Next of kin','Allergies','RESPECT / DNAR','GP details','Hoarding status'],secondary:['Neurological','Respiratory','Cardiology / ECG','Gastrointestinal','Genitourinary','Integumentary','Musculoskeletal','Mental health','Working diagnosis','Care plan'],outcome:['Outcome','Destination','ATMIST','SBAR','Pre-alert details','Persons accompanying patient'],sign:['Clinician name','Role','Professional PIN','Date','Time'],timings:['Call received','Mobile','At scene','Patient contact','Leave scene','At hospital','Handover complete']};
const key=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'_');
function buildGrid(id,items){items.forEach((label,i)=>{const d=document.createElement('div');d.className='field '+((i===items.length-1||/notes|ATMIST|SBAR/.test(label))?'span-2':'');d.innerHTML=`<label>${label}</label><textarea data-key="${key(label)}"></textarea>`;$(id).appendChild(d);});}
buildGrid('incidentGrid',schemas.incident);buildGrid('patientGrid',schemas.patient);buildGrid('secondaryGrid',schemas.secondary);buildGrid('outcomeGrid',schemas.outcome);buildGrid('timingsGrid',schemas.timings);
[['Category 1','category-1'],['Category 2','category-2'],['Category 3','category-3'],['Category 4','category-4']].forEach(([name,cls])=>{const b=document.createElement('button');b.className=`priority-option ${cls}`;b.textContent=name;b.onclick=()=>{document.querySelectorAll('.priority-option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');localStorage.setItem('prf_priority',name);saveDraft();};$('priorityGrid').appendChild(b);});
const primaryItems=[['D','Danger'],['R','Response'],['C','Catastrophic haemorrhage / C-spine'],['A','Airway'],['B','Breathing'],['C','Circulation'],['D','Disability'],['E','Exposure']];
primaryItems.forEach(([letter,label],i)=>{const row=document.createElement('div');row.className='primary-row';row.innerHTML=`<div class="primary-letter red" data-primary-status="${i}" role="button" tabindex="0" aria-label="${label}: click to toggle assessment status">${letter}<input type="checkbox" data-key="primary_status_${i}" hidden></div><div class="field"><label>${label}</label><textarea data-key="primary_${i}"></textarea></div>`;$('primaryRows').appendChild(row);});
function updatePrimary(){document.querySelectorAll('[data-primary-status]').forEach((box,i)=>{const checked=!!box.querySelector(`[data-key="primary_status_${i}"]`)?.checked;box.classList.toggle('red',!checked);box.classList.toggle('green',checked);box.setAttribute('aria-pressed',String(checked));});}
document.addEventListener('click',event=>{const box=event.target.closest('[data-primary-status]');if(!box)return;const input=box.querySelector('input[type="checkbox"]');if(!input)return;input.checked=!input.checked;updatePrimary();saveDraft();});
document.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-primary-status]')){event.preventDefault();event.target.click();}});
['Capacity assessed','Consent obtained','Best-interests decision','DNACPR / ReSPECT checked','Safeguarding considered'].forEach((text,i)=>$('consentChecks').insertAdjacentHTML('beforeend',`<label><input type="checkbox" data-key="consent_${i}">${text}</label>`));
const traumaSteps=[['Step 1 - Vital signs',['RR under 10 or over 29','Systolic BP under 90','GCS motor 5 or less']],['Step 2 - Anatomy',['Chest injury with new oxygen requirement','Major pelvic fracture','Penetrating injury above knee or elbow','Suspected skull fracture','Spinal injury with paralysis','Multiple long-bone fractures','Amputation / mangled limb','Open fracture','Burns over 20%']],['Step 3 - Mechanism',['High-speed collision','Pedestrian or cyclist struck','Ejection','Death in same compartment','Significant fall','Crush, blast or penetrating mechanism']],['Step 4 - Special factors',['Older or frail patient','Pregnancy','Anticoagulant / antiplatelet use','Bleeding disorder','Significant clinical concern']],['Silver Trauma - Entry and indicators',['Age 65+ with low-energy fall','SBP under 110','HR over 100','RR over 30','GCS under 15','Injury to more than two areas','Unable to straight-leg raise','Pain prevents cough or deep breath','Severe uncontrolled pain','Bleeding disorder or anticoagulants']],['Silver Trauma - Actions',['Senior clinician / trauma desk contacted','Destination selected','Pre-alert completed','Analgesia documented','Medication history documented']]];
traumaSteps.forEach((step,i)=>{const d=document.createElement('div');d.className='trauma-step';d.innerHTML=`<h3>${step[0]}</h3>`;step[1].forEach((text,j)=>d.insertAdjacentHTML('beforeend',`<label><input type="checkbox" data-key="trauma_${i}_${j}">${text}</label>`));(i<4?$('standardTraumaTool'):$('silverTraumaTool')).appendChild(d);});
function updateAlert(){const area=document.querySelector('[data-key="alerts"]');const has=!!area?.value.trim();$('alertBanner').textContent=has?'Alert':'No alerts';$('alertBanner').style.background=has?'#b11122':'#14833b';}
$('alertBanner').onclick=()=>{showPage('incident');setTimeout(()=>{const a=document.querySelector('[data-key="alerts"]');a.scrollIntoView({behavior:'smooth',block:'center'});a.focus();},60);};
function createTextCell(row,keyName,value='',type='text'){const td=row.insertCell();if(type==='time'){const i=document.createElement('input');i.type='time';i.dataset.col=keyName;i.value=value;td.appendChild(i);}else{const t=document.createElement('textarea');t.dataset.col=keyName;t.value=value;td.appendChild(t);grow(t);}return td;}
function deleteCell(row){const td=row.insertCell();const b=document.createElement('button');b.className='row-delete';b.textContent='×';b.onclick=()=>{row.remove();saveDraft();};td.appendChild(b);}
let activePickerButton=null;
function openPicker(title,options,button,multi=false){activePickerButton=button;$('pickerTitle').textContent=title;$('pickerChoices').innerHTML='';const current=new Set(button.dataset.values?JSON.parse(button.dataset.values):[]);options.forEach(value=>{const b=document.createElement('button');b.className='choice-button';b.textContent=value;b.classList.toggle('selected',current.has(value));b.onclick=()=>{if(multi){if(current.has(value))current.delete(value);else if(current.size<2)current.add(value);b.classList.toggle('selected',current.has(value));button.dataset.values=JSON.stringify([...current]);button.textContent=[...current].join(' / ')||'-';}else{button.textContent=value;button.dataset.values=JSON.stringify([value]);$('pickerModal').classList.remove('open');}saveDraft();};$('pickerChoices').appendChild(b);});$('pickerModal').classList.add('open');}
let activeGcs=null,activeNews=null;
let activePupil23=null;
function parsePupil23(text,side){const m=String(text||'').match(new RegExp('(10|[0-9])\\s*'+side,'i'));return m?m[1]:'4';}
function controlCell23(row,className,text,handler){const td=row.insertCell(),button=document.createElement('button');button.type='button';button.className=`table-button ${className}`;button.textContent=text??'-';button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();handler(button);});td.appendChild(button);return button;}
window.addObs=function(v={}){
 const row=$('obsTable').tBodies[0].insertRow();
 ['time','rr','spo2','bp','hr','temp','etco2','bm','ketones'].forEach(k=>createTextCell(row,k,v[k]||'',k==='time'?'time':'text'));
 const avpuButton=controlCell23(row,'avpu-button',v.avpu||'-',button=>openPicker('AVPU',['A - Alert','C - New confusion','V - Voice','P - Pain','U - Unresponsive'],button,false));
 const pupilButton=controlCell23(row,'pupil-button',v.pupils||'4L 4R',button=>window.openPupil23(button));
 pupilButton.dataset.left=String(v.pupilLeft??parsePupil23(v.pupils,'L'));pupilButton.dataset.right=String(v.pupilRight??parsePupil23(v.pupils,'R'));pupilButton.dataset.values=JSON.stringify([`${pupilButton.dataset.left}L`,`${pupilButton.dataset.right}R`]);pupilButton.textContent=`${pupilButton.dataset.left}L ${pupilButton.dataset.right}R`;
 const gcsButton=controlCell23(row,'gcs-button',v.gcs||'-',button=>{activeGcs=button;$('gcsModal').classList.add('open');refreshGcs();});
 const newsButton=controlCell23(row,'news-button',v.news2??'-',button=>window.openNews23(button));
 if(v.news2!==undefined&&v.news2!=='-')paintNews(newsButton,Number(v.news2),Boolean(v.newsRed));
 deleteCell(row);if(window.updateSepsis23)window.updateSepsis23();
};
const gcsData=[['Eye Opening',[['4: Spontaneous',4],['3: To verbal',3],['2: To pain',2],['1: No response',1]]],['Verbal Response',[['5: Oriented',5],['4: Confused',4],['3: Inappropriate',3],['2: Incomprehensible',2],['1: No response',1]]],['Motor Response',[['6: Obeys commands',6],['5: Localises pain',5],['4: Withdraws',4],['3: Flexion',3],['2: Extension',2],['1: No response',1]]]],gcsSelections={0:4,1:5,2:6};
gcsData.forEach((group,i)=>{const row=document.createElement('div');row.className='gcs-row';row.innerHTML=`<h3>${group[0]}</h3><div></div>`;group[1].forEach(([label,score])=>{const b=document.createElement('button');b.className='calc-choice';b.textContent=label;b.dataset.group=i;b.dataset.score=score;b.onclick=()=>{gcsSelections[i]=score;refreshGcs();};row.lastChild.appendChild(b);});$('gcsRows').appendChild(row);});
function refreshGcs(){document.querySelectorAll('[data-score]').forEach(b=>b.classList.toggle('selected',gcsSelections[b.dataset.group]===Number(b.dataset.score)));$('gcsTotal').textContent=Object.values(gcsSelections).reduce((a,b)=>a+b,0);}
$('gcsDone').onclick=()=>{activeGcs.textContent=$('gcsTotal').textContent;$('gcsModal').classList.remove('open');saveDraft();};
const newsRows=[['Respiration',[['8',3],['-',null],['9-11',1],['12-20',0],['-',null],['21-24',2],['25',3]]],['SpO2 Scale 1',[['91',3],['92-93',2],['94-95',1],['96',0],['-',null],['-',null],['-',null]]],['SpO2 Scale 2',[['83',3],['84-85',2],['86-87',1],['88-92 air',0],['93-94 O',1],['95-96 O',2],['97 O',3]]],['Air / oxygen',[['-',null],['-',null],['-',null],['Air',0],['-',null],['Oxygen',2],['-',null]]],['Systolic BP',[['90',3],['91-100',2],['101-110',1],['111-219',0],['-',null],['-',null],['220',3]]],['Heart rate',[['40',3],['-',null],['41-50',1],['51-90',0],['91-110',1],['111-130',2],['131',3]]],['Temperature',[['35.0',3],['-',null],['35.1-36.0',1],['36.1-38.0',0],['38.1-39.0',1],['39.1',2],['-',null]]],['Consciousness',[['-',null],['-',null],['-',null],['Alert',0],['-',null],['-',null],['CVPU',3]]]],newsSelections={};
newsRows.forEach((group,i)=>{const row=$('newsTable').tBodies[0].insertRow();row.insertCell().textContent=group[0];group[1].forEach(([label,score])=>{const td=row.insertCell();td.textContent=label;if(score!==null){td.className=`news-score-${score}`;td.onclick=()=>{newsSelections[i]=score;[...row.cells].forEach(c=>c.classList.remove('selected'));td.classList.add('selected');refreshNews();};}});});
function refreshNews(){$('newsTotal').textContent=Object.values(newsSelections).reduce((a,b)=>a+b,0);}
function paintNews(button,total,redScore=false){button.classList.remove('news-low','news-low-medium','news-medium','news-high');button.classList.add(total>=7?'news-high':total>=5?'news-medium':redScore?'news-low-medium':'news-low');}
$('newsDone').onclick=()=>{const total=Number($('newsTotal').textContent),red=Object.values(newsSelections).includes(3);activeNews.textContent=total;activeNews.dataset.redScore=red;paintNews(activeNews,total,red);$('newsModal').classList.remove('open');saveDraft();};
const tableColumns={interventions:['time','type','location','outcome','clinician','reason'],drugs:['time','drug','dose','route','location','outcome','reaction','clinician'],als:['time','event','shock','drug','clinician']};
window.addTableRow=function(name,v={}){const table=$(name+'Table'),row=table.tBodies[0].insertRow();tableColumns[name].forEach(k=>createTextCell(row,k,v[k]||'',k==='time'?'time':'text'));deleteCell(row);};
$('addObs').onclick=()=>addObs();$('addIntervention').onclick=()=>addTableRow('interventions');$('addDrug').onclick=()=>addTableRow('drugs');$('addAls').onclick=()=>addTableRow('als');
function previewFiles(input,output){output.innerHTML='';[...input.files].forEach(file=>{const r=new FileReader();r.onload=()=>{if(file.type.startsWith('image/')){const img=document.createElement('img');img.src=r.result;img.alt=file.name;output.appendChild(img);}else{const d=document.createElement('div');d.className='file-preview';d.textContent=file.name;output.appendChild(d);}};r.readAsDataURL(file);});}
$('ecgUpload').onchange=()=>previewFiles($('ecgUpload'),$('ecgPreview'));$('injuryUpload').onchange=()=>previewFiles($('injuryUpload'),$('injuryPreview'));$('showPpci').onclick=()=>$('ppciModal').classList.add('open');
$('timings').onclick=()=>$('timingsModal').classList.add('open');$('timingsDone').onclick=()=>{$('timingsModal').classList.remove('open');saveDraft();};$('printPdf').onclick=()=>{growAll();setTimeout(()=>window.print(),50);};
let timerInterval=null,timerStart=null,audioContext=null,metronomeInterval=null,metronomeSounding=false;
function formatElapsed(ms){const s=Math.floor(ms/1000),h=String(Math.floor(s/3600)).padStart(2,'0'),m=String(Math.floor((s%3600)/60)).padStart(2,'0'),sec=String(s%60).padStart(2,'0');return `${h}:${m}:${sec}`;}
function metronomeClick(){
  if(!audioContext||audioContext.state!=='running')return;
  const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(),now=audioContext.currentTime;
  oscillator.frequency.setValueAtTime(950,now);gain.gain.setValueAtTime(0.22,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.045);
  oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(now);oscillator.stop(now+0.05);
}
async function startMetronome(){
  audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();
  if(audioContext.state==='suspended')await audioContext.resume();
  clearInterval(metronomeInterval);metronomeSounding=true;
  const bpm=Number($('metronomeRate').value)||120,period=60000/bpm;
  metronomeClick();metronomeInterval=setInterval(metronomeClick,period);
  $('metronomeToggle').textContent='Pause sound';localStorage.setItem('prf_metronome_bpm',String(bpm));
}
function pauseMetronome(){clearInterval(metronomeInterval);metronomeInterval=null;metronomeSounding=false;$('metronomeToggle').textContent='Resume sound';}
function startTimer(start=Date.now(),withSound=true){timerStart=start;clearInterval(timerInterval);$('cprTimer').classList.remove('hidden');const tick=()=>$('timerValue').textContent=formatElapsed(Date.now()-timerStart);tick();timerInterval=setInterval(tick,1000);localStorage.setItem('prf_cpr_timer_start',String(start));if(withSound)startMetronome();}
$('metronomeRate').onchange=()=>{localStorage.setItem('prf_metronome_bpm',$('metronomeRate').value);if(metronomeSounding)startMetronome();};
$('metronomeToggle').onclick=()=>metronomeSounding?pauseMetronome():startMetronome();
$('startCpr').onclick=()=>{const now=new Date(),time=now.toTimeString().slice(0,5);$('cprStarted').value=time;addTableRow('als',{time,event:'CPR started'});showPage('als');startTimer(now.getTime(),true);saveDraft();};
$('closeTimer').onclick=()=>{$('cprTimer').classList.add('hidden');clearInterval(timerInterval);pauseMetronome();localStorage.removeItem('prf_cpr_timer_start');};
const clinicianCanvases=new Map();let clinicianCounter=0;
function setupClinicianCanvas(canvas){
  const ctx=canvas.getContext('2d');ctx.lineWidth=3;ctx.lineCap='round';let drawing=false;
  const point=e=>{const r=canvas.getBoundingClientRect();return[(e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height];};
  canvas.addEventListener('pointerdown',e=>{drawing=true;canvas.setPointerCapture(e.pointerId);ctx.beginPath();ctx.moveTo(...point(e));e.preventDefault();});
  canvas.addEventListener('pointermove',e=>{if(!drawing)return;ctx.lineTo(...point(e));ctx.stroke();e.preventDefault();});
  canvas.addEventListener('pointerup',e=>{drawing=false;saveDraft();e.preventDefault();});
  canvas.addEventListener('pointercancel',()=>drawing=false);clinicianCanvases.set(canvas.dataset.clinicianId,canvas);
}
function addClinicianCard(data={}){
  const id=data.id||`clinician_${++clinicianCounter}`;const card=document.createElement('div');card.className='clinician-card';card.dataset.clinicianId=id;
  card.innerHTML=`<div class="clinician-card-header"><h2>Clinician sign-off</h2><button type="button" class="remove-clinician">Remove clinician</button></div><div class="form-grid"><div class="field"><label>Clinician name</label><textarea data-clinician-field="name"></textarea></div><div class="field"><label>Role</label><textarea data-clinician-field="role"></textarea></div><div class="field"><label>Professional PIN</label><textarea data-clinician-field="pin"></textarea></div><div class="field"><label>Date</label><input type="date" data-clinician-field="date"></div><div class="field"><label>Time</label><input type="time" data-clinician-field="time"></div></div><canvas class="signature-canvas" width="800" height="180" data-clinician-id="${id}"></canvas><div class="clinician-controls"><button type="button" class="clear-clinician-signature">Clear signature</button></div>`;
  $('clinicianSignoffs').appendChild(card);Object.entries(data).forEach(([k,v])=>{const el=card.querySelector(`[data-clinician-field="${k}"]`);if(el)el.value=v||'';});
  const canvas=card.querySelector('canvas');setupClinicianCanvas(canvas);if(data.signature){const img=new Image();img.onload=()=>canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);img.src=data.signature;}
  card.querySelector('.clear-clinician-signature').onclick=()=>{canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);saveDraft();};
  card.querySelector('.remove-clinician').onclick=()=>{if(document.querySelectorAll('.clinician-card').length<=2){alert('At least two clinician sign-off forms must remain.');return;}clinicianCanvases.delete(id);card.remove();renumberClinicians();saveDraft();};
  growAll(card);renumberClinicians();return card;
}
function renumberClinicians(){document.querySelectorAll('.clinician-card').forEach((card,i)=>card.querySelector('h2').textContent=`Clinician ${i+1} sign-off`);}
function collectClinicians(){return [...document.querySelectorAll('.clinician-card')].map(card=>{const out={id:card.dataset.clinicianId};card.querySelectorAll('[data-clinician-field]').forEach(el=>out[el.dataset.clinicianField]=el.value);out.signature=card.querySelector('canvas').toDataURL();return out;});}
function restoreClinicians(items=[]){$('clinicianSignoffs').innerHTML='';clinicianCanvases.clear();clinicianCounter=0;(items.length?items:[{},{}]).forEach(addClinicianCard);while(document.querySelectorAll('.clinician-card').length<2)addClinicianCard();}
$('addClinician').onclick=()=>{addClinicianCard();saveDraft();};
$('showAlsGuidelines').onclick=()=>{const modal=$('alsGuidelinesModal'),frame=$('alsGuidelinesFrame');if(frame&&!frame.src)frame.src=frame.dataset.src;modal.classList.add('open');};
$('caseId').textContent=localStorage.getItem('prf_case_id')||`PRF-${Date.now().toString().slice(-8)}`;localStorage.setItem('prf_case_id',$('caseId').textContent);
function serializeRows(name){return [...$(name+'Table').tBodies[0].rows].map(row=>{const out={};row.querySelectorAll('[data-col]').forEach(x=>out[x.dataset.col]=x.value);if(name==='obs'){const av=row.querySelector('.avpu-button'),pu=row.querySelector('.pupil-button'),gc=row.querySelector('.gcs-button'),ne=row.querySelector('.news-button');out.avpu=av.textContent;out.pupils=pu.textContent;out.pupilLeft=pu.dataset.left;out.pupilRight=pu.dataset.right;out.pupilValues=JSON.parse(pu.dataset.values||'[]');out.gcs=gc.textContent;out.news2=ne.textContent;out.newsRed=ne.dataset.redScore==='true';}return out;});}
function collect(){const data={version:7,caseId:$('caseId').textContent,savedAt:new Date().toISOString(),priority:localStorage.getItem('prf_priority'),fields:{},obs:serializeRows('obs'),interventions:serializeRows('interventions'),drugs:serializeRows('drugs'),als:serializeRows('als'),clinicians:collectClinicians()};document.querySelectorAll('[data-key]').forEach(x=>data.fields[x.dataset.key]=x.type==='checkbox'?x.checked:x.value);return data;}
function saveDraft(){localStorage.setItem('prf_current',JSON.stringify(collect()));}
function populate(data){document.querySelectorAll('[data-key]').forEach(x=>{const v=data.fields?.[x.dataset.key];if(v!==undefined)x.type==='checkbox'?x.checked=!!v:x.value=v;});['obs','interventions','drugs','als'].forEach(n=>$(n+'Table').tBodies[0].innerHTML='');(data.obs||[]).forEach(addObs);(data.interventions||[]).forEach(v=>addTableRow('interventions',v));(data.drugs||[]).forEach(v=>addTableRow('drugs',v));(data.als||[]).forEach(v=>addTableRow('als',v));restoreClinicians(data.clinicians||[]);growAll();updatePrimary();updateAlert();}
$('saveCase').onclick=()=>{const data=collect(),name=prompt('Case name',data.fields.patient_name||data.caseId);if(!name)return;data.name=name;localStorage.setItem('prf_saved_'+Date.now(),JSON.stringify(data));alert('Case saved');};
$('openCase').onclick=()=>{const cases=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith('prf_saved_'))try{cases.push(JSON.parse(localStorage.getItem(k)));}catch{}}if(!cases.length){$('caseFile').click();return;}const n=Number(prompt(cases.map((c,i)=>`${i+1}. ${c.name||c.caseId}`).join('\n')));if(cases[n-1])populate(cases[n-1]);};
$('caseFile').onchange=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{populate(JSON.parse(r.result));}catch{alert('Invalid case file');}};r.readAsText(file);};
$('exportJson').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(collect(),null,2)],{type:'application/json'}));a.download=$('caseId').textContent+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
restoreClinicians();try{const current=localStorage.getItem('prf_current');if(current)populate(JSON.parse(current));}catch{}
if(!$('obsTable').tBodies[0].rows.length)addObs();if(!$('interventionsTable').tBodies[0].rows.length)addTableRow('interventions');if(!$('drugsTable').tBodies[0].rows.length)addTableRow('drugs');if(!$('alsTable').tBodies[0].rows.length)addTableRow('als');
const savedPriority=localStorage.getItem('prf_priority');if(savedPriority)[...document.querySelectorAll('.priority-option')].find(b=>b.textContent===savedPriority)?.classList.add('selected');const savedBpm=localStorage.getItem('prf_metronome_bpm');if(savedBpm)$('metronomeRate').value=savedBpm;const savedTimer=Number(localStorage.getItem('prf_cpr_timer_start'));if(savedTimer)startTimer(savedTimer,false);showPage(localStorage.getItem('prf_page')||'incident');updatePrimary();updateAlert();growAll();


// v23 self-contained iPad-compatible NEWS2 and pupil overlays.
(() => {
 const onReady=()=>{
  const newsOverlay=$('news23Overlay'),newsRowsHolder=$('news23Rows'),newsTotal=$('news23Total');
  const pupilOverlay=$('pupil23Modal'),left=$('pupil23Left'),right=$('pupil23Right');
  let newsTarget=null,pupilTarget=null,scores={};
  const reveal=el=>{el.hidden=false;el.style.display='flex';document.body.style.overflow='hidden';};
  const conceal=el=>{el.hidden=true;el.style.display='none';document.body.style.overflow='';};
  for(let n=0;n<=10;n++){left.add(new Option(`${n} mm`,String(n)));right.add(new Option(`${n} mm`,String(n)));}
  window.openPupil23=button=>{pupilTarget=button;left.value=button.dataset.left||parsePupil23(button.textContent,'L');right.value=button.dataset.right||parsePupil23(button.textContent,'R');reveal(pupilOverlay);};
  $('pupil23Done').onclick=()=>{if(!pupilTarget)return;const l=left.value,r=right.value;pupilTarget.dataset.left=l;pupilTarget.dataset.right=r;pupilTarget.dataset.values=JSON.stringify([`${l}L`,`${r}R`]);pupilTarget.textContent=`${l}L ${r}R`;conceal(pupilOverlay);saveDraft();};
  $('pupil23Close').onclick=$('pupil23Cancel').onclick=()=>conceal(pupilOverlay);
  const newsRows=[
   ['Respiration rate',[['8 or less',3],['9–11',1],['12–20',0],['21–24',2],['25 or more',3]]],
   ['SpO2 Scale 1',[['91 or less',3],['92–93',2],['94–95',1],['96 or more',0]]],
   ['SpO2 Scale 2',[['83 or less',3],['84–85',2],['86–87',1],['88–92 on air',0],['93–94 on oxygen',1],['95–96 on oxygen',2],['97 or more on oxygen',3]]],
   ['Air or oxygen',[['Air',0],['Supplemental oxygen',2]]],
   ['Systolic BP',[['90 or less',3],['91–100',2],['101–110',1],['111–219',0],['220 or more',3]]],
   ['Heart rate',[['40 or less',3],['41–50',1],['51–90',0],['91–110',1],['111–130',2],['131 or more',3]]],
   ['Temperature',[['35.0 or less',3],['35.1–36.0',1],['36.1–38.0',0],['38.1–39.0',1],['39.1 or more',2]]],
   ['Consciousness',[['Alert',0],['New confusion / V / P / U',3]]]
  ];
  newsRows.forEach((entry,index)=>{const section=document.createElement('section');section.className='v23-news-row';section.innerHTML=`<h3>${entry[0]}</h3>`;const choices=document.createElement('div');choices.className='v23-news-choices';entry[1].forEach(([label,score])=>{const b=document.createElement('button');b.type='button';b.className=`v23-score v23-score-${score}`;b.textContent=`${label} (${score})`;b.onclick=()=>{choices.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');scores[index]=score;newsTotal.textContent=String(Object.values(scores).reduce((a,v)=>a+v,0));};choices.appendChild(b);});section.appendChild(choices);newsRowsHolder.appendChild(section);});
  window.openNews23=button=>{newsTarget=button;scores={};newsRowsHolder.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));newsTotal.textContent='0';reveal(newsOverlay);};
  window.updateSepsis23=()=>{const panel=$('sepsisToolPanel');if(panel)panel.hidden=![...document.querySelectorAll('#obsTable .news-button')].some(b=>Number(b.textContent)>=5);};
  $('news23Done').onclick=()=>{if(!newsTarget)return;const total=Number(newsTotal.textContent),red=Object.values(scores).includes(3);newsTarget.textContent=String(total);newsTarget.dataset.redScore=String(red);paintNews(newsTarget,total,red);conceal(newsOverlay);window.updateSepsis23();saveDraft();};
  $('news23Close').onclick=$('news23Cancel').onclick=()=>conceal(newsOverlay);
  newsOverlay.onclick=e=>{if(e.target===newsOverlay)conceal(newsOverlay);};pupilOverlay.onclick=e=>{if(e.target===pupilOverlay)conceal(pupilOverlay);};
  window.updateSepsis23();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',onReady,{once:true});else onReady();
})();

window.addEventListener('load',()=>{
 verifyReleaseVersions();
 const checks=()=>{
  const requiredElements=['obsTable','news23Overlay','news23Rows','pupil23Modal','gcsModal','clinicianSignoffs','startupGate','exitCaseModal','sepsisToolPanel'];
  const requiredFunctions=['addObs','openNews23','openPupil23','showPage'];
  const results=[];
  requiredElements.forEach(id=>results.push({label:`Element: ${id}`,ok:!!document.getElementById(id)}));
  requiredFunctions.forEach(name=>results.push({label:`Function: ${name}()`,ok:typeof window[name]==='function'}));
  results.push({label:'HTML version',ok:document.body.dataset.appVersion===APP_VERSION,value:document.body.dataset.appVersion});
  const css=getComputedStyle(document.documentElement).getPropertyValue('--prf-css-version').replace(/["']/g,'').trim();
  results.push({label:'CSS version',ok:css===APP_VERSION,value:css});
  results.push({label:'JavaScript version',ok:true,value:APP_VERSION});
  results.push({label:'Browser storage',ok:(()=>{try{localStorage.setItem('prf_test','1');localStorage.removeItem('prf_test');return true;}catch{return false;}})()});
  return results;
 };
 window.runPrfSystemCheck=()=>{
  const rows=checks();const holder=document.getElementById('healthResults');
  holder.innerHTML=`<div class="health-list">${rows.map(r=>`<div class="health-item"><span>${r.label}${r.value?`: ${r.value}`:''}</span><span class="${r.ok?'health-ok':'health-fail'}">${r.ok?'Ready':'Missing'}</span></div>`).join('')}</div>`;
  document.getElementById('healthModal').classList.add('open');
  return rows.every(r=>r.ok);
 };
 document.getElementById('systemCheck')?.addEventListener('click',window.runPrfSystemCheck);
 const ok=checks().every(r=>r.ok);
 if(!ok)showVersionFailure('Startup self-test failed. Open the System Check in a complete release or re-upload the full release package.');
});

document.addEventListener('DOMContentLoaded',()=>{document.getElementById('closeSepsisTool')?.addEventListener('click',()=>{document.getElementById('sepsisToolPanel').hidden=true;});});


// v24.0.4 complete exit workflow for iPad/Safari.
window.__prfExitWorkflowReady=false;
window.__prfExitLastAction='Not tested';
function setExitStatus(message){const status=document.getElementById('exitCaseStatus');if(status)status.textContent=message;}
function showExitCaseModal(){
 const modal=document.getElementById('exitCaseModal');if(!modal)return false;
 setExitStatus('');modal.classList.add('open');modal.style.setProperty('display','flex','important');modal.style.setProperty('visibility','visible','important');modal.style.setProperty('opacity','1','important');
 return true;
}
function hideExitCaseModal(){
 const modal=document.getElementById('exitCaseModal');if(!modal)return;
 modal.classList.remove('open');modal.style.removeProperty('display');modal.style.removeProperty('visibility');modal.style.removeProperty('opacity');
}
function returnToReadyScreenV2404(){
 hideExitCaseModal();
 const gate=document.getElementById('startupGate'),ready=document.getElementById('readyPanel'),loading=document.getElementById('loadingPanel'),audio=document.getElementById('newIncidentAudio');
 if(audio){audio.pause();audio.currentTime=0;}
 if(gate){gate.classList.remove('is-closed','effects-off');gate.style.removeProperty('display');}
 if(ready){ready.hidden=false;const p=ready.querySelector('p');if(p)p.textContent='Select Yes to continue.';}
 if(loading)loading.hidden=true;
 document.querySelectorAll('.modal.open').forEach(modal=>{if(modal.id!=='startupGate')modal.classList.remove('open');});
 window.scrollTo(0,0);
}
function saveCurrentCaseAndExit(){
 try{
  const data=collect();
  const defaultName=(data.fields&&data.fields.patient_name)||data.caseId||'PRF case';
  const entered=window.prompt('Case name',defaultName);
  if(entered===null){setExitStatus('Save cancelled. The case remains open.');return;}
  data.name=entered.trim()||defaultName;data.savedAt=new Date().toISOString();
  localStorage.setItem('prf_saved_'+Date.now(),JSON.stringify(data));
  localStorage.setItem('prf_current',JSON.stringify(data));
  window.__prfExitLastAction='Save and exit completed';
  returnToReadyScreenV2404();
 }catch(error){setExitStatus('Unable to save: '+error.message);window.__prfExitLastAction='Save failed';}
}
function exitWithoutSavingV2404(){
 localStorage.removeItem('prf_current');window.__prfExitLastAction='Exit without saving completed';returnToReadyScreenV2404();
}
window.addEventListener('load',()=>{
 const required=['exitCase','exitCaseModal','exitSave','exitWithoutSave'];
 window.__prfExitWorkflowReady=required.every(id=>document.getElementById(id));
 // Capture phase prevents older bubbling handlers from blocking these controls.
 document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.id==='exitCase'){event.preventDefault();event.stopImmediatePropagation();showExitCaseModal();return;}
  if(button.id==='exitSave'){event.preventDefault();event.stopImmediatePropagation();saveCurrentCaseAndExit();return;}
  if(button.id==='exitWithoutSave'){event.preventDefault();event.stopImmediatePropagation();exitWithoutSavingV2404();return;}
  if(button.dataset.close==='exitCaseModal'){event.preventDefault();event.stopImmediatePropagation();hideExitCaseModal();window.__prfExitLastAction='Continue editing selected';}
 },true);
 const previous=window.runPrfSystemCheck;
 if(previous)window.runPrfSystemCheck=()=>{
  const base=previous();const holder=document.getElementById('healthResults')?.querySelector('.health-list');
  if(holder){
   const row=document.createElement('div');row.className='health-item';row.innerHTML=`<span>Function: Exit workflow</span><span class="${window.__prfExitWorkflowReady?'health-ok':'health-fail'}">${window.__prfExitWorkflowReady?'Ready':'Missing'}</span>`;holder.appendChild(row);
   const action=document.createElement('div');action.className='health-item';action.innerHTML=`<span>Exit workflow last action</span><span>${window.__prfExitLastAction}</span>`;holder.appendChild(action);
  }
  return base&&window.__prfExitWorkflowReady;
 };
});


// v24.0.5 persistent light/dark theme controller.
window.__prfThemeReady=false;
function applyPrfTheme(theme){
  const dark=theme==='dark';
  document.documentElement.dataset.theme=dark?'dark':'light';
  document.body.classList.toggle('dark-mode',dark);
  const toggle=document.getElementById('themeToggle');
  if(toggle){
    toggle.textContent=dark?'Light mode':'Dark mode';
    toggle.setAttribute('aria-pressed',String(dark));
    toggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#080c11':'#1769aa');
  try{localStorage.setItem('prf_theme',dark?'dark':'light');}catch{}
}
function preferredPrfTheme(){
  try{
    const saved=localStorage.getItem('prf_theme');
    if(saved==='dark'||saved==='light')return saved;
  }catch{}
  return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
}
window.addEventListener('DOMContentLoaded',()=>{
  if(!document.querySelector('meta[name="theme-color"]')){
    const meta=document.createElement('meta');meta.name='theme-color';document.head.appendChild(meta);
  }
  const toggle=document.getElementById('themeToggle');
  window.__prfThemeReady=Boolean(toggle);
  applyPrfTheme(preferredPrfTheme());
  if(toggle){
    toggle.addEventListener('click',event=>{
      event.preventDefault();event.stopImmediatePropagation();
      applyPrfTheme(document.body.classList.contains('dark-mode')?'light':'dark');
    },true);
  }
});

window.addEventListener('load',()=>{
  const previousThemeCheck=window.runPrfSystemCheck;
  if(previousThemeCheck){
    window.runPrfSystemCheck=()=>{
      const base=previousThemeCheck();
      const holder=document.getElementById('healthResults')?.querySelector('.health-list');
      if(holder){
        const row=document.createElement('div');row.className='health-item';
        row.innerHTML=`<span>Function: Light/dark mode</span><span class="${window.__prfThemeReady?'health-ok':'health-fail'}">${window.__prfThemeReady?'Ready':'Missing'}</span>`;
        holder.appendChild(row);
      }
      return base&&window.__prfThemeReady;
    };
  }
});


// v24.0.7 official-chart-style NEWS2 interface, DRCABCDE toggles and trauma workspace.
window.addEventListener('DOMContentLoaded',()=>{
  // Rebuild the active NEWS2 overlay as a chart matching the official NEWS2 scoring bands.
  const holder=document.getElementById('news23Rows');
  const totalEl=document.getElementById('news23Total');
  const overlay=document.getElementById('news23Overlay');
  const done=document.getElementById('news23Done');
  if(holder&&totalEl&&overlay&&done){
    const columns=[3,2,1,0,1,2,3];
    const chart=[
      ['Respiration rate',['≤8','', '9–11','12–20','', '21–24','≥25'],[3,null,1,0,null,2,3]],
      ['SpO₂ Scale 1 (%)',['≤91','92–93','94–95','≥96','','',''],[3,2,1,0,null,null,null]],
      ['SpO₂ Scale 2 (%)',['≤83','84–85','86–87','88–92 / ≥93 air','93–94 oxygen','95–96 oxygen','≥97 oxygen'],[3,2,1,0,1,2,3]],
      ['Air or oxygen?',['','Oxygen','','Air','','',''],[null,2,null,0,null,null,null]],
      ['Systolic BP (mmHg)',['≤90','91–100','101–110','111–219','','','≥220'],[3,2,1,0,null,null,3]],
      ['Pulse (per minute)',['≤40','','41–50','51–90','91–110','111–130','≥131'],[3,null,1,0,1,2,3]],
      ['Consciousness',['','','','Alert','','','C / V / P / U'],[null,null,null,0,null,null,3]],
      ['Temperature (°C)',['≤35.0','','35.1–36.0','36.1–38.0','38.1–39.0','≥39.1',''],[3,null,1,0,1,2,null]]
    ];
    holder.innerHTML='';
    const scroll=document.createElement('div');scroll.className='news-chart-scroll';
    const table=document.createElement('table');table.className='news-chart';
    table.innerHTML=`<thead><tr><th>Physiological parameter</th>${columns.map(s=>`<th>${s}</th>`).join('')}</tr></thead><tbody></tbody>`;
    scroll.appendChild(table);holder.appendChild(scroll);
    let target=null,scores={};
    chart.forEach((row,rowIndex)=>{
      const tr=document.createElement('tr');
      const label=document.createElement('th');label.scope='row';label.textContent=row[0];tr.appendChild(label);
      row[1].forEach((text,colIndex)=>{
        const td=document.createElement('td');const score=row[2][colIndex];td.textContent=text;
        if(score!==null&&text){td.className=`news-chart-score score-${score}`;td.tabIndex=0;td.setAttribute('role','button');td.onclick=()=>{tr.querySelectorAll('td').forEach(c=>c.classList.remove('selected'));td.classList.add('selected');scores[rowIndex]=score;totalEl.textContent=String(Object.values(scores).reduce((a,b)=>a+b,0));};td.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();td.click();}};}else td.className='news-chart-empty';
        tr.appendChild(td);
      });table.tBodies[0].appendChild(tr);
    });
    window.openNews23=button=>{target=button;scores={};table.querySelectorAll('.selected').forEach(c=>c.classList.remove('selected'));totalEl.textContent='0';overlay.hidden=false;overlay.style.display='flex';document.body.style.overflow='hidden';};
    done.onclick=()=>{if(!target)return;const total=Number(totalEl.textContent||0),red=Object.values(scores).includes(3);target.textContent=String(total);target.dataset.redScore=String(red);paintNews(target,total,red);overlay.hidden=true;overlay.style.display='none';document.body.style.overflow='';if(window.updateSepsis23)window.updateSepsis23();saveDraft();};
  }

});


// v24.0.8 automatic full-page text editor for all clinical pages except Incident and Patient.
(() => {
  const onReady=()=>{
    const overlay=document.getElementById('textEditorOverlay');
    const host=document.getElementById('textEditorHost');
    const close=document.getElementById('textEditorClose');
    const title=document.getElementById('textEditorLabel');
    let active=null,originalParent=null,originalNext=null,placeholder=null;

    const eligible=textarea=>{
      const page=textarea.closest('.page');
      return Boolean(page && page.id!=='incident' && page.id!=='patient' && !textarea.closest('.modal,.v23-overlay,.text-editor-overlay'));
    };
    const fieldLabel=textarea=>{
      const field=textarea.closest('.field');
      const label=field?.querySelector('label');
      if(label?.textContent.trim())return label.textContent.trim();
      const cell=textarea.closest('td');
      if(cell){
        const row=cell.parentElement,index=[...row.cells].indexOf(cell);
        const table=textarea.closest('table');
        return table?.tHead?.rows?.[0]?.cells?.[index]?.textContent?.trim()||'Expanded text box';
      }
      return 'Expanded text box';
    };
    const openEditor=textarea=>{
      if(active===textarea||!eligible(textarea))return;
      if(active)closeEditor();
      active=textarea;originalParent=textarea.parentNode;originalNext=textarea.nextSibling;
      placeholder=document.createElement('div');placeholder.className='expanded-text-placeholder';placeholder.textContent='Text box open in expanded view';
      originalParent.insertBefore(placeholder,textarea);
      title.textContent=fieldLabel(textarea);
      host.appendChild(textarea);textarea.classList.add('is-full-page-textarea');
      overlay.hidden=false;overlay.style.display='flex';document.body.classList.add('text-editor-open');
      requestAnimationFrame(()=>{textarea.focus({preventScroll:true});textarea.setSelectionRange?.(textarea.value.length,textarea.value.length);});
    };
    function closeEditor(){
      if(!active)return;
      active.classList.remove('is-full-page-textarea');
      if(originalNext&&originalNext.parentNode===originalParent)originalParent.insertBefore(active,originalNext);else originalParent.appendChild(active);
      placeholder?.remove();overlay.hidden=true;overlay.style.display='none';document.body.classList.remove('text-editor-open');
      const restored=active;active=null;originalParent=null;originalNext=null;placeholder=null;
      grow(restored);saveDraft();
    }
    document.addEventListener('focusin',event=>{if(event.target instanceof HTMLTextAreaElement)openEditor(event.target);});
    document.addEventListener('click',event=>{
      const textarea=event.target.closest?.('textarea');
      if(textarea)openEditor(textarea);
    },true);
    close.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();closeEditor();},true);
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&active){event.preventDefault();closeEditor();}});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',onReady,{once:true});else onReady();
})();
