import { useState, useEffect } from "react";

// ── Persistence via localStorage ─────────────────────────────────────────────
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
}

// ── Constants ─────────────────────────────────────────────────────────────────
const G = {
  teal:"#1A7A6E", tealMid:"#2A9D8F", tealLight:"#E8F5F3", tealPale:"#f0faf8",
  ink:"#1C2B2A", gray:"#5A6B69", grayLight:"#F2F7F6", white:"#FFFFFF",
  amber:"#E9922A", amberLight:"#FEF3E7",
  red:"#C0392B", redLight:"#FDE8E8",
  blue:"#1F6FA3", blueLight:"#EBF5FB",
  green:"#1E8449", greenLight:"#E9F7EF",
  purple:"#7D3C98", purpleLight:"#F5EEF8",
  orange:"#D35400", orangeLight:"#FDEBD0",
};

const CLASS_TYPES = [
  { id:"taichi",      label:"Tai Chi",               icon:"🌿", color: G.teal,    bg: G.tealLight   },
  { id:"activacion",  label:"Activación Física",     icon:"🏃", color: G.blue,    bg: G.blueLight   },
  { id:"yoga",        label:"Yoga",                  icon:"🧘", color: G.green,   bg: G.greenLight  },
  { id:"baile",       label:"Baile",                 icon:"💃", color: G.amber,   bg: G.amberLight  },
  { id:"mindfulness", label:"Mindfulness",           icon:"🕯️", color: G.purple,  bg: G.purpleLight },
  { id:"ceramica",    label:"Cerámica",              icon:"🏺", color: G.orange,  bg: G.orangeLight },
  { id:"pintura",     label:"Pintura",               icon:"🎨", color:"#8E44AD",  bg:"#F5EEF8"      },
  { id:"tejido",      label:"Tejido",                icon:"🧶", color:"#CB4335",  bg:"#FDEDEC"      },
  { id:"cognitivo",   label:"Estimulación Cognitiva",icon:"🧠", color:"#1F6FA3",  bg:"#EBF5FB"      },
];

const PLANS = [
  { id:"paq4",  label:"Paquete 4",   classes: 4,  price: 800  },
  { id:"paq8",  label:"Paquete 8",   classes: 8,  price: 1200 },
  { id:"paq12", label:"Paquete 12",  classes: 12, price: 1800 },
  { id:"paq16", label:"Paquete 16",  classes: 16, price: 2200 },
  { id:"paq40", label:"Paquete 40",  classes: 40, price: 4000 },
];

const MEAL_PRICE = 80;

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function today() { return new Date().toISOString().split("T")[0]; }
function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
}
function monthLabel(key) {
  if (!key) return "";
  const [y, m] = key.split("-");
  return `${MONTHS[parseInt(m)-1]} ${y}`;
}
function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("es-MX",{day:"2-digit",month:"short"});
}

function calcAge(birthDate) {
  if (!birthDate) return null;
  const today = new Date();
  const b = new Date(birthDate + "T12:00:00");
  let age = today.getFullYear() - b.getFullYear();
  const m = today.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
  return age;
}

function nextPaymentDue(paymentDate) {
  if (!paymentDate) return null;
  const d = new Date(paymentDate + "T12:00:00");
  const today = new Date();
  // advance to current or next month
  while (d <= today) d.setMonth(d.getMonth() + 1);
  return d.toISOString().split("T")[0];
}

const INITIAL_MEMBERS = [
  { id:1, name:"Rosa Martínez López",    plan:"paq16", joinDate:"2026-01-10", active:true,
    birthDate:"1948-03-22", paymentDate:"2026-04-01",
    diagnosis:"Deterioro cognitivo leve",
    emergencyContact:"Carlos López", emergencyRelation:"Hijo",
    emergencyPhone:"55 1234 5678", comments:"Alérgica a la penicilina. Muy participativa." },
  { id:2, name:"Ernesto Fuentes García", plan:"paq40", joinDate:"2026-02-01", active:true,
    birthDate:"1952-07-14", paymentDate:"2026-04-01",
    diagnosis:"Hipertensión, DM2 controlada",
    emergencyContact:"Ana Fuentes", emergencyRelation:"Hija",
    emergencyPhone:"55 9876 5432", comments:"" },
  { id:3, name:"Carmen Vda. de Torres",  plan:"paq8",  joinDate:"2026-03-05", active:true,
    birthDate:"1945-11-30", paymentDate:"2026-04-05",
    diagnosis:"Artrosis bilateral de rodilla",
    emergencyContact:"Luis Torres", emergencyRelation:"Hijo",
    emergencyPhone:"55 5555 1234", comments:"Usa andadera. Evitar actividad de alto impacto." },
];

const INITIAL_RECORDS = [
  { id:1, memberId:1, type:"pintura",      date:"2026-04-02", month:"2026-04", note:"" },
  { id:2, memberId:1, type:"activacion",    date:"2026-04-03", month:"2026-04", note:"" },
  { id:3, memberId:1, type:"cognitivo", date:"2026-04-05", month:"2026-04", note:"" },
  { id:4, memberId:1, type:"pintura",      date:"2026-04-07", month:"2026-04", note:"" },
  { id:5, memberId:1, type:"activacion",    date:"2026-04-08", month:"2026-04", note:"" },
  { id:6, memberId:1, type:"baile",    date:"2026-04-09", month:"2026-04", note:"" },
  { id:7, memberId:1, type:"cognitivo", date:"2026-04-10", month:"2026-04", note:"" },
  { id:8, memberId:1, type:"pintura",      date:"2026-04-11", month:"2026-04", note:"" },
  { id:9, memberId:2, type:"activacion",    date:"2026-04-02", month:"2026-04", note:"" },
  { id:10,memberId:2, type:"cognitivo", date:"2026-04-04", month:"2026-04", note:"" },
  { id:11,memberId:2, type:"pintura",      date:"2026-04-06", month:"2026-04", note:"" },
  { id:12,memberId:3, type:"pintura",      date:"2026-04-03", month:"2026-04", note:"" },
  { id:13,memberId:3, type:"activacion",    date:"2026-04-05", month:"2026-04", note:"" },
  { id:14,memberId:3, type:"cognitivo", date:"2026-04-07", month:"2026-04", note:"" },
  { id:15,memberId:3, type:"baile",    date:"2026-04-09", month:"2026-04", note:"" },
  { id:16,memberId:3, type:"pintura",      date:"2026-04-10", month:"2026-04", note:"" },
  { id:17,memberId:3, type:"activacion",    date:"2026-04-11", month:"2026-04", note:"" },
  { id:18,memberId:3, type:"cognitivo", date:"2026-04-12", month:"2026-04", note:"" },
  { id:19,memberId:3, type:"pintura",      date:"2026-04-13", month:"2026-04", note:"" },
  // meals
  { id:101,memberId:1, kind:"meal", date:"2026-04-02", month:"2026-04", note:"" },
  { id:102,memberId:1, kind:"meal", date:"2026-04-05", month:"2026-04", note:"" },
  { id:103,memberId:2, kind:"meal", date:"2026-04-03", month:"2026-04", note:"" },
  { id:104,memberId:3, kind:"meal", date:"2026-04-04", month:"2026-04", note:"" },
  { id:105,memberId:3, kind:"meal", date:"2026-04-07", month:"2026-04", note:"" },
  { id:106,memberId:3, kind:"meal", date:"2026-04-09", month:"2026-04", note:"" },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:${G.grayLight};color:${G.ink};min-height:100vh;}
.app{max-width:1000px;margin:0 auto;padding:0 16px 56px;}

/* Header */
.header{background:${G.ink};color:white;padding:18px 28px;margin:0 -16px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
.header-brand{display:flex;align-items:baseline;gap:10px;}
.header-title{font-family:'Fraunces',serif;font-size:24px;color:white;letter-spacing:-0.5px;}
.header-sub{font-size:12px;opacity:.55;font-weight:300;color:white;}
.header-month{font-size:13px;font-weight:600;color:${G.tealMid};background:rgba(42,157,143,.12);padding:5px 14px;border-radius:20px;}
.header-nav{display:flex;gap:6px;}
.nav-btn{padding:7px 15px;border-radius:20px;border:1.5px solid rgba(255,255,255,.2);background:transparent;color:white;font-size:13px;font-weight:500;cursor:pointer;transition:all .18s;font-family:inherit;}
.nav-btn:hover{background:rgba(255,255,255,.1);}
.nav-btn.active{background:${G.teal};border-color:${G.teal};}

/* Cards */
.card{background:white;border-radius:14px;padding:22px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.04);margin-bottom:18px;}
.card-sm{padding:16px;}
.card-title{font-family:'Fraunces',serif;font-size:17px;color:${G.ink};margin-bottom:4px;}
.card-sub{font-size:12px;color:${G.gray};margin-bottom:16px;}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;transition:all .16s;font-family:inherit;}
.btn-primary{background:${G.teal};color:white;}
.btn-primary:hover{background:${G.tealMid};}
.btn-ghost{background:transparent;color:${G.gray};border:1.5px solid #ddd;}
.btn-ghost:hover{border-color:${G.teal};color:${G.teal};}
.btn-danger{background:${G.redLight};color:${G.red};}
.btn-sm{padding:5px 12px;font-size:12px;}
.btn-xs{padding:3px 9px;font-size:11px;}

/* Forms */
label{display:block;font-size:12px;font-weight:600;color:${G.gray};margin-bottom:4px;letter-spacing:.3px;}
input,select,textarea{width:100%;padding:8px 11px;border:1.5px solid #dde4e3;border-radius:8px;font-size:13px;font-family:inherit;color:${G.ink};background:white;transition:border .15s;outline:none;}
input:focus,select:focus{border-color:${G.teal};}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
.form-row.three{grid-template-columns:1fr 1fr 1fr;}
.form-row.three{grid-template-columns:1fr 1fr 1fr;}
.form-group{margin-bottom:14px;}
@media(max-width:560px){.form-row,.form-row.three{grid-template-columns:1fr;}}

/* Member grid */
.member-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
.member-card{background:white;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06);cursor:pointer;border:2px solid transparent;transition:all .18s;position:relative;overflow:hidden;}
.member-card:hover{border-color:${G.teal};transform:translateY(-1px);}
.member-card.alert{border-color:${G.red}!important;}
.member-card.warning{border-color:${G.amber}!important;}
.member-name{font-weight:600;font-size:14px;margin-bottom:2px;}
.member-plan{font-size:11px;color:${G.gray};margin-bottom:10px;}
.alert-strip{position:absolute;top:0;left:0;right:0;height:3px;}

/* Progress bar */
.progress-wrap{margin:10px 0 6px;}
.progress-bg{height:10px;border-radius:5px;background:#eef2f1;overflow:hidden;}
.progress-fill{height:100%;border-radius:5px;transition:width .5s ease;}
.progress-labels{display:flex;justify-content:space-between;font-size:11px;margin-top:3px;}

/* Class type pills */
.type-pill{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;cursor:pointer;border:1.5px solid transparent;transition:all .15s;}
.type-pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}

/* Counter ring */
.counter-ring{display:flex;align-items:center;justify-content:center;flex-direction:column;width:80px;height:80px;border-radius:50%;border:4px solid;font-weight:700;}
.counter-num{font-size:24px;line-height:1;font-family:'Fraunces',serif;}
.counter-sub{font-size:9px;opacity:.7;letter-spacing:.5px;}

/* Class log */
.log-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f0f5f4;}
.log-item:last-child{border-bottom:none;}
.log-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.log-info{flex:1;}
.log-type{font-size:13px;font-weight:600;}
.log-date{font-size:11px;color:${G.gray};}
.log-extra{font-size:11px;font-weight:700;}

/* Alert banner */
.alert-banner{border-radius:10px;padding:12px 16px;margin-bottom:14px;display:flex;align-items:center;gap:10px;font-size:13px;font-weight:500;}
.alert-banner.red{background:${G.redLight};color:${G.red};}
.alert-banner.amber{background:${G.amberLight};color:${G.amber};}
.alert-banner.green{background:${G.greenLight};color:${G.green};}

/* Charges table */
.charges-table{width:100%;border-collapse:collapse;}
.charges-table th{font-size:11px;font-weight:700;color:${G.gray};text-transform:uppercase;letter-spacing:.5px;padding:8px 12px;text-align:left;background:${G.grayLight};border-bottom:2px solid #e0e8e7;}
.charges-table td{padding:10px 12px;font-size:13px;border-bottom:1px solid #f0f5f4;vertical-align:middle;}
.charges-table tr:last-child td{border-bottom:none;}
.charges-table tr:hover td{background:${G.tealPale};}

/* Dashboard stat */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:20px;}
.stat-card{background:white;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.stat-num{font-family:'Fraunces',serif;font-size:28px;font-weight:700;line-height:1;margin-bottom:2px;}
.stat-label{font-size:11px;color:${G.gray};font-weight:500;}

/* Tabs */
.tabs{display:flex;gap:4px;margin-bottom:20px;border-bottom:2px solid #e0e8e7;}
.tab{padding:8px 16px;border:none;background:transparent;font-size:13px;font-weight:600;color:${G.gray};cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .15s;font-family:inherit;border-radius:6px 6px 0 0;}
.tab:hover{color:${G.teal};background:${G.tealLight};}
.tab.active{color:${G.teal};border-bottom-color:${G.teal};background:${G.tealPale};}

/* Modal */
.modal-overlay{position:fixed;inset:0;background:rgba(28,43,42,.6);display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px;animation:fadeIn .15s ease;}
.modal{background:white;border-radius:16px;padding:26px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;animation:slideUp .2s ease;}
.modal-title{font-family:'Fraunces',serif;font-size:20px;margin-bottom:3px;}
.modal-sub{font-size:12px;color:${G.gray};margin-bottom:20px;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}

/* Utils */
.flex{display:flex;align-items:center;}
.flex-between{display:flex;align-items:center;justify-content:space-between;}
.gap-6{gap:6px;}.gap-8{gap:8px;}.gap-12{gap:12px;}
.mb-4{margin-bottom:4px;}.mb-8{margin-bottom:8px;}.mb-12{margin-bottom:12px;}.mb-16{margin-bottom:16px;}.mb-20{margin-bottom:20px;}
.text-sm{font-size:13px;}.text-xs{font-size:11px;}.text-gray{color:${G.gray};}.bold{font-weight:700;}
.divider{height:1px;background:#e8f0ef;margin:14px 0;}
.empty{text-align:center;padding:40px 24px;color:${G.gray};}
.empty-icon{font-size:36px;margin-bottom:10px;}
.empty-text{font-size:14px;font-weight:500;color:${G.ink};margin-bottom:4px;}
.empty-sub{font-size:12px;}
.badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700;}
`;

// ── Helper components ─────────────────────────────────────────────────────────
function ClassTypePill({ type, selected, onClick }) {
  const ct = CLASS_TYPES.find(c => c.id === type);
  if (!ct) return null;
  return (
    <span className="type-pill" onClick={onClick}
      style={{
        background: selected ? ct.color : ct.bg,
        color: selected ? "white" : ct.color,
        borderColor: ct.color,
      }}>
      {ct.icon} {ct.label}
    </span>
  );
}

function ProgressBar({ used, total, color }) {
  const pct = total >= 999 ? 0 : Math.min((used / total) * 100, 100);
  const barColor = pct >= 100 ? G.red : pct >= 80 ? G.amber : color || G.teal;
  return (
    <div className="progress-wrap">
      <div className="progress-bg">
        <div className="progress-fill" style={{ width: total >= 999 ? "0%" : `${pct}%`, background: barColor }} />
      </div>
      <div className="progress-labels">
        <span style={{ color: G.gray }}>{total >= 999 ? "Ilimitado" : `${used} / ${total} clases`}</span>
        {total < 999 && <span style={{ color: barColor, fontWeight: 700 }}>{total - used > 0 ? `${total - used} restantes` : `${used - total} extra`}</span>}
      </div>
    </div>
  );
}

function AlertBanner({ type, msg }) {
  const map = { red: "🚨", amber: "⚠️", green: "✅" };
  return <div className={`alert-banner ${type}`}>{map[type]} {msg}</div>;
}

// ── Member status helper ──────────────────────────────────────────────────────
function getMemberStatus(member, records, month) {
  const plan = PLANS.find(p => p.id === member.plan);
  const monthRecords = records.filter(r => r.memberId === member.id && r.month === month);
  const used = monthRecords.length;
  const total = plan?.classes ?? 0;
  const remaining = total >= 999 ? Infinity : total - used;
  const pct = total >= 999 ? 0 : used / total;
  const status = remaining <= 0 ? "agotado" : pct >= 0.8 ? "por_agotar" : "ok";
  return { used, total, remaining, pct, status, plan, monthRecords };
}

// ── Meal helpers ─────────────────────────────────────────────────────────────
function getMemberMeals(memberId, records, month) {
  return records.filter(r => r.memberId === memberId && r.month === month && r.kind === "meal");
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [members, setMembers]     = useLocalStorage("nuba_members", INITIAL_MEMBERS);
  const [records, setRecords]     = useLocalStorage("nuba_records", INITIAL_RECORDS);
  const [view, setView]           = useState("socios");
  const [search, setSearch]         = useState("");
  const [selected, setSelected]   = useState(null);
  const [month, setMonth]         = useState(currentMonthKey());
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddClass, setShowAddClass]   = useState(false);
  const [showAddMeal, setShowAddMeal]     = useState(false);
  const [newMeal, setNewMeal]             = useState({ date: today(), note: "" });
  const [detailTab, setDetailTab]         = useState("clases");
  const [showEditMember, setShowEditMember] = useState(false);
  const [editMember, setEditMember]         = useState(null);
  const [showRenew, setShowRenew]         = useState(false);

  // New member form
  const [newMember, setNewMember] = useState({ name: "", plan: "paq8", joinDate: today(), birthDate: "", paymentDate: today(), diagnosis: "", emergencyContact: "", emergencyRelation: "", emergencyPhone: "", comments: "" });
  // New class form
  const [newClass, setNewClass]   = useState({ type: "taichi", date: today(), note: "" });
  // Renew plan
  const [renewPlan, setRenewPlan] = useState("");
  const [renewTarget, setRenewTarget] = useState(null); // member object, independent of selected

  const selectedMember = members.find(m => m.id === selected);
  const selStatus = selectedMember ? getMemberStatus(selectedMember, records, month) : null;

  // ── Alerts: members who hit 100% this month ──
  const alerts = members.filter(m => {
    const s = getMemberStatus(m, records, month);
    return s.status === "agotado";
  });
  const warnings = members.filter(m => {
    const s = getMemberStatus(m, records, month);
    return s.status === "por_agotar";
  });

  const filteredMembers = members.filter(m =>
    m.active && (
      search.trim() === "" ||
      m.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      (m.diagnosis || "").toLowerCase().includes(search.trim().toLowerCase()) ||
      (m.emergencyContact || "").toLowerCase().includes(search.trim().toLowerCase())
    )
  );

  function selectMember(id) { setSelected(id); setDetailTab("clases"); }

  function openEditMember() {
    setEditMember({ ...selectedMember });
    setShowEditMember(true);
  }

  function saveEditMember() {
    if (!editMember) return;
    setMembers(prev => prev.map(m => m.id === editMember.id ? { ...m, ...editMember } : m));
    setShowEditMember(false);
    setEditMember(null);
  }

  function addMember() {
    if (!newMember.name.trim()) return;
    setMembers(prev => [...prev, { id: Date.now(), ...newMember, active: true }]);
    setNewMember({ name: "", plan: "paq8", joinDate: today(), birthDate: "", paymentDate: today(), diagnosis: "", emergencyContact: "", emergencyRelation: "", emergencyPhone: "", comments: "" });
    setShowAddMember(false);
  }

  function addClassRecord() {
    if (!selectedMember) return;
    const id = Date.now();
    const rec = { id, memberId: selectedMember.id, type: newClass.type, date: newClass.date, month: newClass.date.slice(0,7), note: newClass.note };
    setRecords(prev => [...prev, rec]);
    setNewClass({ type: "taichi", date: today(), note: "" });
    setShowAddClass(false);
  }

  function addMealRecord() {
    if (!selectedMember) return;
    const rec = { id: Date.now(), memberId: selectedMember.id, kind: "meal", date: newMeal.date, month: newMeal.date.slice(0,7), note: newMeal.note };
    setRecords(prev => [...prev, rec]);
    setNewMeal({ date: today(), note: "" });
    setShowAddMeal(false);
  }

  function removeRecord(id) {
    setRecords(prev => prev.filter(r => r.id !== id));
  }

  function renewMemberPlan() {
    if (!renewPlan || !renewTarget) return;
    const id = renewTarget.id;
    setMembers(prev => prev.map(m => m.id === id ? { ...m, plan: renewPlan } : m));
    setRecords(prev => prev.filter(r => !(r.memberId === id && r.month === month)));
    setShowRenew(false);
    setRenewTarget(null);
    setSelected(id);
    setView("socios");
  }

  // ── Dashboard stats ──
  const totalClasses = records.filter(r => r.month === month && !r.kind).length;
  const totalMeals   = records.filter(r => r.month === month && r.kind === "meal").length;
  const activeMembers = members.filter(m => m.active).length;
  const agotadosCount = alerts.length;
  const classByType = CLASS_TYPES.map(ct => ({
    ...ct,
    count: records.filter(r => r.month === month && r.type === ct.id).length
  }));

  // Month selector options (last 6 months + current)
  const monthOptions = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    return { key, label: monthLabel(key) };
  });

  return (
    <>
      <style>{css}</style>
      <div>
        <header className="header">
          <div className="header-brand">
            <span className="header-title">NUBA</span>
            <span className="header-sub">Control de Clases</span>
          </div>
          <div className="flex gap-8">
            <select value={month} onChange={e => setMonth(e.target.value)}
              style={{ background: "rgba(255,255,255,.08)", color: "white", border: "1.5px solid rgba(255,255,255,.2)", borderRadius: 20, padding: "5px 12px", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>
              {monthOptions.map(o => <option key={o.key} value={o.key} style={{ background: G.ink }}>{o.label}</option>)}
            </select>
          </div>
          <nav className="header-nav">
            <button className={`nav-btn ${view==="socios"?"active":""}`} onClick={()=>{setView("socios");setSelected(null);}}>Socios</button>
            <button className={`nav-btn ${view==="cobros"?"active":""}`} onClick={()=>setView("cobros")}>Cobros</button>
            <button className={`nav-btn ${view==="resumen"?"active":""}`} onClick={()=>setView("resumen")}>Resumen</button>
          </nav>
        </header>

        <div className="app">

          {/* ── Global alerts ── */}
          {alerts.length > 0 && view === "socios" && (
            <AlertBanner type="red" msg={`${alerts.length} socio${alerts.length>1?"s":""} con clases agotadas este mes: ${alerts.map(m=>m.name.split(" ")[0]).join(", ")}`} />
          )}
          {warnings.length > 0 && view === "socios" && (
            <AlertBanner type="amber" msg={`${warnings.length} socio${warnings.length>1?"s":""} próximo${warnings.length>1?"s":""} a agotar sus clases`} />
          )}

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: SOCIOS
          ══════════════════════════════════════════════════════════════════ */}
          {view === "socios" && !selected && (
            <div>
              <div className="flex-between mb-12">
                <div>
                  <h1 style={{fontFamily:"'Fraunces',serif",fontSize:22,marginBottom:2}}>Socios</h1>
                  <div className="text-xs text-gray">{monthLabel(month)} · {activeMembers} socios activos</div>
                </div>
                <button className="btn btn-primary" onClick={()=>setShowAddMember(true)}>+ Nuevo socio</button>
              </div>
              <div style={{position:"relative",marginBottom:20}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:15,color:"#9AACAA",pointerEvents:"none"}}>🔍</span>
                <input
                  value={search}
                  onChange={e=>setSearch(e.target.value)}
                  placeholder="Buscar por nombre, diagnóstico o contacto..."
                  style={{paddingLeft:36,background:"white",borderRadius:10,fontSize:13}}
                />
                {search && (
                  <button onClick={()=>setSearch("")}
                    style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#9AACAA",lineHeight:1}}>✕</button>
                )}
              </div>
              {search && (
                <div className="text-xs text-gray mb-12">
                  {filteredMembers.length === 0 ? "Sin resultados" : `${filteredMembers.length} resultado${filteredMembers.length!==1?"s":""} para "${search}"`}
                </div>
              )}

              {filteredMembers.length === 0 ? (
                <div className="card"><div className="empty"><div className="empty-icon">{search ? "🔍" : "👤"}</div><div className="empty-text">{search ? `Sin resultados para "${search}"` : "Sin socios registrados"}</div></div></div>
              ) : (
                <div className="member-grid">
                  {filteredMembers.map(m => {
                    const s = getMemberStatus(m, records, month);
                    const isAlert   = s.status === "agotado";
                    const isWarning = s.status === "por_agotar";
                    const barColor  = isAlert ? G.red : isWarning ? G.amber : G.teal;
                    const pct = s.total >= 999 ? 0 : Math.min((s.used/s.total)*100, 100);
                    return (
                      <div key={m.id} className={`member-card ${isAlert?"alert":isWarning?"warning":""}`}
                        onClick={()=>selectMember(m.id)}>
                        <div className="alert-strip" style={{background: isAlert?G.red:isWarning?G.amber:G.teal}}/>
                        <div style={{marginTop:4}}>
                          <div className="member-name">{m.name}</div>
                          <div className="member-plan">{s.plan?.label} · {s.total >= 999 ? "Ilimitado" : `${s.plan?.classes} clases/mes`}</div>
                          {isAlert && <AlertBanner type="red" msg="Clases agotadas — pendiente renovación"/>}
                          {isWarning && !isAlert && <AlertBanner type="amber" msg={`Quedan ${s.remaining} clase${s.remaining!==1?"s":""}`}/>}
                          {!isAlert && !isWarning && s.total < 999 && (
                            <AlertBanner type="green" msg={`${s.remaining} de ${s.total} clases disponibles`}/>
                          )}
                          {s.total < 999 && (
                            <div className="progress-wrap" style={{marginTop:4}}>
                              <div className="progress-bg">
                                <div className="progress-fill" style={{width:`${pct}%`,background:barColor}}/>
                              </div>
                              <div className="progress-labels">
                                <span className="text-xs text-gray">{s.used} usadas</span>
                                <span className="text-xs bold" style={{color:barColor}}>{s.total} incluidas</span>
                              </div>
                            </div>
                          )}
                          <div className="flex gap-6" style={{marginTop:8,flexWrap:"wrap"}}>
                            {CLASS_TYPES.map(ct=>{
                              const cnt = s.monthRecords.filter(r=>r.type===ct.id).length;
                              if(cnt===0) return null;
                              return <span key={ct.id} style={{background:ct.bg,color:ct.color,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>{ct.icon} {cnt}</span>;
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: DETALLE SOCIO
          ══════════════════════════════════════════════════════════════════ */}
          {view === "socios" && selected && selectedMember && (
            <div>
              <div className="flex gap-8 mb-20" style={{alignItems:"flex-start"}}>
                <button className="btn btn-ghost btn-sm" onClick={()=>setSelected(null)}>← Socios</button>
                <div style={{flex:1}}>
                  <h2 style={{fontFamily:"'Fraunces',serif",fontSize:20,marginBottom:2}}>{selectedMember.name}</h2>
                  <div className="text-xs text-gray">{selStatus?.plan?.label} · Miembro desde {formatDate(selectedMember.joinDate)}</div>
                </div>
                <div className="flex gap-6">
                  <button className="btn btn-ghost btn-sm" onClick={()=>{setRenewTarget(selectedMember);setRenewPlan(selectedMember.plan);setShowRenew(true);}}>🔄 Renovar</button>
                  <button className="btn btn-secondary btn-sm" onClick={()=>setShowAddMeal(true)}>🍽️ Comida</button>
                  <button className="btn btn-primary btn-sm" onClick={()=>setShowAddClass(true)}>+ Clase</button>
                </div>
              </div>

              {/* ── Tabs ── */}
              <div className="tabs">
                {[["clases","📋 Clases del mes"],["ficha","👤 Ficha del socio"]].map(([t,label])=>(
                  <button key={t} className={`tab ${detailTab===t?"active":""}`} onClick={()=>setDetailTab(t)}>{label}</button>
                ))}
              </div>

              {detailTab === "clases" && (<>
              {/* Status banner */}
              {selStatus?.status === "agotado" && (
                <AlertBanner type="red" msg={`Clases agotadas — usó ${selStatus.used} de ${selStatus.total} este mes. Pendiente renovación de paquete.`}/>
              )}
              {selStatus?.status === "por_agotar" && (
                <AlertBanner type="amber" msg={`Quedan ${selStatus.remaining} clase${selStatus.remaining!==1?"s":""} este mes (${selStatus.used}/${selStatus.total} usadas)`}/>
              )}
              {selStatus?.status === "ok" && selStatus.total < 999 && (
                <AlertBanner type="green" msg={`${selStatus.remaining} clases disponibles este mes`}/>
              )}

              {/* Counter + progress */}
              <div className="card">
                <div className="flex-between mb-12">
                  <div>
                    <div className="text-xs text-gray bold mb-4">{monthLabel(month).toUpperCase()}</div>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:15}}>{selStatus?.plan?.label}</div>
                  </div>
                  <div className="counter-ring" style={{
                    borderColor: selStatus?.status==="agotado"?G.red:selStatus?.status==="por_agotar"?G.amber:G.teal,
                    color: selStatus?.status==="agotado"?G.red:selStatus?.status==="por_agotar"?G.amber:G.teal,
                  }}>
                    <span className="counter-num">{selStatus?.used||0}</span>
                    <span className="counter-sub">{selStatus?.total >= 999 ? "∞" : `/${selStatus?.total}`}</span>
                  </div>
                </div>
                {selStatus?.total < 999 && (
                  <ProgressBar used={selStatus.used} total={selStatus.total}
                    color={selStatus.status==="agotado"?G.red:selStatus.status==="por_agotar"?G.amber:G.teal}/>
                )}
                {/* Extra classes indicator */}
                {selStatus?.used > selStatus?.total && selStatus?.total < 999 && (
                  <div style={{marginTop:8,padding:"8px 12px",background:G.redLight,borderRadius:8}}>
                    <span style={{color:G.red,fontWeight:700,fontSize:13}}>
                      🚨 {selStatus.used - selStatus.total} clase{selStatus.used-selStatus.total>1?"s":""} extra — pendiente cobro de paquete adicional
                    </span>
                  </div>
                )}

                {/* By type breakdown */}
                <div className="divider"/>
                <div className="flex gap-8" style={{flexWrap:"wrap"}}>
                  {CLASS_TYPES.map(ct => {
                    const cnt = selStatus?.monthRecords.filter(r=>r.type===ct.id).length||0;
                    return (
                      <div key={ct.id} style={{textAlign:"center",minWidth:60}}>
                        <div style={{fontSize:20,marginBottom:2}}>{ct.icon}</div>
                        <div style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:ct.color}}>{cnt}</div>
                        <div style={{fontSize:10,color:G.gray}}>{ct.label.split(" ")[0]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Meal counter card */}
              {(() => {
                const meals = getMemberMeals(selectedMember.id, records, month);
                const total = meals.length * MEAL_PRICE;
                return (
                  <div className="card">
                    <div className="flex-between mb-8">
                      <div>
                        <div className="text-xs text-gray bold mb-4">ALMUERZOS</div>
                        <div style={{fontFamily:"'Fraunces',serif",fontSize:15}}>Compras del mes</div>
                      </div>
                      <div className="counter-ring" style={{borderColor:G.orange,color:G.orange}}>
                        <span className="counter-num">{meals.length}</span>
                        <span className="counter-sub">comidas</span>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:G.orangeLight,borderRadius:8}}>
                      <span style={{fontSize:13,color:G.orange,fontWeight:600}}>🍽️ ${MEAL_PRICE}/almuerzo</span>
                      <span style={{fontSize:15,fontWeight:700,color:G.orange}}>${(meals.length * MEAL_PRICE).toLocaleString()} este mes</span>
                    </div>
                    {meals.length > 0 && (
                      <>
                        <div className="divider"/>
                        {[...meals].reverse().map(r => (
                          <div className="log-item" key={r.id}>
                            <div className="log-icon" style={{background:G.orangeLight,color:G.orange}}>🍽️</div>
                            <div className="log-info">
                              <div className="log-type">Almuerzo</div>
                              <div className="log-date">{formatDate(r.date)}{r.note ? ` · ${r.note}` : ""}</div>
                            </div>
                            <span style={{fontSize:13,fontWeight:700,color:G.orange}}>${MEAL_PRICE}</span>
                            <button className="btn btn-xs btn-danger" onClick={()=>removeRecord(r.id)} style={{marginLeft:6}}>✕</button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })()}

              {/* Class log */}
              <div className="card">
                <div className="flex-between mb-12">
                  <div className="card-title">Registro del mes</div>
                  <span className="text-xs text-gray">{selStatus?.monthRecords.length||0} clases</span>
                </div>
                {selStatus?.monthRecords.length > 0 ? (
                  [...selStatus.monthRecords].reverse().map(r => {
                    const ct = CLASS_TYPES.find(c=>c.id===r.type);
                    const isExtra = selStatus.total < 999 &&
                      selStatus.monthRecords.indexOf(r) >= selStatus.total;
                    return (
                      <div className="log-item" key={r.id}>
                        <div className="log-icon" style={{background:ct?.bg,color:ct?.color}}>{ct?.icon}</div>
                        <div className="log-info">
                          <div className="log-type">{ct?.label}</div>
                          <div className="log-date">{formatDate(r.date)}{r.note?` · ${r.note}`:""}</div>
                        </div>
                        {isExtra && <span className="badge" style={{background:G.redLight,color:G.red}}>Extra</span>}
                        <button className="btn btn-xs btn-danger" onClick={()=>removeRecord(r.id)} style={{marginLeft:6}}>✕</button>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty" style={{padding:"24px 0"}}>
                    <div className="empty-icon">📋</div>
                    <div className="empty-text">Sin clases este mes</div>
                  </div>
                )}
              </div>
              </>)}

              {/* ── FICHA TAB ── */}
              {detailTab === "ficha" && (
                <div className="card">
                  <div className="card-title" style={{marginBottom:16}}>Ficha del socio</div>

                  {/* Row 1: datos personales */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:16}}>
                    <div>
                      <div className="text-xs text-gray bold mb-4">FECHA DE NACIMIENTO</div>
                      <div className="text-sm">{selectedMember.birthDate ? formatDate(selectedMember.birthDate) : "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray bold mb-4">EDAD</div>
                      <div className="text-sm">{calcAge(selectedMember.birthDate) ? `${calcAge(selectedMember.birthDate)} años` : "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray bold mb-4">FECHA DE INGRESO</div>
                      <div className="text-sm">{formatDate(selectedMember.joinDate)}</div>
                    </div>
                  </div>

                  <div className="divider"/>

                  {/* Row 2: pago */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                    <div>
                      <div className="text-xs text-gray bold mb-4">FECHA DE PAGO</div>
                      <div className="text-sm">{selectedMember.paymentDate ? `Día ${new Date(selectedMember.paymentDate+"T12:00:00").getDate()} de cada mes` : "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray bold mb-4">PRÓXIMO PAGO</div>
                      <div style={{fontSize:13,fontWeight:700,color:G.teal}}>{selectedMember.paymentDate ? formatDate(nextPaymentDue(selectedMember.paymentDate)) : "—"}</div>
                    </div>
                  </div>

                  <div className="divider"/>

                  {/* Diagnosis */}
                  <div style={{marginBottom:16}}>
                    <div className="text-xs text-gray bold mb-4">DIAGNÓSTICO</div>
                    <div className="text-sm">{selectedMember.diagnosis || "—"}</div>
                  </div>

                  <div className="divider"/>

                  {/* Emergency contact */}
                  <div style={{marginBottom:16}}>
                    <div className="text-xs text-gray bold mb-8">CONTACTO DE EMERGENCIA</div>
                    <div style={{background:G.redLight,borderRadius:10,padding:"12px 16px"}}>
                      <div style={{fontWeight:700,fontSize:14,color:G.red,marginBottom:2}}>
                        {selectedMember.emergencyContact || "—"}
                        {selectedMember.emergencyRelation ? <span style={{fontWeight:400,fontSize:12,color:G.gray}}> · {selectedMember.emergencyRelation}</span> : ""}
                      </div>
                      <div style={{fontSize:13,color:G.gray}}>{selectedMember.emergencyPhone || "Sin teléfono registrado"}</div>
                    </div>
                  </div>

                  {/* Comments */}
                  {selectedMember.comments && (
                    <>
                      <div className="divider"/>
                      <div>
                        <div className="text-xs text-gray bold mb-4">COMENTARIOS</div>
                        <div style={{fontSize:13,color:G.ink,lineHeight:1.6,background:G.amberLight,padding:"10px 14px",borderRadius:8}}>
                          {selectedMember.comments}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="divider"/>
                  <button className="btn btn-ghost btn-sm" onClick={openEditMember}>✏️ Editar ficha</button>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: COBROS
          ══════════════════════════════════════════════════════════════════ */}
          {view === "cobros" && (
            <div>
              <h1 style={{fontFamily:"'Fraunces',serif",fontSize:22,marginBottom:4}}>Cobros pendientes</h1>
              <div className="text-xs text-gray mb-20">{monthLabel(month)} — socios con clases agotadas que requieren renovación</div>

              {alerts.length === 0 ? (
                <div className="card">
                  <div className="empty">
                    <div className="empty-icon">✅</div>
                    <div className="empty-text">Sin cobros pendientes este mes</div>
                    <div className="empty-sub">Todos los socios están dentro de su paquete</div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <table className="charges-table">
                    <thead>
                      <tr>
                        <th>Socio</th>
                        <th>Plan actual</th>
                        <th>Clases usadas</th>
                        <th>Almuerzos</th>
                        <th>Clases extra</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alerts.map(m => {
                        const s = getMemberStatus(m, records, month);
                        const extra = Math.max(0, s.used - s.total);
                        return (
                          <tr key={m.id}>
                            <td>
                              <div className="bold" style={{fontSize:13}}>{m.name}</div>
                              <div className="text-xs text-gray">{formatDate(m.joinDate)}</div>
                            </td>
                            <td>
                              <span className="badge" style={{background:G.tealLight,color:G.teal}}>{s.plan?.label}</span>
                            </td>
                            <td>
                              <span className="bold" style={{color:G.red}}>{s.used}</span>
                              <span className="text-xs text-gray"> / {s.total}</span>
                            </td>
                            <td>
                              {(() => { const meals = getMemberMeals(m.id, records, month); return meals.length > 0 ? <span className="badge" style={{background:G.orangeLight,color:G.orange}}>{meals.length} · ${(meals.length*MEAL_PRICE).toLocaleString()}</span> : <span className="text-xs text-gray">—</span>; })()}
                            </td>
                            <td>
                              {extra > 0
                                ? <span className="badge" style={{background:G.redLight,color:G.red}}>+{extra} extra</span>
                                : <span className="text-xs text-gray">Agotadas</span>
                              }
                            </td>
                            <td>
                              <button className="btn btn-primary btn-sm"
                                onClick={()=>{
                                  setRenewTarget(m);
                                  setRenewPlan(m.plan);
                                  setShowRenew(true);
                                }}>
                                Renovar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Near limit */}
              {warnings.length > 0 && (
                <>
                  <h2 style={{fontFamily:"'Fraunces',serif",fontSize:17,margin:"24px 0 12px"}}>Próximos a agotar</h2>
                  <div className="card">
                    <table className="charges-table">
                      <thead>
                        <tr><th>Socio</th><th>Plan</th><th>Usadas</th><th>Restantes</th></tr>
                      </thead>
                      <tbody>
                        {warnings.map(m => {
                          const s = getMemberStatus(m, records, month);
                          return (
                            <tr key={m.id}>
                              <td><div className="bold" style={{fontSize:13}}>{m.name}</div></td>
                              <td><span className="badge" style={{background:G.tealLight,color:G.teal}}>{s.plan?.label}</span></td>
                              <td><span className="bold">{s.used}</span><span className="text-xs text-gray"> / {s.total}</span></td>
                              <td><span className="badge" style={{background:G.amberLight,color:G.amber}}>{s.remaining} restantes</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: RESUMEN
          ══════════════════════════════════════════════════════════════════ */}
          {view === "resumen" && (
            <div>
              <h1 style={{fontFamily:"'Fraunces',serif",fontSize:22,marginBottom:4}}>Resumen</h1>
              <div className="text-xs text-gray mb-20">{monthLabel(month)}</div>

              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-num" style={{color:G.teal}}>{activeMembers}</div>
                  <div className="stat-label">Socios activos</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{color:G.blue}}>{totalClasses}</div>
                  <div className="stat-label">Clases este mes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{color:G.red}}>{agotadosCount}</div>
                  <div className="stat-label">Con clases agotadas</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{color:G.amber}}>{warnings.length}</div>
                  <div className="stat-label">Por agotar</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{color:G.orange}}>{totalMeals}</div>
                  <div className="stat-label">Almuerzos del mes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{color:G.orange}}>${(totalMeals*MEAL_PRICE).toLocaleString()}</div>
                  <div className="stat-label">Ingresos comedor</div>
                </div>
              </div>

              {/* By type */}
              <div className="card mb-16">
                <div className="card-title">Clases por tipo</div>
                <div className="card-sub">{monthLabel(month)}</div>
                {CLASS_TYPES.map(ct => {
                  const cnt = records.filter(r=>r.month===month&&r.type===ct.id).length;
                  const maxCnt = Math.max(...CLASS_TYPES.map(c=>records.filter(r=>r.month===month&&r.type===c.id).length),1);
                  return (
                    <div key={ct.id} style={{marginBottom:12}}>
                      <div className="flex-between mb-4">
                        <span style={{fontSize:13,fontWeight:600}}>{ct.icon} {ct.label}</span>
                        <span style={{fontSize:13,fontWeight:700,color:ct.color}}>{cnt} clases</span>
                      </div>
                      <div className="progress-bg">
                        <div className="progress-fill" style={{width:`${(cnt/maxCnt)*100}%`,background:ct.color}}/>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Per member */}
              <div className="card">
                <div className="card-title">Uso por socio</div>
                <div className="card-sub">{monthLabel(month)}</div>
                <table className="charges-table">
                  <thead>
                    <tr><th>Socio</th><th>Plan</th><th>Usadas</th><th>Límite</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map(m => {
                      const s = getMemberStatus(m, records, month);
                      const statusMap = { agotado:[G.redLight,G.red,"Agotadas"], por_agotar:[G.amberLight,G.amber,"Por agotar"], ok:[G.greenLight,G.green,"Activo"] };
                      const [sbg,scol,slabel] = statusMap[s.status];
                      return (
                        <tr key={m.id} style={{cursor:"pointer"}} onClick={()=>{setSelected(m.id);setView("socios");}}>
                          <td><span className="bold" style={{fontSize:13}}>{m.name}</span></td>
                          <td><span className="text-xs text-gray">{s.plan?.label}</span></td>
                          <td><span className="bold">{s.used}</span></td>
                          <td><span className="text-xs text-gray">{s.total>=999?"∞":s.total}</span></td>
                          <td><span className="badge" style={{background:sbg,color:scol}}>{slabel}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ── MODAL: Nuevo socio ── */}
        {showAddMember && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowAddMember(false)}>
            <div className="modal">
              <div className="modal-title">Nuevo socio</div>
              <div className="modal-sub">Registrar en el control de clases de Nuba</div>
              <div className="form-group"><label>Nombre completo *</label>
                <input value={newMember.name} onChange={e=>setNewMember(p=>({...p,name:e.target.value}))} placeholder="Nombre y apellidos"/></div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Plan</label>
                  <select value={newMember.plan} onChange={e=>setNewMember(p=>({...p,plan:e.target.value}))}>
                    {PLANS.map(p=><option key={p.id} value={p.id}>{p.label} — {p.classes>=999?"Ilimitado":`${p.classes} clases`}</option>)}
                  </select></div>
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de ingreso</label>
                  <input type="date" value={newMember.joinDate} onChange={e=>setNewMember(p=>({...p,joinDate:e.target.value}))}/></div>
              </div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de nacimiento</label>
                  <input type="date" value={newMember.birthDate} onChange={e=>setNewMember(p=>({...p,birthDate:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de pago (día del mes)</label>
                  <input type="date" value={newMember.paymentDate} onChange={e=>setNewMember(p=>({...p,paymentDate:e.target.value}))}/></div>
              </div>
              <div className="form-group"><label>Diagnóstico</label>
                <input value={newMember.diagnosis} onChange={e=>setNewMember(p=>({...p,diagnosis:e.target.value}))} placeholder="Ej: Hipertensión, deterioro cognitivo leve..."/></div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Contacto de emergencia</label>
                  <input value={newMember.emergencyContact} onChange={e=>setNewMember(p=>({...p,emergencyContact:e.target.value}))} placeholder="Nombre completo"/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Parentesco</label>
                  <input value={newMember.emergencyRelation} onChange={e=>setNewMember(p=>({...p,emergencyRelation:e.target.value}))} placeholder="Hijo, hija, cónyuge..."/></div>
              </div>
              <div className="form-group"><label>Teléfono de emergencia</label>
                <input value={newMember.emergencyPhone} onChange={e=>setNewMember(p=>({...p,emergencyPhone:e.target.value}))} placeholder="55 1234 5678"/></div>
              <div className="form-group"><label>Comentarios</label>
                <textarea rows={2} value={newMember.comments} onChange={e=>setNewMember(p=>({...p,comments:e.target.value}))} placeholder="Alergias, limitaciones, observaciones..."/></div>
              <div className="flex gap-8" style={{justifyContent:"flex-end",marginTop:8}}>
                <button className="btn btn-ghost" onClick={()=>setShowAddMember(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={addMember}>Agregar socio</button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Registrar clase ── */}
        {showAddClass && selectedMember && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowAddClass(false)}>
            <div className="modal">
              <div className="modal-title">Registrar clase</div>
              <div className="modal-sub">{selectedMember.name}</div>
              {selStatus?.status === "agotado" && (
                <AlertBanner type="red" msg="Este socio ya agotó sus clases del mes. Esta clase se registrará como extra."/>
              )}
              <div className="form-group mb-12">
                <label>Tipo de clase</label>
                <div className="type-pills" style={{marginTop:8}}>
                  {CLASS_TYPES.map(ct=>(
                    <ClassTypePill key={ct.id} type={ct.id} selected={newClass.type===ct.id}
                      onClick={()=>setNewClass(p=>({...p,type:ct.id}))}/>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Fecha</label>
                  <input type="date" value={newClass.date} onChange={e=>setNewClass(p=>({...p,date:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Nota (opcional)</label>
                  <input value={newClass.note} onChange={e=>setNewClass(p=>({...p,note:e.target.value}))} placeholder="Ej: No asistió, justificó..."/></div>
              </div>
              <div className="flex gap-8" style={{justifyContent:"flex-end",marginTop:16}}>
                <button className="btn btn-ghost" onClick={()=>setShowAddClass(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={addClassRecord}>Registrar</button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Registrar comida ── */}
        {showAddMeal && selectedMember && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowAddMeal(false)}>
            <div className="modal">
              <div className="modal-title">Registrar almuerzo</div>
              <div className="modal-sub">{selectedMember.name} · ${MEAL_PRICE} por almuerzo</div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Fecha</label>
                  <input type="date" value={newMeal.date} onChange={e=>setNewMeal(p=>({...p,date:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Nota (opcional)</label>
                  <input value={newMeal.note} onChange={e=>setNewMeal(p=>({...p,note:e.target.value}))} placeholder="Ej: menú especial..."/></div>
              </div>
              <div style={{margin:"16px 0",padding:"12px 16px",background:G.orangeLight,borderRadius:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,color:G.orange}}>Cargo a registrar</span>
                <span style={{fontSize:18,fontWeight:700,color:G.orange}}>${MEAL_PRICE}</span>
              </div>
              <div className="flex gap-8" style={{justifyContent:"flex-end"}}>
                <button className="btn btn-ghost" onClick={()=>setShowAddMeal(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={addMealRecord}>Registrar almuerzo</button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Editar ficha ── */}
        {showEditMember && editMember && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowEditMember(false)}>
            <div className="modal" style={{maxWidth:580}}>
              <div className="modal-title">Editar ficha</div>
              <div className="modal-sub">{editMember.name}</div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Nombre completo</label>
                  <input value={editMember.name||""} onChange={e=>setEditMember(p=>({...p,name:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Plan</label>
                  <select value={editMember.plan||"paq8"} onChange={e=>setEditMember(p=>({...p,plan:e.target.value}))}>
                    {PLANS.map(p=><option key={p.id} value={p.id}>{p.label} — {p.classes} clases</option>)}
                  </select></div>
              </div>
              <div className="form-row three">
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de nacimiento</label>
                  <input type="date" value={editMember.birthDate||""} onChange={e=>setEditMember(p=>({...p,birthDate:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de ingreso</label>
                  <input type="date" value={editMember.joinDate||""} onChange={e=>setEditMember(p=>({...p,joinDate:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de pago (día del mes)</label>
                  <input type="date" value={editMember.paymentDate||""} onChange={e=>setEditMember(p=>({...p,paymentDate:e.target.value}))}/></div>
              </div>
              <div className="form-group" style={{marginTop:14}}><label>Diagnóstico</label>
                <input value={editMember.diagnosis||""} onChange={e=>setEditMember(p=>({...p,diagnosis:e.target.value}))} placeholder="Ej: Hipertensión, DM2, deterioro cognitivo leve..."/></div>
              <div className="form-row" style={{marginTop:0}}>
                <div className="form-group" style={{marginBottom:0}}><label>Contacto de emergencia</label>
                  <input value={editMember.emergencyContact||""} onChange={e=>setEditMember(p=>({...p,emergencyContact:e.target.value}))} placeholder="Nombre completo"/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Parentesco</label>
                  <input value={editMember.emergencyRelation||""} onChange={e=>setEditMember(p=>({...p,emergencyRelation:e.target.value}))} placeholder="Hijo, hija, cónyuge..."/></div>
              </div>
              <div className="form-group" style={{marginTop:14}}><label>Teléfono de emergencia</label>
                <input value={editMember.emergencyPhone||""} onChange={e=>setEditMember(p=>({...p,emergencyPhone:e.target.value}))} placeholder="55 1234 5678"/></div>
              <div className="form-group"><label>Comentarios</label>
                <textarea rows={3} value={editMember.comments||""} onChange={e=>setEditMember(p=>({...p,comments:e.target.value}))} placeholder="Alergias, limitaciones físicas, observaciones importantes..."/></div>
              <div className="flex gap-8" style={{justifyContent:"flex-end"}}>
                <button className="btn btn-ghost" onClick={()=>setShowEditMember(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={saveEditMember}>Guardar cambios</button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Renovar plan ── */}
        {showRenew && renewTarget && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowRenew(false)}>
            <div className="modal">
              <div className="modal-title">Renovar paquete</div>
              <div className="modal-sub">{renewTarget?.name}</div>
              <AlertBanner type="amber" msg="Al renovar, el socio regresa a 0 clases usadas en el próximo ciclo."/>
              <div className="form-group mt-12" style={{marginTop:12}}>
                <label>Seleccionar nuevo paquete</label>
                <div style={{display:"grid",gap:8,marginTop:8}}>
                  {PLANS.map(p=>(
                    <div key={p.id}
                      onClick={()=>setRenewPlan(p.id)}
                      style={{
                        padding:"12px 16px",borderRadius:10,cursor:"pointer",
                        border:`2px solid ${renewPlan===p.id?G.teal:"#dde4e3"}`,
                        background: renewPlan===p.id?G.tealPale:G.white,
                        transition:"all .15s"
                      }}>
                      <div className="flex-between">
                        <span style={{fontWeight:700,fontSize:14,color:renewPlan===p.id?G.teal:G.ink}}>{p.label}</span>
                        <span style={{fontWeight:700,color:G.teal}}>${p.price.toLocaleString()}/mes</span>
                      </div>
                      <div style={{fontSize:12,color:G.gray,marginTop:2}}>
                        {p.classes>=999?"Clases ilimitadas":`${p.classes} clases incluidas`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-8" style={{justifyContent:"flex-end",marginTop:16}}>
                <button className="btn btn-ghost" onClick={()=>setShowRenew(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={renewMemberPlan}>Confirmar renovación</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
