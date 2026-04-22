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
  // Nuba brand colors (olive/sage)
  teal:"#4A5C3A",       // Nuba dark green (primary)
  tealMid:"#6B7D4D",    // medium green
  tealLight:"#E8EEDA",  // light sage bg
  tealPale:"#F5F8EC",   // very pale sage
  ink:"#2A3522",        // near black with green tint
  gray:"#5A6B5A",       // muted sage gray
  grayLight:"#F4F6EF",  // background
  white:"#FFFFFF",
  brandLight:"#A8B580", // lighter sage accent (from logo)
  amber:"#C0722F",
  amberLight:"#FBEEE0",
  red:"#C0392B",
  redLight:"#FDE8E8",
  blue:"#1F6FA3",
  blueLight:"#EBF5FB",
  green:"#4A5C3A",      // alias to teal for consistency
  greenLight:"#E8EEDA",
  purple:"#7D3C98",
  purpleLight:"#F5EEF8",
  orange:"#C0722F",
  orangeLight:"#FBEEE0",
};

const CLASS_TYPES = [
  { id:"taichi",      label:"Tai Chi",               icon:"🌿", color:"#C0722F",  bg:"#FBEEE0"      },
  { id:"activacion",  label:"Activación Física",     icon:"🏃", color:"#1F3A5F",  bg:"#DEE4EC"      },
  { id:"yoga",        label:"Yoga",                  icon:"🧘", color:"#D4A82F",  bg:"#FBF2D8"      },
  { id:"baile",       label:"Baile",                 icon:"💃", color:"#7A2E3B",  bg:"#F0D8DC"      },
  { id:"mindfulness", label:"Mindfulness",           icon:"🕯️", color:"#7A8D5C",  bg:"#E8EEDA"      },
  { id:"ceramica",    label:"Cerámica",              icon:"🏺", color:"#C25B7A",  bg:"#F6DEE5"      },
  { id:"pintura",     label:"Pintura",               icon:"🎨", color:"#2F6B6D",  bg:"#D8E8E8"      },
  { id:"tejido",      label:"Tejido",                icon:"🧶", color:"#CB4335",  bg:"#FDEDEC"      },
  { id:"cognitivo",   label:"Estimulación Mental",   icon:"🧠", color:"#6DA3D4",  bg:"#DEEBF7"      },
  // Slots especiales no facturables
  { id:"bienvenida",  label:"Bienvenida",            icon:"🌅", color:"#4A5C3A",  bg:"#5A6D48", special:true },
  { id:"comida",      label:"Comida",                icon:"🍽️", color:"#FFFFFF",  bg:"#A8B580", special:true },
];

const DEFAULT_PLANS = [
  { id:"paq4",  label:"Paquete 4",   classes: 4,  price: 800  },
  { id:"paq8",  label:"Paquete 8",   classes: 8,  price: 1200 },
  { id:"paq12", label:"Paquete 12",  classes: 12, price: 1800 },
  { id:"paq16", label:"Paquete 16",  classes: 16, price: 2200 },
  { id:"paq40", label:"Paquete 40",  classes: 40, price: 4000 },
];

const DEFAULT_MEAL_PRICE = 80;

const INITIAL_ROOMS = [
  { id:"arte",       label:"Salón de Arte",         capacity:12, icon:"🎨" },
  { id:"fisica",     label:"Salón de Actividad Física",capacity:15, icon:"🏃" },
  { id:"cognitivo",  label:"Salón Cognitivo",       capacity:10, icon:"🧠" },
  { id:"cine",       label:"Salón de Cine",         capacity:20, icon:"🎬" },
  { id:"dependientes",label:"Salón de Dependientes",capacity:10, icon:"💙" },
  { id:"comedor",    label:"Comedor",               capacity:30, icon:"🍽️" },
];

const INITIAL_TEACHERS = [
  { id:1, name:"María González",  phone:"55 1111 2222", specialties:["yoga","taichi","mindfulness"], hourlyRate:350, active:true },
  { id:2, name:"Carlos Hernández",phone:"55 3333 4444", specialties:["activacion","baile"],          hourlyRate:320, active:true },
  { id:3, name:"Lucía Mendoza",   phone:"55 5555 6666", specialties:["ceramica","pintura","tejido"], hourlyRate:380, active:true },
  { id:4, name:"Dr. Armando",     phone:"",              specialties:["cognitivo"],                  hourlyRate:0,   active:true },
];

const DAYS = [
  { id:"lun", label:"Lunes" },
  { id:"mar", label:"Martes" },
  { id:"mie", label:"Miércoles" },
  { id:"jue", label:"Jueves" },
  { id:"vie", label:"Viernes" },
];

const INITIAL_SCHEDULE = [
  // 09:00 Bienvenida (todos los días)
  { id:1,  day:"lun", startTime:"09:00", endTime:"09:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  { id:2,  day:"mar", startTime:"09:00", endTime:"09:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  { id:3,  day:"mie", startTime:"09:00", endTime:"09:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  { id:4,  day:"jue", startTime:"09:00", endTime:"09:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  { id:5,  day:"vie", startTime:"09:00", endTime:"09:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  // 09:30
  { id:6,  day:"lun", startTime:"09:30", endTime:"10:30", classType:"taichi",     roomId:"fisica",    teacherId:1, active:true },
  { id:7,  day:"mar", startTime:"09:30", endTime:"10:30", classType:"cognitivo",  roomId:"cognitivo", teacherId:4, active:true },
  { id:8,  day:"mie", startTime:"09:30", endTime:"10:30", classType:"taichi",     roomId:"fisica",    teacherId:1, active:true },
  { id:9,  day:"jue", startTime:"09:30", endTime:"10:30", classType:"cognitivo",  roomId:"cognitivo", teacherId:4, active:true },
  { id:10, day:"vie", startTime:"09:30", endTime:"10:30", classType:"taichi",     roomId:"fisica",    teacherId:1, active:true },
  // 10:30
  { id:11, day:"lun", startTime:"10:30", endTime:"11:30", classType:"cognitivo",  roomId:"cognitivo", teacherId:4, active:true },
  { id:12, day:"mar", startTime:"10:30", endTime:"11:30", classType:"pintura",    roomId:"arte",      teacherId:3, active:true },
  { id:13, day:"mie", startTime:"10:30", endTime:"11:30", classType:"activacion", roomId:"fisica",    teacherId:2, active:true },
  { id:14, day:"jue", startTime:"10:30", endTime:"11:30", classType:"pintura",    roomId:"arte",      teacherId:3, active:true },
  { id:15, day:"vie", startTime:"10:30", endTime:"11:30", classType:"activacion", roomId:"fisica",    teacherId:2, active:true },
  // 11:30
  { id:16, day:"lun", startTime:"11:30", endTime:"12:30", classType:"ceramica",   roomId:"arte",      teacherId:3, active:true },
  { id:17, day:"mar", startTime:"11:30", endTime:"12:30", classType:"yoga",       roomId:"fisica",    teacherId:1, active:true },
  { id:18, day:"mie", startTime:"11:30", endTime:"12:30", classType:"ceramica",   roomId:"arte",      teacherId:3, active:true },
  { id:19, day:"jue", startTime:"11:30", endTime:"12:30", classType:"yoga",       roomId:"fisica",    teacherId:1, active:true },
  { id:20, day:"vie", startTime:"11:30", endTime:"12:30", classType:"ceramica",   roomId:"arte",      teacherId:3, active:true },
  // 13:00 COMIDA
  { id:21, day:"lun", startTime:"13:00", endTime:"14:00", classType:"comida",     roomId:"comedor",   teacherId:null, active:true },
  { id:22, day:"mar", startTime:"13:00", endTime:"14:00", classType:"comida",     roomId:"comedor",   teacherId:null, active:true },
  { id:23, day:"mie", startTime:"13:00", endTime:"14:00", classType:"comida",     roomId:"comedor",   teacherId:null, active:true },
  { id:24, day:"jue", startTime:"13:00", endTime:"14:00", classType:"comida",     roomId:"comedor",   teacherId:null, active:true },
  { id:25, day:"vie", startTime:"13:00", endTime:"14:00", classType:"comida",     roomId:"comedor",   teacherId:null, active:true },
  // 14:00 Bienvenida tarde
  { id:26, day:"lun", startTime:"14:00", endTime:"14:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  { id:27, day:"mar", startTime:"14:00", endTime:"14:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  { id:28, day:"mie", startTime:"14:00", endTime:"14:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  { id:29, day:"jue", startTime:"14:00", endTime:"14:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  { id:30, day:"vie", startTime:"14:00", endTime:"14:30", classType:"bienvenida", roomId:"fisica",    teacherId:null, active:true },
  // 14:30
  { id:31, day:"lun", startTime:"14:30", endTime:"15:30", classType:"pintura",    roomId:"arte",      teacherId:3, active:true },
  { id:32, day:"mar", startTime:"14:30", endTime:"15:30", classType:"ceramica",   roomId:"arte",      teacherId:3, active:true },
  { id:33, day:"mie", startTime:"14:30", endTime:"15:30", classType:"pintura",    roomId:"arte",      teacherId:3, active:true },
  { id:34, day:"jue", startTime:"14:30", endTime:"15:30", classType:"ceramica",   roomId:"arte",      teacherId:3, active:true },
  { id:35, day:"vie", startTime:"14:30", endTime:"15:30", classType:"pintura",    roomId:"arte",      teacherId:3, active:true },
  // 16:00
  { id:36, day:"lun", startTime:"16:00", endTime:"17:00", classType:"yoga",       roomId:"fisica",    teacherId:1, active:true },
  { id:37, day:"mar", startTime:"16:00", endTime:"17:00", classType:"baile",      roomId:"fisica",    teacherId:2, active:true },
  { id:38, day:"mie", startTime:"16:00", endTime:"17:00", classType:"yoga",       roomId:"fisica",    teacherId:1, active:true },
  { id:39, day:"jue", startTime:"16:00", endTime:"17:00", classType:"taichi",     roomId:"fisica",    teacherId:1, active:true },
  { id:40, day:"vie", startTime:"16:00", endTime:"17:00", classType:"taichi",     roomId:"fisica",    teacherId:1, active:true },
  // 17:00 Estimulación mental (cierre)
  { id:41, day:"lun", startTime:"17:00", endTime:"18:00", classType:"cognitivo",  roomId:"cognitivo", teacherId:4, active:true },
  { id:42, day:"mar", startTime:"17:00", endTime:"18:00", classType:"cognitivo",  roomId:"cognitivo", teacherId:4, active:true },
  { id:43, day:"mie", startTime:"17:00", endTime:"18:00", classType:"cognitivo",  roomId:"cognitivo", teacherId:4, active:true },
  { id:44, day:"jue", startTime:"17:00", endTime:"18:00", classType:"cognitivo",  roomId:"cognitivo", teacherId:4, active:true },
  { id:45, day:"vie", startTime:"17:00", endTime:"18:00", classType:"cognitivo",  roomId:"cognitivo", teacherId:4, active:true },
];

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
  { id:1, name:"Rosa Martínez López",    plan:"paq16", joinDate:"2026-01-10", active:true, gender:"F",
    birthDate:"1948-03-22", paymentDate:"2026-04-01",
    diagnosis:"Deterioro cognitivo leve",
    emergencyContact:"Carlos López", emergencyRelation:"Hijo",
    emergencyPhone:"55 1234 5678", comments:"Alérgica a la penicilina. Muy participativa." },
  { id:2, name:"Ernesto Fuentes García", plan:"paq40", joinDate:"2026-02-01", active:true, gender:"M",
    birthDate:"1952-07-14", paymentDate:"2026-04-01",
    diagnosis:"Hipertensión, DM2 controlada",
    emergencyContact:"Ana Fuentes", emergencyRelation:"Hija",
    emergencyPhone:"55 9876 5432", comments:"" },
  { id:3, name:"Carmen Vda. de Torres",  plan:"paq8",  joinDate:"2026-03-05", active:true, gender:"F",
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
@media print {
  .header, .nav-btn, .btn { display: none !important; }
  .app { max-width: 100% !important; padding: 0 !important; }
  body { background: white !important; }
  .card { box-shadow: none !important; border: 1px solid #ddd; page-break-inside: avoid; }
  table { page-break-inside: auto; }
  tr { page-break-inside: avoid; }
}
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
function addDays(iso, days) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// Current cycle = from cycleStart (or paymentDate) for 30 days OR until classes exhaust
function getCurrentCycle(member, records) {
  const cycleStart = member.cycleStart || member.paymentDate || member.joinDate || today();
  const cycleEnd = addDays(cycleStart, 30);
  // class records (not meals) within the cycle window, attributed to this member
  const cycleClasses = records.filter(r =>
    r.memberId === member.id &&
    r.kind !== "meal" &&
    r.date >= cycleStart &&
    r.date <= cycleEnd
  );
  return { cycleStart, cycleEnd, cycleClasses };
}

function getMemberStatus(member, records, month, PLANS) {
  const plan = PLANS.find(p => p.id === member.plan);
  const { cycleStart, cycleEnd, cycleClasses } = getCurrentCycle(member, records);
  const monthRecords = records.filter(r => r.memberId === member.id && r.month === month && r.kind !== "meal");
  const carriedExtra = member.carriedExtra || 0;
  // Effective used = actual cycle classes + any carried extras from last cycle
  const used = cycleClasses.length + carriedExtra;
  const total = plan?.classes ?? 0;
  const remaining = total >= 999 ? Infinity : total - used;
  const pct = total >= 999 ? 0 : used / total;
  // Check expiration
  const todayStr = today();
  const isExpiredByDate = todayStr > cycleEnd;
  const isExhausted = remaining <= 0;
  // Days until cycle end
  const daysToExpire = Math.ceil((new Date(cycleEnd + "T12:00:00") - new Date(todayStr + "T12:00:00")) / (1000*60*60*24));
  const isExpiringSoon = !isExpiredByDate && daysToExpire <= 3;
  let status = "ok";
  if (isExhausted || isExpiredByDate) status = "agotado";
  else if (pct >= 0.8 || isExpiringSoon) status = "por_agotar";
  return { used, total, remaining, pct, status, plan, monthRecords, cycleClasses, cycleStart, cycleEnd, isExpiredByDate, isExhausted, daysToExpire, isExpiringSoon, carriedExtra };
}

// ── Meal helpers ─────────────────────────────────────────────────────────────
function getMemberMeals(memberId, records, month) {
  return records.filter(r => r.memberId === memberId && r.month === month && r.kind === "meal");
}

// ── Financial summary helpers ─────────────────────────────────────────────────
function getMemberFinancials(member, records, targetMonth, plans, mealPrice) {
  const plan = plans.find(p => p.id === member.plan);
  // Month totals
  const monthMeals = records.filter(r => r.memberId === member.id && r.month === targetMonth && r.kind === "meal").length;
  const monthPlanCost = plan?.price || 0;
  const monthMealCost = monthMeals * mealPrice;
  const monthTotal = monthPlanCost + monthMealCost;

  // Year totals — iterate all months of current year
  const currentYear = targetMonth.split("-")[0];
  const monthsInYear = [];
  for (let m = 1; m <= 12; m++) {
    monthsInYear.push(`${currentYear}-${String(m).padStart(2,"0")}`);
  }
  let yearPlanCost = 0;
  let yearMealsCount = 0;
  monthsInYear.forEach(mk => {
    const hasActivityInMonth = records.some(r => r.memberId === member.id && r.month === mk);
    if (hasActivityInMonth) {
      yearPlanCost += (plan?.price || 0);
    }
    yearMealsCount += records.filter(r => r.memberId === member.id && r.month === mk && r.kind === "meal").length;
  });
  const yearMealCost = yearMealsCount * mealPrice;
  const yearTotal = yearPlanCost + yearMealCost;

  return {
    monthPlanCost, monthMealCost, monthMeals, monthTotal,
    yearPlanCost, yearMealCost, yearMeals: yearMealsCount, yearTotal,
  };
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [members, setMembers]     = useLocalStorage("nuba_members", INITIAL_MEMBERS);
  const [records, setRecords]     = useLocalStorage("nuba_records", INITIAL_RECORDS);
  const [rooms, setRooms]         = useLocalStorage("nuba_rooms", INITIAL_ROOMS);
  const [teachers, setTeachers]   = useLocalStorage("nuba_teachers", INITIAL_TEACHERS);
  const [schedule, setSchedule]   = useLocalStorage("nuba_schedule", INITIAL_SCHEDULE);
  const [PLANS, setPlans]         = useLocalStorage("nuba_plans", DEFAULT_PLANS);
  const [MEAL_PRICE, setMealPrice] = useLocalStorage("nuba_meal_price", DEFAULT_MEAL_PRICE);
  const [mealPayments, setMealPayments] = useLocalStorage("nuba_meal_payments", {}); // {recordId: true/false}
  const [enrollments, setEnrollments] = useLocalStorage("nuba_enrollments", {}); // {memberId: [slotId, slotId, ...]}
  const [attendances, setAttendances] = useLocalStorage("nuba_attendances", {});
  const [weeklyExceptions, setWeeklyExceptions] = useLocalStorage("nuba_weekly_exceptions", {}); // {memberId: {weekKey: {slotId: "skip"|"add"}}} // {"slotId_YYYY-MM-DD": [memberId, ...]}
  const [payments, setPayments]   = useLocalStorage("nuba_payments", []); // [{id, memberId, date, month, amount, method, concept, note}]
  const [expenses, setExpenses]   = useLocalStorage("nuba_expenses", []); // [{id, date, month, category, amount, note}]
  const [view, setView]           = useState("hoy");
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
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher]     = useState(null);
  const [showRoomModal, setShowRoomModal]       = useState(false);
  const [editingRoom, setEditingRoom]           = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSlot, setEditingSlot]           = useState(null);
  const [showEnrollModal, setShowEnrollModal]   = useState(false);
  const [enrollingMember, setEnrollingMember]   = useState(null);
  const [enrollWeek, setEnrollWeek]             = useState(null); // will be set when opening modal
  const [attendanceSlot, setAttendanceSlot]     = useState(null);
  const [attendanceDate, setAttendanceDate]     = useState(today());
  const [resumenDetail, setResumenDetail]       = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingPayment, setEditingPayment]     = useState(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense]     = useState(null);
  const [showRenew, setShowRenew]         = useState(false);

  // New member form
  const [newMember, setNewMember] = useState({ name: "", plan: "paq8", joinDate: today(), gender: "", birthDate: "", paymentDate: today(), diagnosis: "", emergencyContact: "", emergencyRelation: "", emergencyPhone: "", comments: "" });
  // New class form
  const [newClass, setNewClass]   = useState({ types: [], date: today(), note: "" });
  // Renew plan
  const [renewPlan, setRenewPlan] = useState("");
  const [renewTarget, setRenewTarget] = useState(null); // member object, independent of selected

  const selectedMember = members.find(m => m.id === selected);
  const selStatus = selectedMember ? getMemberStatus(selectedMember, records, month, PLANS) : null;

  // ── Alerts: members who hit 100% this month ──
  const alerts = members.filter(m => {
    const s = getMemberStatus(m, records, month, PLANS);
    return s.status === "agotado";
  });
  const warnings = members.filter(m => {
    const s = getMemberStatus(m, records, month, PLANS);
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
    setMembers(prev => [...prev, { id: Date.now(), ...newMember, cycleStart: newMember.joinDate || today(), active: true }]);
    setNewMember({ name: "", plan: "paq8", joinDate: today(), gender: "", birthDate: "", paymentDate: today(), diagnosis: "", emergencyContact: "", emergencyRelation: "", emergencyPhone: "", comments: "" });
    setShowAddMember(false);
  }

  function addClassRecord() {
    if (!selectedMember || !newClass.types?.length) return;
    const base = Date.now();
    const newRecs = newClass.types.map((t, i) => ({
      id: base + i,
      memberId: selectedMember.id,
      type: t,
      date: newClass.date,
      month: newClass.date.slice(0, 7),
      note: newClass.note
    }));
    setRecords(prev => [...prev, ...newRecs]);
    setNewClass({ types: [], date: today(), note: "" });
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
    const newCycleStart = today();
    // Check if current cycle has extra classes that should carry over
    const currentStatus = getMemberStatus(renewTarget, records, month, PLANS);
    const extraClasses = Math.max(0, currentStatus.used - currentStatus.total);
    setMembers(prev => prev.map(m => m.id === id ? {
      ...m,
      plan: renewPlan,
      cycleStart: newCycleStart,
      carriedExtra: extraClasses  // Save extras to deduct from next cycle
    } : m));
    if (extraClasses > 0) {
      alert(`Se registraron ${extraClasses} clase(s) extra del ciclo anterior que se descontarán del nuevo paquete.`);
    }
    setShowRenew(false);
    setRenewTarget(null);
    setSelected(id);
    setView("socios");
  }

  // ── Week helpers ──
  function getWeekKey(dateStr) {
    // Returns ISO week key: "YYYY-MM-DD" for the Monday of that week
    const d = new Date(dateStr + "T12:00:00");
    const dow = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((dow + 6) % 7));
    return monday.toISOString().split("T")[0];
  }
  function getWeekRange(weekKey) {
    const monday = new Date(weekKey + "T12:00:00");
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    return { start: monday.toISOString().split("T")[0], end: friday.toISOString().split("T")[0] };
  }
  function shiftWeek(weekKey, delta) {
    const d = new Date(weekKey + "T12:00:00");
    d.setDate(d.getDate() + (delta * 7));
    return d.toISOString().split("T")[0];
  }
  function formatWeekRange(weekKey) {
    const { start, end } = getWeekRange(weekKey);
    const s = new Date(start + "T12:00:00");
    const e = new Date(end + "T12:00:00");
    const monthS = s.toLocaleDateString("es-MX", { month: "short" });
    const monthE = e.toLocaleDateString("es-MX", { month: "short" });
    if (monthS === monthE) return `${s.getDate()} – ${e.getDate()} ${monthE}`;
    return `${s.getDate()} ${monthS} – ${e.getDate()} ${monthE}`;
  }
  // Resolved enrollment: applies weekly exceptions on top of the base enrollment
  function isEnrolledInWeek(memberId, slotId, weekKey) {
    const baseEnrolled = (enrollments[memberId] || []).includes(slotId);
    const exc = weeklyExceptions[memberId]?.[weekKey]?.[slotId];
    if (exc === "skip") return false;
    if (exc === "add") return true;
    return baseEnrolled;
  }
  function toggleWeekEnrollment(memberId, slotId, weekKey) {
    const baseEnrolled = (enrollments[memberId] || []).includes(slotId);
    const currentlyIn = isEnrolledInWeek(memberId, slotId, weekKey);
    setWeeklyExceptions(prev => {
      const memberExc = { ...(prev[memberId] || {}) };
      const weekExc = { ...(memberExc[weekKey] || {}) };
      if (currentlyIn) {
        // Remove from this week
        if (baseEnrolled) weekExc[slotId] = "skip";
        else delete weekExc[slotId];
      } else {
        // Add to this week
        if (baseEnrolled) delete weekExc[slotId];
        else weekExc[slotId] = "add";
      }
      memberExc[weekKey] = weekExc;
      return { ...prev, [memberId]: memberExc };
    });
  }
  function getWeekEnrollees(slotId, weekKey) {
    return members.filter(m => m.active && isEnrolledInWeek(m.id, slotId, weekKey));
  }
  function hasWeekException(memberId, weekKey) {
    const weekExc = weeklyExceptions[memberId]?.[weekKey] || {};
    return Object.keys(weekExc).length > 0;
  }

  // ── Enrollment helpers ──
  function toggleEnrollment(memberId, slotId) {
    setEnrollments(prev => {
      const current = prev[memberId] || [];
      const next = current.includes(slotId) ? current.filter(id => id !== slotId) : [...current, slotId];
      return { ...prev, [memberId]: next };
    });
  }
  function isEnrolled(memberId, slotId) {
    return (enrollments[memberId] || []).includes(slotId);
  }
  function getSlotEnrollees(slotId) {
    return members.filter(m => m.active && (enrollments[m.id] || []).includes(slotId));
  }

  // ── Attendance helpers ──
  function attendanceKey(slotId, date) { return `${slotId}_${date}`; }
  function toggleAttendance(slotId, date, memberId) {
    const key = attendanceKey(slotId, date);
    const alreadyPresent = (attendances[key] || []).includes(memberId);
    const slot = schedule.find(s => s.id === slotId);
    const classType = slot?.classType || "taichi";

    setAttendances(prev => {
      const current = prev[key] || [];
      const next = alreadyPresent ? current.filter(id => id !== memberId) : [...current, memberId];
      return { ...prev, [key]: next };
    });

    // If marking as present -> add class record; if unmarking -> remove the auto-generated record
    if (alreadyPresent) {
      setRecords(prev => prev.filter(r => !(r.memberId === memberId && r.date === date && r.fromSlotId === slotId)));
    } else {
      setRecords(prev => [...prev, {
        id: Date.now() + Math.random(),
        memberId,
        type: classType,
        date,
        month: date.slice(0, 7),
        fromSlotId: slotId,
        note: "Asistencia marcada"
      }]);
    }
  }
  function isPresent(slotId, date, memberId) {
    return (attendances[attendanceKey(slotId, date)] || []).includes(memberId);
  }
  function getAttendees(slotId, date) {
    return attendances[attendanceKey(slotId, date)] || [];
  }

  // ── Teachers CRUD ──
  function openNewTeacher() { setEditingTeacher({ name:"", phone:"", specialties:[], hourlyRate:0, active:true }); setShowTeacherModal(true); }
  function openEditTeacher(t) { setEditingTeacher({...t}); setShowTeacherModal(true); }
  function saveTeacher() {
    if (!editingTeacher?.name?.trim()) return;
    if (editingTeacher.id) {
      setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? editingTeacher : t));
    } else {
      setTeachers(prev => [...prev, { ...editingTeacher, id: Date.now() }]);
    }
    setShowTeacherModal(false); setEditingTeacher(null);
  }
  function deleteTeacher(id) {
    setTeachers(prev => prev.filter(t => t.id !== id));
  }

  // ── Rooms CRUD ──
  function openNewRoom() { setEditingRoom({ id:"", label:"", capacity:10, icon:"📍" }); setShowRoomModal(true); }
  function openEditRoom(r) { setEditingRoom({...r, _oldId: r.id}); setShowRoomModal(true); }
  function saveRoom() {
    if (!editingRoom?.label?.trim() || !editingRoom?.id?.trim()) return;
    if (editingRoom._oldId) {
      setRooms(prev => prev.map(r => r.id === editingRoom._oldId ? { id: editingRoom.id, label: editingRoom.label, capacity: editingRoom.capacity, icon: editingRoom.icon } : r));
    } else {
      if (rooms.some(r => r.id === editingRoom.id)) { alert("Ya existe un salón con ese ID"); return; }
      setRooms(prev => [...prev, { id: editingRoom.id, label: editingRoom.label, capacity: editingRoom.capacity, icon: editingRoom.icon }]);
    }
    setShowRoomModal(false); setEditingRoom(null);
  }
  function deleteRoom(id) {
    setRooms(prev => prev.filter(r => r.id !== id));
  }

  // ── Schedule CRUD ──
  function openNewSlot(day) { setEditingSlot({ day: day||"lun", startTime:"09:00", endTime:"10:00", classType:"taichi", roomId: rooms[0]?.id, teacherId: teachers[0]?.id, active:true }); setShowScheduleModal(true); }
  function openEditSlot(s) { setEditingSlot({...s}); setShowScheduleModal(true); }
  function saveSlot() {
    if (!editingSlot) return;
    if (editingSlot.id) {
      setSchedule(prev => prev.map(s => s.id === editingSlot.id ? editingSlot : s));
    } else {
      setSchedule(prev => [...prev, { ...editingSlot, id: Date.now() }]);
    }
    setShowScheduleModal(false); setEditingSlot(null);
  }
  function deleteSlot(id) {
    setSchedule(prev => prev.filter(s => s.id !== id));
  }

  // ── Payments CRUD ──
  function openNewPayment(memberId) {
    setEditingPayment({ memberId: memberId || null, date: today(), amount: 0, method: "efectivo", concept: "Mensualidad", note: "" });
    setShowPaymentModal(true);
  }
  function openEditPayment(p) { setEditingPayment({...p}); setShowPaymentModal(true); }
  function savePayment() {
    if (!editingPayment || !editingPayment.memberId || !editingPayment.amount) return;
    const record = { ...editingPayment, month: editingPayment.date.slice(0,7) };
    if (editingPayment.id) {
      setPayments(prev => prev.map(p => p.id === editingPayment.id ? record : p));
    } else {
      setPayments(prev => [...prev, { ...record, id: Date.now() }]);
    }
    setShowPaymentModal(false); setEditingPayment(null);
  }
  function deletePayment(id) {
    setPayments(prev => prev.filter(p => p.id !== id));
  }
  function getMemberPayments(memberId, targetMonth) {
    return payments.filter(p => p.memberId === memberId && (!targetMonth || p.month === targetMonth));
  }

  // ── Expenses CRUD ──
  function openNewExpense() {
    setEditingExpense({ date: today(), amount: 0, category: "maestros", note: "" });
    setShowExpenseModal(true);
  }
  function openEditExpense(e) { setEditingExpense({...e}); setShowExpenseModal(true); }
  function saveExpense() {
    if (!editingExpense || !editingExpense.amount) return;
    const record = { ...editingExpense, month: editingExpense.date.slice(0,7) };
    if (editingExpense.id) {
      setExpenses(prev => prev.map(x => x.id === editingExpense.id ? record : x));
    } else {
      setExpenses(prev => [...prev, { ...record, id: Date.now() }]);
    }
    setShowExpenseModal(false); setEditingExpense(null);
  }
  function deleteExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  // ── Export helper ──
  function exportMembersCSV() {
    const rows = [["Nombre","Edad","Sexo","Fecha nacimiento","Fecha ingreso","Plan","Clases incluidas","Precio","Fecha de pago","Diagnóstico","Contacto emergencia","Parentesco","Teléfono emergencia","Clases inscritas (por semana)","Comentarios"]];
    members.filter(m=>m.active).forEach(m=>{
      const plan = PLANS.find(p=>p.id===m.plan);
      const memberSlots = (enrollments[m.id]||[]).map(sid => {
        const slot = schedule.find(s=>s.id===sid);
        if(!slot) return "";
        const day = DAYS.find(d=>d.id===slot.day)?.label;
        const ct = CLASS_TYPES.find(c=>c.id===slot.classType);
        return `${day} ${slot.startTime} ${ct?.label||""}`;
      }).filter(Boolean).join(" | ");
      rows.push([
        m.name||"", calcAge(m.birthDate)||"",
        m.gender==="F"?"Mujer":m.gender==="M"?"Hombre":"",
        m.birthDate||"", m.joinDate||"",
        plan?.label||"", plan?.classes||"", plan?.price||"",
        m.paymentDate||"", m.diagnosis||"",
        m.emergencyContact||"", m.emergencyRelation||"", m.emergencyPhone||"",
        memberSlots, (m.comments||"").replace(/\n/g," ")
      ]);
    });
    const csv = rows.map(r => r.map(c => {
      const s = String(c||"");
      return s.includes(",")||s.includes("\"")||s.includes("\n") ? `"${s.replace(/"/g,'""')}"` : s;
    }).join(",")).join("\n");
    const blob = new Blob(["\ufeff"+csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nuba_socios_${today()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ── Dashboard stats ──
  const totalClasses = records.filter(r => r.month === month && !r.kind).length;
  const totalMeals   = records.filter(r => r.month === month && r.kind === "meal").length;
  const activeMembers = members.filter(m => m.active).length;
  const agotadosCount = alerts.length;
  const classByType = CLASS_TYPES.filter(c=>!c.special).map(ct => ({
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
            <img src="/nuba-logo.png" alt="Nuba" style={{height:32,width:"auto"}}/>
            <div>
              <div className="header-title">Nuba</div>
              <div className="header-sub">Club para el Adulto Mayor</div>
            </div>
          </div>
          <div className="flex gap-8">
            <select value={month} onChange={e => setMonth(e.target.value)}
              style={{ background: "rgba(255,255,255,.08)", color: "white", border: "1.5px solid rgba(255,255,255,.2)", borderRadius: 20, padding: "5px 12px", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>
              {monthOptions.map(o => <option key={o.key} value={o.key} style={{ background: G.ink }}>{o.label}</option>)}
            </select>
          </div>
          <nav className="header-nav">
            <button className={`nav-btn ${view==="hoy"?"active":""}`} onClick={()=>setView("hoy")}>Hoy</button>
            <button className={`nav-btn ${view==="socios"?"active":""}`} onClick={()=>{setView("socios");setSelected(null);}}>Socios</button>
            <button className={`nav-btn ${view==="horario"?"active":""}`} onClick={()=>setView("horario")}>Horario</button>
            <button className={`nav-btn ${view==="asistencia"?"active":""}`} onClick={()=>setView("asistencia")}>Asistencia</button>
            <button className={`nav-btn ${view==="finanzas"?"active":""}`} onClick={()=>setView("finanzas")}>Finanzas</button>
            <button className={`nav-btn ${view==="recursos"?"active":""}`} onClick={()=>setView("recursos")}>Recursos</button>
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
                <div className="flex gap-6" style={{flexWrap:"wrap"}}>
                  <button className="btn btn-ghost btn-sm" onClick={exportMembersCSV}>📊 Exportar Excel</button>
                  <button className="btn btn-primary" onClick={()=>setShowAddMember(true)}>+ Nuevo socio</button>
                </div>
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
                    const s = getMemberStatus(m, records, month, PLANS);
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
                            {CLASS_TYPES.filter(c=>!c.special).map(ct=>{
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
                <div className="flex gap-6" style={{flexWrap:"wrap"}}>
                  <button className="btn btn-ghost btn-sm" onClick={()=>{setRenewTarget(selectedMember);setRenewPlan(selectedMember.plan);setShowRenew(true);}}>🔄 Renovar</button>
                  <button className="btn btn-ghost btn-sm" onClick={()=>{setEnrollingMember(selectedMember);setEnrollWeek(getWeekKey(today()));setShowEnrollModal(true);}}>📅 Inscripción</button>
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
                <AlertBanner type="red" msg={
                  selStatus.isExhausted
                    ? `Clases agotadas — usó ${selStatus.used} de ${selStatus.total}. Pendiente renovación.`
                    : `Ciclo vencido (terminó ${formatDate(selStatus.cycleEnd)}) — Pendiente renovación.`
                }/>
              )}
              {selStatus?.status === "por_agotar" && (
                <AlertBanner type="amber" msg={
                  selStatus.isExpiringSoon
                    ? `Ciclo vence en ${selStatus.daysToExpire} día${selStatus.daysToExpire!==1?"s":""} (${formatDate(selStatus.cycleEnd)}). Quedan ${selStatus.remaining} clases.`
                    : `Quedan ${selStatus.remaining} clase${selStatus.remaining!==1?"s":""} de ${selStatus.total} (${selStatus.used} usadas)`
                }/>
              )}
              {selStatus?.status === "ok" && selStatus.total < 999 && (
                <AlertBanner type="green" msg={`${selStatus.remaining} clases disponibles este mes`}/>
              )}

              {/* Counter + progress */}
              <div className="card">
                <div className="flex-between mb-12">
                  <div>
                    <div className="text-xs text-gray bold mb-4">CICLO ACTUAL</div>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:15}}>{selStatus?.plan?.label}</div>
                    <div className="text-xs text-gray" style={{marginTop:4}}>
                      {formatDate(selStatus?.cycleStart)} → {formatDate(selStatus?.cycleEnd)}
                    </div>
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
                  {CLASS_TYPES.filter(c=>!c.special).map(ct => {
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

              {/* Meal counter card — independiente del paquete de clases */}
              {(() => {
                const meals = getMemberMeals(selectedMember.id, records, month);
                const mealTotal = meals.length * MEAL_PRICE;
                return (
                  <div className="card">
                    <div className="flex-between mb-8">
                      <div>
                        <div className="text-xs text-gray bold mb-4">ALMUERZOS — {monthLabel(month).toUpperCase()}</div>
                        <div style={{fontFamily:"'Fraunces',serif",fontSize:15}}>Independiente del paquete de clases</div>
                      </div>
                      <div className="counter-ring" style={{borderColor:G.orange,color:G.orange}}>
                        <span className="counter-num">{meals.length}</span>
                        <span className="counter-sub">comidas</span>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:G.orangeLight,borderRadius:8}}>
                      <div>
                        <div style={{fontSize:12,color:G.orange,fontWeight:600}}>🍽️ ${MEAL_PRICE}/almuerzo</div>
                        <div style={{fontSize:10,color:G.gray,marginTop:2}}>No se reinicia al renovar paquete</div>
                      </div>
                      <span style={{fontSize:17,fontWeight:700,color:G.orange,fontFamily:"'Fraunces',serif"}}>${mealTotal.toLocaleString()}</span>
                    </div>
                    {meals.length > 0 && (
                      <>
                        <div className="divider"/>
                        {(() => {
                          const paidCount = meals.filter(r => mealPayments[r.id]).length;
                          const pendingCount = meals.length - paidCount;
                          return (
                            <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                              <span className="badge" style={{background:G.greenLight,color:G.green}}>✓ {paidCount} pagado{paidCount!==1?"s":""} · ${(paidCount*MEAL_PRICE).toLocaleString()}</span>
                              <span className="badge" style={{background:G.redLight,color:G.red}}>⏳ {pendingCount} pendiente{pendingCount!==1?"s":""} · ${(pendingCount*MEAL_PRICE).toLocaleString()}</span>
                            </div>
                          );
                        })()}
                        {[...meals].reverse().map(r => {
                          const paid = mealPayments[r.id];
                          return (
                            <div className="log-item" key={r.id}>
                              <div className="log-icon" style={{background:G.orangeLight,color:G.orange}}>🍽️</div>
                              <div className="log-info">
                                <div className="log-type">Almuerzo</div>
                                <div className="log-date">{formatDate(r.date)}{r.note ? ` · ${r.note}` : ""}</div>
                              </div>
                              <span style={{fontSize:13,fontWeight:700,color:G.orange,marginRight:8}}>${MEAL_PRICE}</span>
                              <button
                                onClick={()=>setMealPayments(prev=>({...prev, [r.id]: !paid}))}
                                style={{padding:"4px 10px",borderRadius:20,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:700,
                                  background: paid ? G.greenLight : G.redLight,
                                  color: paid ? G.green : G.red}}>
                                {paid ? "✓ Pagado" : "⏳ Pendiente"}
                              </button>
                              <button className="btn btn-xs btn-danger" onClick={()=>removeRecord(r.id)} style={{marginLeft:6}}>✕</button>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                );
              })()}

              {/* Financial summary card */}
              {(() => {
                const fin = getMemberFinancials(selectedMember, records, month, PLANS, MEAL_PRICE);
                return (
                  <div className="card">
                    <div className="flex-between mb-12">
                      <div>
                        <div className="text-xs text-gray bold mb-4">RESUMEN FINANCIERO</div>
                        <div style={{fontFamily:"'Fraunces',serif",fontSize:15}}>Gastos del socio</div>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={()=>openNewPayment(selectedMember.id)}>+ Pago</button>
                    </div>

                    {/* Mes actual */}
                    <div style={{background:G.tealPale,borderRadius:10,padding:"14px 16px",marginBottom:12}}>
                      <div className="flex-between mb-8">
                        <span style={{fontSize:12,fontWeight:700,color:G.teal,letterSpacing:.5}}>{monthLabel(month).toUpperCase()}</span>
                        <span style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,color:G.teal}}>${fin.monthTotal.toLocaleString()}</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:G.gray,borderTop:"1px solid rgba(26,122,110,.15)",paddingTop:8}}>
                        <span>📚 Paquete de clases</span><span style={{fontWeight:600}}>${fin.monthPlanCost.toLocaleString()}</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:G.gray,marginTop:4}}>
                        <span>🍽️ Almuerzos ({fin.monthMeals} × ${MEAL_PRICE})</span><span style={{fontWeight:600}}>${fin.monthMealCost.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Año actual */}
                    <div style={{background:G.orangeLight,borderRadius:10,padding:"14px 16px"}}>
                      <div className="flex-between mb-8">
                        <span style={{fontSize:12,fontWeight:700,color:G.orange,letterSpacing:.5}}>AÑO {month.split("-")[0]} — ACUMULADO</span>
                        <span style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,color:G.orange}}>${fin.yearTotal.toLocaleString()}</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:G.gray,borderTop:"1px solid rgba(211,84,0,.15)",paddingTop:8}}>
                        <span>📚 Paquetes de clases</span><span style={{fontWeight:600}}>${fin.yearPlanCost.toLocaleString()}</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:G.gray,marginTop:4}}>
                        <span>🍽️ Almuerzos ({fin.yearMeals} × ${MEAL_PRICE})</span><span style={{fontWeight:600}}>${fin.yearMealCost.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Historial de pagos */}
                    {(() => {
                      const memberPayments = getMemberPayments(selectedMember.id);
                      if (memberPayments.length === 0) return null;
                      return (
                        <>
                          <div className="divider"/>
                          <div className="text-xs text-gray bold mb-8">HISTORIAL DE PAGOS</div>
                          {[...memberPayments].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6).map(p => (
                            <div key={p.id} onClick={()=>openEditPayment(p)} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:"1px solid #f0f5f4",cursor:"pointer"}}>
                              <div style={{flex:1}}>
                                <div style={{fontSize:13,fontWeight:600}}>{p.concept}</div>
                                <div className="text-xs text-gray">{formatDate(p.date)} · {p.method}</div>
                              </div>
                              <span style={{fontWeight:700,color:G.teal,fontSize:13}}>${Number(p.amount).toLocaleString()}</span>
                            </div>
                          ))}
                          {memberPayments.length > 6 && <div className="text-xs text-gray" style={{marginTop:6,textAlign:"center"}}>y {memberPayments.length - 6} pagos más</div>}
                        </>
                      );
                    })()}
                  </div>
                );
              })()}

              {/* Class log */}
              <div className="card">
                <div className="flex-between mb-12">
                  <div>
                    <div className="card-title">Registro del ciclo</div>
                    <div className="text-xs text-gray">{formatDate(selStatus?.cycleStart)} → {formatDate(selStatus?.cycleEnd)}</div>
                  </div>
                  <span className="text-xs text-gray">{selStatus?.cycleClasses?.length||0} clases</span>
                </div>
                {selStatus?.cycleClasses?.length > 0 ? (
                  (() => {
                    // Group records by date
                    const byDate = {};
                    selStatus.cycleClasses.forEach(r => {
                      if (!byDate[r.date]) byDate[r.date] = [];
                      byDate[r.date].push(r);
                    });
                    const sortedDates = Object.keys(byDate).sort((a,b)=>b.localeCompare(a));
                    let cumulativeIndex = 0;
                    const allByIdx = {};
                    // Map by record id -> cumulative position in chronological order
                    const chronological = [...selStatus.cycleClasses].sort((a,b)=>a.date.localeCompare(b.date));
                    chronological.forEach((r, i) => { allByIdx[r.id] = i; });
                    return sortedDates.map(date => {
                      const dayRecs = byDate[date];
                      const anyExtra = dayRecs.some(r => selStatus.total < 999 && allByIdx[r.id] >= selStatus.total);
                      return (
                        <div key={date} style={{padding:"10px 0",borderBottom:"1px solid #f0f5f4"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                            <span style={{fontSize:13,fontWeight:700,color:G.teal}}>📅 {formatDate(date)}</span>
                            <span style={{fontSize:11,color:G.gray}}>({dayRecs.length} clase{dayRecs.length>1?"s":""})</span>
                            {anyExtra && <span className="badge" style={{background:G.redLight,color:G.red,fontSize:10}}>Extra</span>}
                          </div>
                          <div style={{display:"flex",gap:6,flexWrap:"wrap",paddingLeft:8}}>
                            {dayRecs.map(r => {
                              const ct = CLASS_TYPES.find(c=>c.id===r.type);
                              return (
                                <div key={r.id} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,background:ct?.bg,color:ct?.color,fontSize:12,fontWeight:600}}>
                                  {ct?.icon} {ct?.label}
                                  <button onClick={()=>removeRecord(r.id)} style={{marginLeft:4,background:"transparent",border:"none",cursor:"pointer",color:ct?.color,opacity:.6,fontSize:12,padding:0,lineHeight:1}}>✕</button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    });
                  })()
                ) : null}
                {!selStatus?.cycleClasses?.length && (
                  <div className="empty" style={{padding:"24px 0"}}>
                    <div className="empty-icon">📋</div>
                    <div className="empty-text">Sin clases en este ciclo</div>
                  </div>
                )}
                {/* HIDDEN placeholder to skip original mapping */}
                {false && (
                  <div className="log-item" key="hidden">
                    <div className="log-icon">x</div>
                    <div className="log-info">
                      <div className="log-type">x</div>
                      <div className="log-date">x</div>
                    </div>
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

                  {/* Clases inscritas */}
                  {(() => {
                    const memberSlots = (enrollments[selectedMember.id]||[])
                      .map(sid => schedule.find(s=>s.id===sid))
                      .filter(Boolean)
                      .sort((a,b)=>{
                        const dayOrder = {lun:1,mar:2,mie:3,jue:4,vie:5};
                        return (dayOrder[a.day]-dayOrder[b.day]) || a.startTime.localeCompare(b.startTime);
                      });
                    const plan = PLANS.find(p=>p.id===selectedMember.plan);
                    const perWeek = memberSlots.length;
                    const perMonth = perWeek * 4;
                    const planClasses = plan?.classes || 0;
                    const diff = planClasses - perMonth;
                    return (
                      <div style={{marginBottom:16}}>
                        <div className="flex-between mb-8">
                          <div className="text-xs text-gray bold">CLASES INSCRITAS</div>
                          <button className="btn btn-ghost btn-xs" onClick={()=>{setEnrollingMember(selectedMember);setEnrollWeek(null);setShowEnrollModal(true);}}>✏️ Editar</button>
                        </div>
                        {memberSlots.length === 0 ? (
                          <div className="text-xs text-gray" style={{fontStyle:"italic"}}>Sin clases inscritas</div>
                        ) : (
                          <>
                            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                              {memberSlots.map(s=>{
                                const ct = CLASS_TYPES.find(c=>c.id===s.classType);
                                const day = DAYS.find(d=>d.id===s.day);
                                return (
                                  <span key={s.id} style={{background:ct?.bg,color:ct?.color,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>
                                    {day?.label.slice(0,3)} {s.startTime} · {ct?.label}
                                  </span>
                                );
                              })}
                            </div>
                            <div style={{padding:"8px 12px",background: diff>=0?G.greenLight:G.amberLight,borderRadius:8,fontSize:11,color:diff>=0?G.green:G.amber,fontWeight:600}}>
                              {perWeek} clases/semana · ~{perMonth}/mes · Paquete: {planClasses}/mes
                              {diff === 0 && " · ✓ Encaja perfecto"}
                              {diff > 0 && ` · Sobran ${diff} del paquete`}
                              {diff < 0 && ` · Excede por ${Math.abs(diff)} clases`}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })()}

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
                        const s = getMemberStatus(m, records, month, PLANS);
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
                          const s = getMemberStatus(m, records, month, PLANS);
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
                <div className="stat-card" style={{cursor:"pointer"}} onClick={()=>setResumenDetail("activos")}>
                  <div className="stat-num" style={{color:G.teal}}>{activeMembers}</div>
                  <div className="stat-label">Socios activos ↗</div>
                </div>
                <div className="stat-card" style={{cursor:"pointer"}} onClick={()=>setResumenDetail("clases")}>
                  <div className="stat-num" style={{color:G.blue}}>{totalClasses}</div>
                  <div className="stat-label">Clases este mes ↗</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{color:G.red}}>{agotadosCount}</div>
                  <div className="stat-label">Con clases agotadas</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{color:G.amber}}>{warnings.length}</div>
                  <div className="stat-label">Por agotar</div>
                </div>
                <div className="stat-card" style={{cursor:"pointer"}} onClick={()=>setResumenDetail("almuerzos")}>
                  <div className="stat-num" style={{color:G.orange}}>{totalMeals}</div>
                  <div className="stat-label">Almuerzos del mes ↗</div>
                </div>
                <div className="stat-card" style={{cursor:"pointer"}} onClick={()=>setResumenDetail("comedor")}>
                  <div className="stat-num" style={{color:G.orange}}>${(totalMeals*MEAL_PRICE).toLocaleString()}</div>
                  <div className="stat-label">Ingresos comedor ↗</div>
                </div>
                {(() => {
                  const monthRevenue = members.filter(m=>m.active).reduce((sum, m) => {
                    const fin = getMemberFinancials(m, records, month, PLANS, MEAL_PRICE);
                    return sum + fin.monthTotal;
                  }, 0);
                  return (
                    <div className="stat-card" style={{background:G.tealPale}}>
                      <div className="stat-num" style={{color:G.teal}}>${monthRevenue.toLocaleString()}</div>
                      <div className="stat-label">Ingreso total del mes</div>
                    </div>
                  );
                })()}
                {(() => {
                  const yearRevenue = members.filter(m=>m.active).reduce((sum, m) => {
                    const fin = getMemberFinancials(m, records, month, PLANS, MEAL_PRICE);
                    return sum + fin.yearTotal;
                  }, 0);
                  return (
                    <div className="stat-card" style={{background:G.orangeLight}}>
                      <div className="stat-num" style={{color:G.orange}}>${yearRevenue.toLocaleString()}</div>
                      <div className="stat-label">Ingreso acumulado {month.split("-")[0]}</div>
                    </div>
                  );
                })()}
              </div>

              {/* Drill-down panel */}
              {resumenDetail && (
                <div className="card mb-16" style={{background:G.tealPale,borderLeft:`4px solid ${G.teal}`}}>
                  <div className="flex-between mb-12">
                    <div className="card-title">
                      {resumenDetail === "activos" && "Socios activos — Desglose"}
                      {resumenDetail === "clases" && "Clases del mes — Desglose"}
                      {resumenDetail === "almuerzos" && "Almuerzos del mes — Desglose"}
                      {resumenDetail === "comedor" && "Ingresos comedor — Desglose"}
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={()=>setResumenDetail(null)}>✕ Cerrar</button>
                  </div>
                  {resumenDetail === "activos" && (
                    <table className="charges-table">
                      <thead><tr><th>Socio</th><th>Edad</th><th>Plan</th><th>Desde</th><th>Sexo</th></tr></thead>
                      <tbody>
                        {members.filter(m=>m.active).map(m=>{
                          const plan = PLANS.find(p=>p.id===m.plan);
                          return (
                            <tr key={m.id}><td>{m.name}</td><td>{calcAge(m.birthDate)||"—"}</td><td>{plan?.label}</td><td>{formatDate(m.joinDate)}</td><td>{m.gender==="F"?"Mujer":m.gender==="M"?"Hombre":"—"}</td></tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                  {resumenDetail === "clases" && (
                    <table className="charges-table">
                      <thead><tr><th>Fecha</th><th>Socio</th><th>Clase</th></tr></thead>
                      <tbody>
                        {records.filter(r=>r.month===month && r.kind!=="meal").sort((a,b)=>b.date.localeCompare(a.date)).map(r=>{
                          const m = members.find(x=>x.id===r.memberId);
                          const ct = CLASS_TYPES.find(c=>c.id===r.type);
                          return (<tr key={r.id}><td>{formatDate(r.date)}</td><td>{m?.name||"—"}</td><td>{ct?.icon} {ct?.label}</td></tr>);
                        })}
                      </tbody>
                    </table>
                  )}
                  {(resumenDetail === "almuerzos" || resumenDetail === "comedor") && (
                    <table className="charges-table">
                      <thead><tr><th>Fecha</th><th>Socio</th><th>Estado</th><th style={{textAlign:"right"}}>Monto</th></tr></thead>
                      <tbody>
                        {records.filter(r=>r.month===month && r.kind==="meal").sort((a,b)=>b.date.localeCompare(a.date)).map(r=>{
                          const m = members.find(x=>x.id===r.memberId);
                          const paid = mealPayments[r.id];
                          return (<tr key={r.id}><td>{formatDate(r.date)}</td><td>{m?.name||"—"}</td><td>{paid?<span className="badge" style={{background:G.greenLight,color:G.green}}>✓ Pagado</span>:<span className="badge" style={{background:G.redLight,color:G.red}}>⏳ Pendiente</span>}</td><td style={{textAlign:"right"}}>${MEAL_PRICE}</td></tr>);
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* By type */}
              <div className="card mb-16">
                <div className="card-title">Clases por tipo</div>
                <div className="card-sub">{monthLabel(month)}</div>
                {CLASS_TYPES.filter(c=>!c.special).map(ct => {
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
                    <tr><th>Socio</th><th>Plan</th><th>Usadas</th><th>Mes ($)</th><th>Año ($)</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map(m => {
                      const s = getMemberStatus(m, records, month, PLANS);
                      const statusMap = { agotado:[G.redLight,G.red,"Agotadas"], por_agotar:[G.amberLight,G.amber,"Por agotar"], ok:[G.greenLight,G.green,"Activo"] };
                      const [sbg,scol,slabel] = statusMap[s.status];
                      const fin = getMemberFinancials(m, records, month, PLANS, MEAL_PRICE);
                      return (
                        <tr key={m.id} style={{cursor:"pointer"}} onClick={()=>{setSelected(m.id);setView("socios");}}>
                          <td><span className="bold" style={{fontSize:13}}>{m.name}</span></td>
                          <td><span className="text-xs text-gray">{s.plan?.label}</span></td>
                          <td><span className="bold">{s.used}</span></td>
                          <td><span style={{fontWeight:700,color:G.teal}}>${fin.monthTotal.toLocaleString()}</span></td>
                          <td><span style={{fontWeight:700,color:G.orange}}>${fin.yearTotal.toLocaleString()}</span></td>
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

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: HORARIO
          ══════════════════════════════════════════════════════════════════ */}
          {view === "horario" && (
            <div>
              <div className="flex-between mb-20">
                <div>
                  <h1 style={{fontFamily:"'Fraunces',serif",fontSize:22,marginBottom:2}}>Horario semanal</h1>
                  <div className="text-xs text-gray">{schedule.length} clases programadas · Lunes a Viernes</div>
                </div>
                <div className="flex gap-6" style={{flexWrap:"wrap"}}>
                  <button className="btn btn-ghost btn-sm" onClick={()=>window.print()}>🖨️ Imprimir</button>
                  <button className="btn btn-ghost btn-sm" onClick={()=>{if(window.confirm("Esto reemplazará el horario actual con el predeterminado. ¿Continuar?")){setSchedule(INITIAL_SCHEDULE);}}}>🔄 Cargar predeterminado</button>
                  <button className="btn btn-primary" onClick={()=>openNewSlot()}>+ Nueva clase</button>
                </div>
              </div>

              <div className="card" style={{padding:0,overflow:"auto"}}>
                <table className="charges-table" style={{minWidth:900}}>
                  <thead>
                    <tr>
                      <th style={{width:80}}>Hora</th>
                      {DAYS.map(d => <th key={d.id} style={{textAlign:"center"}}>{d.label}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // Generate fixed time slots from 09:00 to 18:00 every 30 minutes
                      const fixedSlots = [];
                      for (let h = 9; h <= 18; h++) {
                        for (let m of [0, 30]) {
                          if (h === 18 && m > 0) break;
                          fixedSlots.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
                        }
                      }
                      // Also include any custom times from schedule not in fixed grid
                      const extraTimes = [...new Set(schedule.map(s => s.startTime))].filter(t => !fixedSlots.includes(t));
                      const allTimes = [...fixedSlots, ...extraTimes].sort();

                      return allTimes.map(time => (
                        <tr key={time}>
                          <td style={{fontWeight:700,color:G.teal,fontSize:13,whiteSpace:"nowrap"}}>{time}</td>
                          {DAYS.map(d => {
                            const slot = schedule.find(s => s.day === d.id && s.startTime === time);
                            if (!slot) {
                              return (
                                <td key={d.id}
                                  style={{background:G.grayLight,textAlign:"center",cursor:"pointer",padding:8}}
                                  onClick={()=>{setEditingSlot({day:d.id, startTime:time, endTime:"", classType:"taichi", roomId:rooms[0]?.id, teacherId:teachers[0]?.id||null, active:true}); setShowScheduleModal(true);}}>
                                  <span className="text-xs text-gray" style={{opacity:.5}}>+ Agregar</span>
                                </td>
                              );
                            }
                            const ct = CLASS_TYPES.find(c => c.id === slot.classType);
                            const room = rooms.find(r => r.id === slot.roomId);
                            const teacher = teachers.find(t => t.id === slot.teacherId);
                            const isSpecial = ct?.special;
                            if (isSpecial) {
                              return (
                                <td key={d.id} style={{cursor:"pointer",padding:8}} onClick={()=>openEditSlot(slot)}>
                                  <div style={{background:ct.bg,borderRadius:8,padding:"12px 10px",textAlign:"center"}}>
                                    <div style={{fontWeight:700,fontSize:13,color:ct.color}}>{ct.icon} {ct.label}</div>
                                  </div>
                                </td>
                              );
                            }
                            const enrolledMembers = getSlotEnrollees(slot.id);
                            return (
                              <td key={d.id} style={{cursor:"pointer",padding:8}} onClick={()=>openEditSlot(slot)}>
                                <div style={{background:ct?.bg||G.grayLight,borderRadius:8,padding:"8px 10px",borderLeft:`3px solid ${ct?.color||G.gray}`}}>
                                  <div style={{fontWeight:700,fontSize:12,color:ct?.color}}>{ct?.icon} {ct?.label||slot.classType}</div>
                                  <div style={{fontSize:10,color:G.gray,marginTop:2}}>{slot.startTime}–{slot.endTime}</div>
                                  <div style={{fontSize:10,color:G.gray,fontWeight:600}}>{room?.icon} {room?.label||"—"}</div>
                                  {teacher && <div style={{fontSize:10,fontWeight:600,color:G.ink,marginTop:2}}>{teacher.name}</div>}
                                  {enrolledMembers.length > 0 && (
                                    <div style={{marginTop:4,paddingTop:4,borderTop:"1px solid rgba(0,0,0,.08)"}}>
                                      <div style={{fontSize:9,color:G.gray,marginBottom:2}}>{enrolledMembers.length} inscrito{enrolledMembers.length>1?"s":""}:</div>
                                      {enrolledMembers.slice(0,4).map(m=>(
                                        <div key={m.id} style={{fontSize:9,color:G.ink,lineHeight:1.3}}>• {m.name.split(" ").slice(0,2).join(" ")}</div>
                                      ))}
                                      {enrolledMembers.length > 4 && <div style={{fontSize:9,color:G.gray}}>+ {enrolledMembers.length-4} más</div>}
                                    </div>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: ASISTENCIA
          ══════════════════════════════════════════════════════════════════ */}
          {view === "asistencia" && !attendanceSlot && (
            <div>
              <div className="flex-between mb-20">
                <div>
                  <h1 style={{fontFamily:"'Fraunces',serif",fontSize:22,marginBottom:2}}>Asistencia</h1>
                  <div className="text-xs text-gray">Selecciona una clase del día para marcar asistencia</div>
                </div>
                <input type="date" value={attendanceDate} onChange={e=>setAttendanceDate(e.target.value)} style={{width:160}}/>
              </div>

              {/* ── MÉTRICAS DE ASISTENCIA ── */}
              {(() => {
                // Compute week range (lun-vie containing attendanceDate)
                const refDate = new Date(attendanceDate + "T12:00:00");
                const dow = refDate.getDay();
                const monday = new Date(refDate);
                monday.setDate(refDate.getDate() - ((dow+6) % 7));
                const friday = new Date(monday);
                friday.setDate(monday.getDate() + 4);
                const fmt = d => d.toISOString().split("T")[0];
                const weekStart = fmt(monday);
                const weekEnd = fmt(friday);
                const monthKey = attendanceDate.slice(0,7);

                // Count attendances
                let weekAttendances = 0;
                let monthAttendances = 0;
                const classCounts = {}; // slotId -> count across the month
                Object.keys(attendances).forEach(key => {
                  const [slotIdStr, dateStr] = key.split("_");
                  const slotId = Number(slotIdStr);
                  const arr = attendances[key] || [];
                  if (dateStr >= weekStart && dateStr <= weekEnd) weekAttendances += arr.length;
                  if (dateStr.slice(0,7) === monthKey) {
                    monthAttendances += arr.length;
                    classCounts[slotId] = (classCounts[slotId]||0) + arr.length;
                  }
                });

                // Top 3 classes this month
                const top3 = Object.entries(classCounts)
                  .sort((a,b) => b[1]-a[1])
                  .slice(0,3)
                  .map(([slotId, count]) => {
                    const slot = schedule.find(s => s.id === Number(slotId));
                    const ct = slot ? CLASS_TYPES.find(c => c.id === slot.classType) : null;
                    const day = slot ? DAYS.find(d => d.id === slot.day) : null;
                    return { slot, ct, day, count };
                  });

                // Demographics of active members
                const active = members.filter(m => m.active);
                const women = active.filter(m => m.gender === "F").length;
                const men   = active.filter(m => m.gender === "M").length;
                const ages  = active.map(m => calcAge(m.birthDate)).filter(a => a != null);
                const avgAge = ages.length ? Math.round(ages.reduce((a,b)=>a+b,0) / ages.length) : 0;

                return (
                  <>
                    <div className="stat-grid">
                      <div className="stat-card">
                        <div className="stat-num" style={{color:G.teal}}>{weekAttendances}</div>
                        <div className="stat-label">Asistencias de la semana</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-num" style={{color:G.blue}}>{monthAttendances}</div>
                        <div className="stat-label">Asistencias del mes</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-num" style={{color:G.purple}}>{avgAge||"—"}</div>
                        <div className="stat-label">Edad promedio (años)</div>
                      </div>
                      <div className="stat-card">
                        <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                          <span style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:700,color:"#C25B7A"}}>{women}♀</span>
                          <span style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:700,color:G.blue}}>{men}♂</span>
                        </div>
                        <div className="stat-label">Mujeres · Hombres</div>
                      </div>
                    </div>

                    {top3.length > 0 && top3[0].count > 0 && (
                      <div className="card mb-16">
                        <div className="card-title">🏆 Top 3 clases del mes</div>
                        <div className="card-sub">Las clases con más asistencias en {monthLabel(monthKey)}</div>
                        {top3.map((item, i) => {
                          if (!item.slot) return null;
                          const medals = ["🥇","🥈","🥉"];
                          const room = rooms.find(r => r.id === item.slot.roomId);
                          return (
                            <div key={item.slot.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderBottom:i<2?"1px solid #f0f5f4":"none"}}>
                              <div style={{fontSize:22}}>{medals[i]}</div>
                              <div style={{flex:1}}>
                                <div style={{fontSize:14,fontWeight:700,color:item.ct?.color}}>{item.ct?.icon} {item.ct?.label}</div>
                                <div className="text-xs text-gray">{item.day?.label} · {item.slot.startTime}–{item.slot.endTime} · {room?.label}</div>
                              </div>
                              <div style={{textAlign:"right"}}>
                                <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:G.teal}}>{item.count}</div>
                                <div className="text-xs text-gray">asistencias</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}

              {(() => {
                const dayOfWeek = new Date(attendanceDate + "T12:00:00").getDay();
                const dayMap = { 1:"lun", 2:"mar", 3:"mie", 4:"jue", 5:"vie" };
                const dayId = dayMap[dayOfWeek];
                if (!dayId) {
                  return <div className="card"><div className="empty"><div className="empty-icon">📅</div><div className="empty-text">Fin de semana</div><div className="empty-sub">Nuba opera de lunes a viernes</div></div></div>;
                }
                const daySchedule = schedule.filter(s => s.day === dayId && s.active).sort((a,b) => a.startTime.localeCompare(b.startTime));
                if (daySchedule.length === 0) {
                  return <div className="card"><div className="empty"><div className="empty-icon">📋</div><div className="empty-text">Sin clases programadas</div></div></div>;
                }
                return (
                  <div className="member-grid">
                    {daySchedule.map(slot => {
                      const ct = CLASS_TYPES.find(c => c.id === slot.classType);
                      const room = rooms.find(r => r.id === slot.roomId);
                      const teacher = teachers.find(t => t.id === slot.teacherId);
                      const enrolled = getWeekEnrollees(slot.id, getWeekKey(attendanceDate));
                      const present = getAttendees(slot.id, attendanceDate).length;
                      const capacity = room?.capacity || 0;
                      const capPct = capacity > 0 ? (enrolled.length / capacity) * 100 : 0;
                      const capColor = capPct >= 100 ? G.red : capPct >= 80 ? G.amber : G.teal;
                      return (
                        <div key={slot.id} className="member-card" onClick={()=>setAttendanceSlot(slot)}>
                          <div style={{background:ct?.bg||G.grayLight,borderLeft:`4px solid ${ct?.color||G.gray}`,borderRadius:8,padding:"10px 12px",marginBottom:10}}>
                            <div style={{fontWeight:700,fontSize:14,color:ct?.color}}>{ct?.icon} {ct?.label}</div>
                            <div style={{fontSize:11,color:G.gray,marginTop:2}}>{slot.startTime}–{slot.endTime} · {room?.label}</div>
                            {teacher && <div style={{fontSize:11,color:G.gray}}>{teacher.name}</div>}
                          </div>
                          <div className="flex-between mb-4">
                            <span className="text-xs text-gray bold">INSCRITOS</span>
                            <span style={{fontSize:13,fontWeight:700,color:capColor}}>{enrolled.length}{capacity>0?` / ${capacity}`:""}</span>
                          </div>
                          {capacity > 0 && (
                            <div className="progress-bg"><div className="progress-fill" style={{width:`${Math.min(capPct,100)}%`,background:capColor}}/></div>
                          )}
                          <div className="flex-between" style={{marginTop:10,paddingTop:10,borderTop:"1px solid #f0f5f4"}}>
                            <span className="text-xs text-gray">PRESENTES HOY</span>
                            <span style={{fontSize:16,fontWeight:700,color:G.green}}>{present}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Detalle de asistencia de una clase */}
          {view === "asistencia" && attendanceSlot && (() => {
            const ct = CLASS_TYPES.find(c => c.id === attendanceSlot.classType);
            const room = rooms.find(r => r.id === attendanceSlot.roomId);
            const teacher = teachers.find(t => t.id === attendanceSlot.teacherId);
            const enrolled = getWeekEnrollees(attendanceSlot.id, getWeekKey(attendanceDate));
            const presentIds = getAttendees(attendanceSlot.id, attendanceDate);
            return (
              <div>
                <div className="flex gap-8 mb-20" style={{alignItems:"flex-start"}}>
                  <button className="btn btn-ghost btn-sm" onClick={()=>setAttendanceSlot(null)}>← Clases</button>
                  <div style={{flex:1}}>
                    <h2 style={{fontFamily:"'Fraunces',serif",fontSize:20,marginBottom:2}}>{ct?.icon} {ct?.label}</h2>
                    <div className="text-xs text-gray">{DAYS.find(d=>d.id===attendanceSlot.day)?.label} · {attendanceSlot.startTime}–{attendanceSlot.endTime} · {room?.label}{teacher?` · ${teacher.name}`:""}</div>
                  </div>
                </div>

                <div className="card mb-16">
                  <div className="flex-between">
                    <div>
                      <div className="text-xs text-gray bold mb-4">FECHA</div>
                      <div style={{fontFamily:"'Fraunces',serif",fontSize:17}}>{formatDate(attendanceDate)}</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Fraunces',serif",fontSize:30,fontWeight:700,color:G.green,lineHeight:1}}>{presentIds.length}</div>
                      <div className="text-xs text-gray">de {enrolled.length} inscritos</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-title">Lista de inscritos</div>
                  <div className="card-sub">Toca a cada socio para marcar o desmarcar asistencia</div>
                  {enrolled.length === 0 ? (
                    <div className="empty" style={{padding:"24px 0"}}>
                      <div className="empty-icon">👤</div>
                      <div className="empty-text">Sin socios inscritos a esta clase</div>
                      <div className="empty-sub">Inscribe socios desde su perfil individual</div>
                    </div>
                  ) : (
                    enrolled.map(m => {
                      const present = presentIds.includes(m.id);
                      return (
                        <div key={m.id}
                          onClick={()=>toggleAttendance(attendanceSlot.id, attendanceDate, m.id)}
                          style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",marginBottom:8,borderRadius:10,cursor:"pointer",
                            background: present ? G.greenLight : "white",
                            border: `2px solid ${present ? G.green : "#e0e8e7"}`,
                            transition:"all .15s"}}>
                          <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                            background: present ? G.green : "white",
                            border: `2px solid ${present ? G.green : "#ccc"}`,
                            color:"white",fontWeight:700,fontSize:14}}>{present ? "✓" : ""}</div>
                          <div style={{flex:1}}>
                            <div style={{fontWeight:600,fontSize:14,color: present ? G.green : G.ink}}>{m.name}</div>
                            <div className="text-xs text-gray">{calcAge(m.birthDate) ? `${calcAge(m.birthDate)} años` : ""}</div>
                          </div>
                          {present && <span style={{fontSize:11,fontWeight:700,color:G.green,letterSpacing:.5}}>PRESENTE</span>}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })()}

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: HOY
          ══════════════════════════════════════════════════════════════════ */}
          {view === "hoy" && (() => {
            const todayDate = today();
            const dayOfWeek = new Date(todayDate + "T12:00:00").getDay();
            const dayMap = { 1:"lun", 2:"mar", 3:"mie", 4:"jue", 5:"vie" };
            const dayId = dayMap[dayOfWeek];
            const todaySchedule = dayId ? schedule.filter(s => s.day === dayId && s.active).sort((a,b)=>a.startTime.localeCompare(b.startTime)) : [];
            const todayMeals = records.filter(r => r.kind === "meal" && r.date === todayDate).length;
            const todayPayments = payments.filter(p => p.date === todayDate);
            const todayIncome = todayPayments.reduce((s,p)=>s+(Number(p.amount)||0), 0) + (todayMeals * MEAL_PRICE);

            // Count inscribed and present per class today
            const classesToday = todaySchedule.map(slot => ({
              slot,
              ct: CLASS_TYPES.find(c=>c.id===slot.classType),
              room: rooms.find(r=>r.id===slot.roomId),
              teacher: teachers.find(t=>t.id===slot.teacherId),
              enrolled: getSlotEnrollees(slot.id).length,
              present: getAttendees(slot.id, todayDate).length,
            }));

            return (
              <div>
                <div className="mb-20">
                  <h1 style={{fontFamily:"'Fraunces',serif",fontSize:24,marginBottom:2}}>Hoy en Nuba</h1>
                  <div className="text-sm text-gray">{new Date(todayDate+"T12:00:00").toLocaleDateString("es-MX",{weekday:"long",day:"2-digit",month:"long",year:"numeric"})}</div>
                </div>

                <div className="stat-grid">
                  <div className="stat-card">
                    <div className="stat-num" style={{color:G.teal}}>{todaySchedule.length}</div>
                    <div className="stat-label">Clases hoy</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num" style={{color:G.green}}>{classesToday.reduce((s,c)=>s+c.present,0)}</div>
                    <div className="stat-label">Asistencias marcadas</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num" style={{color:G.orange}}>{todayMeals}</div>
                    <div className="stat-label">Almuerzos hoy</div>
                  </div>
                  <div className="stat-card" style={{background:G.tealPale}}>
                    <div className="stat-num" style={{color:G.teal}}>${todayIncome.toLocaleString()}</div>
                    <div className="stat-label">Ingreso del día</div>
                  </div>
                </div>

                {!dayId ? (
                  <div className="card"><div className="empty"><div className="empty-icon">🌴</div><div className="empty-text">Fin de semana</div><div className="empty-sub">Nuba opera de lunes a viernes</div></div></div>
                ) : (
                  <>
                    <div className="card mb-16">
                      <div className="flex-between mb-12">
                        <div className="card-title">Clases del día</div>
                        <button className="btn btn-ghost btn-sm" onClick={()=>setView("asistencia")}>Marcar asistencia →</button>
                      </div>
                      {classesToday.length === 0 ? <div className="empty" style={{padding:"20px 0"}}><div className="empty-text">Sin clases programadas</div></div> :
                        classesToday.map(({slot, ct, room, teacher, enrolled, present}) => {
                          const capacity = room?.capacity || 0;
                          return (
                            <div key={slot.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderBottom:"1px solid #f0f5f4"}}>
                              <div style={{minWidth:60,fontWeight:700,color:G.teal,fontSize:13}}>{slot.startTime}</div>
                              <div style={{flex:1}}>
                                <div style={{fontSize:13,fontWeight:600,color:ct?.color}}>{ct?.icon} {ct?.label}</div>
                                <div className="text-xs text-gray">{room?.label}{teacher?` · ${teacher.name}`:""}</div>
                              </div>
                              <div style={{textAlign:"right"}}>
                                <div style={{fontSize:12}}>
                                  <span style={{color:G.green,fontWeight:700}}>{present}</span>
                                  <span style={{color:G.gray}}> de </span>
                                  <span style={{color:G.ink,fontWeight:600}}>{enrolled}</span>
                                  {capacity>0 && <span style={{color:G.gray,fontSize:11}}> / {capacity}</span>}
                                </div>
                                <div className="text-xs text-gray">presentes · inscritos</div>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    <div className="card">
                      <div className="flex-between mb-12">
                        <div className="card-title">Pagos de hoy</div>
                        <button className="btn btn-primary btn-sm" onClick={()=>openNewPayment()}>+ Registrar pago</button>
                      </div>
                      {todayPayments.length === 0 ? <div className="empty" style={{padding:"20px 0"}}><div className="empty-text">Sin pagos registrados hoy</div></div> :
                        todayPayments.map(p => {
                          const member = members.find(m => m.id === p.memberId);
                          return (
                            <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderBottom:"1px solid #f0f5f4"}} onClick={()=>openEditPayment(p)}>
                              <div style={{flex:1}}>
                                <div style={{fontSize:13,fontWeight:600}}>{member?.name || "—"}</div>
                                <div className="text-xs text-gray">{p.concept} · {p.method}</div>
                              </div>
                              <div style={{fontSize:14,fontWeight:700,color:G.teal}}>${Number(p.amount).toLocaleString()}</div>
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </div>
            );
          })()}

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: FINANZAS
          ══════════════════════════════════════════════════════════════════ */}
          {view === "finanzas" && (() => {
            const monthPayments = payments.filter(p => p.month === month);
            const monthExpenses = expenses.filter(e => e.month === month);
            const monthMealsCount = records.filter(r => r.kind === "meal" && r.month === month).length;
            const monthMealIncome = monthMealsCount * MEAL_PRICE;
            const monthPaymentIncome = monthPayments.reduce((s,p) => s + (Number(p.amount)||0), 0);
            const monthTotalIncome = monthPaymentIncome + monthMealIncome;
            const monthTotalExpenses = monthExpenses.reduce((s,e) => s + (Number(e.amount)||0), 0);
            const monthProfit = monthTotalIncome - monthTotalExpenses;

            // Pending: members who haven't paid this month
            const paidMemberIds = new Set(monthPayments.map(p => p.memberId));
            const pendingMembers = members.filter(m => m.active && !paidMemberIds.has(m.id));

            return (
              <div>
                <h1 style={{fontFamily:"'Fraunces',serif",fontSize:22,marginBottom:4}}>Finanzas</h1>
                <div className="text-xs text-gray mb-20">{monthLabel(month)}</div>

                <div className="stat-grid">
                  <div className="stat-card" style={{background:G.greenLight}}>
                    <div className="stat-num" style={{color:G.green}}>${monthTotalIncome.toLocaleString()}</div>
                    <div className="stat-label">Ingresos del mes</div>
                  </div>
                  <div className="stat-card" style={{background:G.redLight}}>
                    <div className="stat-num" style={{color:G.red}}>${monthTotalExpenses.toLocaleString()}</div>
                    <div className="stat-label">Egresos del mes</div>
                  </div>
                  <div className="stat-card" style={{background: monthProfit>=0?G.tealPale:G.redLight}}>
                    <div className="stat-num" style={{color: monthProfit>=0?G.teal:G.red}}>${monthProfit.toLocaleString()}</div>
                    <div className="stat-label">Utilidad del mes</div>
                  </div>
                  <div className="stat-card" style={{background:G.amberLight}}>
                    <div className="stat-num" style={{color:G.amber}}>{pendingMembers.length}</div>
                    <div className="stat-label">Socios sin pago</div>
                  </div>
                </div>

                {/* Pagos del mes */}
                <div className="card mb-16">
                  <div className="flex-between mb-12">
                    <div>
                      <div className="card-title">Pagos recibidos</div>
                      <div className="text-xs text-gray">{monthPayments.length} pagos · ${monthPaymentIncome.toLocaleString()} (sin comidas)</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={()=>openNewPayment()}>+ Registrar pago</button>
                  </div>
                  {monthPayments.length === 0 ? <div className="empty" style={{padding:"20px 0"}}><div className="empty-text">Sin pagos registrados este mes</div></div> :
                    <table className="charges-table">
                      <thead><tr><th>Fecha</th><th>Socio</th><th>Concepto</th><th>Método</th><th style={{textAlign:"right"}}>Monto</th></tr></thead>
                      <tbody>
                        {[...monthPayments].sort((a,b)=>b.date.localeCompare(a.date)).map(p => {
                          const member = members.find(m => m.id === p.memberId);
                          return (
                            <tr key={p.id} style={{cursor:"pointer"}} onClick={()=>openEditPayment(p)}>
                              <td><span className="text-xs">{formatDate(p.date)}</span></td>
                              <td><span className="bold" style={{fontSize:13}}>{member?.name || "—"}</span></td>
                              <td><span className="text-xs text-gray">{p.concept}</span></td>
                              <td><span className="badge" style={{background:G.tealLight,color:G.teal}}>{p.method}</span></td>
                              <td style={{textAlign:"right"}}><span style={{fontWeight:700,color:G.teal}}>${Number(p.amount).toLocaleString()}</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>}
                </div>

                {/* Socios sin pago */}
                {pendingMembers.length > 0 && (
                  <div className="card mb-16">
                    <div className="card-title">Socios sin pago registrado este mes</div>
                    <div className="card-sub">{pendingMembers.length} socios · Considera cobrar o confirmar pago</div>
                    <table className="charges-table">
                      <thead><tr><th>Socio</th><th>Plan</th><th style={{textAlign:"right"}}>Monto esperado</th><th></th></tr></thead>
                      <tbody>
                        {pendingMembers.map(m => {
                          const plan = PLANS.find(p=>p.id===m.plan);
                          return (
                            <tr key={m.id}>
                              <td><span className="bold" style={{fontSize:13}}>{m.name}</span></td>
                              <td><span className="text-xs text-gray">{plan?.label}</span></td>
                              <td style={{textAlign:"right"}}><span style={{fontWeight:700,color:G.amber}}>${(plan?.price||0).toLocaleString()}</span></td>
                              <td style={{textAlign:"right"}}><button className="btn btn-primary btn-sm" onClick={()=>{const plan = PLANS.find(p=>p.id===m.plan); setEditingPayment({memberId:m.id,date:today(),amount:plan?.price||0,method:"efectivo",concept:"Mensualidad",note:""}); setShowPaymentModal(true);}}>Registrar</button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Egresos */}
                <div className="card">
                  <div className="flex-between mb-12">
                    <div>
                      <div className="card-title">Egresos del mes</div>
                      <div className="text-xs text-gray">{monthExpenses.length} gastos · ${monthTotalExpenses.toLocaleString()}</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={openNewExpense}>+ Registrar gasto</button>
                  </div>
                  {monthExpenses.length === 0 ? <div className="empty" style={{padding:"20px 0"}}><div className="empty-text">Sin gastos registrados este mes</div></div> :
                    <table className="charges-table">
                      <thead><tr><th>Fecha</th><th>Categoría</th><th>Nota</th><th style={{textAlign:"right"}}>Monto</th></tr></thead>
                      <tbody>
                        {[...monthExpenses].sort((a,b)=>b.date.localeCompare(a.date)).map(e => (
                          <tr key={e.id} style={{cursor:"pointer"}} onClick={()=>openEditExpense(e)}>
                            <td><span className="text-xs">{formatDate(e.date)}</span></td>
                            <td><span className="badge" style={{background:G.redLight,color:G.red}}>{e.category}</span></td>
                            <td><span className="text-xs text-gray">{e.note || "—"}</span></td>
                            <td style={{textAlign:"right"}}><span style={{fontWeight:700,color:G.red}}>${Number(e.amount).toLocaleString()}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>}
                </div>

                <div className="text-xs text-gray" style={{marginTop:12,textAlign:"center"}}>
                  💡 Los almuerzos del comedor se suman automáticamente a los ingresos (${monthMealsCount} × ${MEAL_PRICE} = ${monthMealIncome.toLocaleString()})
                </div>
              </div>
            );
          })()}

          {/* ══════════════════════════════════════════════════════════════════
              VISTA: RECURSOS (Salones y Maestros)
          ══════════════════════════════════════════════════════════════════ */}
          {view === "recursos" && (
            <div>
              <h1 style={{fontFamily:"'Fraunces',serif",fontSize:22,marginBottom:4}}>Recursos</h1>
              <div className="text-xs text-gray mb-20">Gestión de salones y maestros de Nuba</div>

              {/* Salones */}
              <div className="card mb-16">
                <div className="flex-between mb-12">
                  <div>
                    <div className="card-title">Salones</div>
                    <div className="text-xs text-gray">{rooms.length} espacios · Capacidad total: {rooms.reduce((s,r)=>s+r.capacity,0)} personas</div>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={openNewRoom}>+ Salón</button>
                </div>
                <div className="member-grid">
                  {rooms.map(r => {
                    // Count classes scheduled in this room
                    const classesInRoom = schedule.filter(s => s.roomId === r.id).length;
                    return (
                      <div key={r.id} className="member-card" onClick={()=>openEditRoom(r)}>
                        <div style={{fontSize:28,marginBottom:6}}>{r.icon}</div>
                        <div className="member-name">{r.label}</div>
                        <div className="member-plan">Capacidad: {r.capacity} personas</div>
                        <div className="flex gap-6" style={{marginTop:8,flexWrap:"wrap"}}>
                          <span style={{background:G.tealLight,color:G.teal,padding:"2px 9px",borderRadius:10,fontSize:11,fontWeight:700}}>{classesInRoom} clases/sem</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Paquetes */}
              <div className="card mb-16">
                <div className="flex-between mb-12">
                  <div>
                    <div className="card-title">Paquetes</div>
                    <div className="text-xs text-gray">{PLANS.length} paquetes disponibles</div>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={()=>{
                    const newId = `paq${Date.now()}`;
                    setPlans(prev => [...prev, { id: newId, label: "Nuevo paquete", classes: 4, price: 500 }]);
                  }}>+ Paquete</button>
                </div>
                <table className="charges-table">
                  <thead><tr><th>Nombre</th><th>Clases</th><th>Precio</th><th></th></tr></thead>
                  <tbody>
                    {PLANS.map((p, i) => (
                      <tr key={p.id}>
                        <td><input value={p.label} onChange={e=>{
                          const val = e.target.value;
                          setPlans(prev => prev.map((x,j)=>j===i?{...x,label:val}:x));
                        }} style={{padding:"4px 8px",fontSize:13}}/></td>
                        <td><input type="number" min="1" value={p.classes} onChange={e=>{
                          const val = Number(e.target.value);
                          setPlans(prev => prev.map((x,j)=>j===i?{...x,classes:val}:x));
                        }} style={{padding:"4px 8px",fontSize:13,width:80}}/></td>
                        <td><input type="number" min="0" value={p.price} onChange={e=>{
                          const val = Number(e.target.value);
                          setPlans(prev => prev.map((x,j)=>j===i?{...x,price:val}:x));
                        }} style={{padding:"4px 8px",fontSize:13,width:100}}/></td>
                        <td><button className="btn btn-danger btn-xs" onClick={()=>{
                          if(PLANS.length<=1) return;
                          setPlans(prev => prev.filter((_,j)=>j!==i));
                        }}>🗑️</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Precio almuerzo */}
              <div className="card mb-16">
                <div className="card-title">Precio del almuerzo</div>
                <div className="card-sub">Costo actual por comida en el comedor</div>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:15}}>$</span>
                  <input type="number" min="0" value={MEAL_PRICE} onChange={e=>setMealPrice(Number(e.target.value))}
                    style={{width:120,fontSize:18,fontWeight:700,color:G.teal}}/>
                  <span className="text-sm text-gray">por almuerzo</span>
                </div>
              </div>

              {/* Maestros */}
              <div className="card">
                <div className="flex-between mb-12">
                  <div>
                    <div className="card-title">Maestros</div>
                    <div className="text-xs text-gray">{teachers.filter(t=>t.active).length} maestros activos</div>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={openNewTeacher}>+ Maestro</button>
                </div>
                <div className="member-grid">
                  {teachers.filter(t=>t.active).map(t => {
                    const classesTeaching = schedule.filter(s => s.teacherId === t.id).length;
                    const weeklyPay = classesTeaching * (t.hourlyRate || 0);
                    return (
                      <div key={t.id} className="member-card" onClick={()=>openEditTeacher(t)}>
                        <div className="member-name">{t.name}</div>
                        <div className="member-plan">{t.phone || "Sin teléfono"}</div>
                        <div className="flex gap-6" style={{marginTop:8,flexWrap:"wrap"}}>
                          {(t.specialties||[]).map(sp => {
                            const ct = CLASS_TYPES.find(c=>c.id===sp);
                            return ct ? <span key={sp} style={{background:ct.bg,color:ct.color,padding:"2px 9px",borderRadius:10,fontSize:10,fontWeight:700}}>{ct.icon} {ct.label}</span> : null;
                          })}
                        </div>
                        <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid #f0f5f4",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span className="text-xs text-gray">{classesTeaching} clases/sem</span>
                          <span style={{fontSize:13,fontWeight:700,color:G.teal}}>${weeklyPay.toLocaleString()}/sem</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

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
              <div className="form-row three">
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de nacimiento</label>
                  <input type="date" value={newMember.birthDate} onChange={e=>setNewMember(p=>({...p,birthDate:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Sexo</label>
                  <select value={newMember.gender} onChange={e=>setNewMember(p=>({...p,gender:e.target.value}))}>
                    <option value="">—</option>
                    <option value="F">Mujer</option>
                    <option value="M">Hombre</option>
                  </select></div>
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de pago</label>
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
                <label>Clases tomadas (puedes seleccionar varias)</label>
                <div className="type-pills" style={{marginTop:8}}>
                  {CLASS_TYPES.filter(c=>!c.special).map(ct=>{
                    const selected = newClass.types?.includes(ct.id);
                    return (
                      <ClassTypePill key={ct.id} type={ct.id} selected={selected}
                        onClick={()=>setNewClass(p=>({
                          ...p,
                          types: selected ? p.types.filter(t=>t!==ct.id) : [...(p.types||[]), ct.id]
                        }))}/>
                    );
                  })}
                </div>
                {newClass.types?.length > 0 && (
                  <div style={{marginTop:8,fontSize:12,color:G.teal,fontWeight:600}}>
                    ✓ {newClass.types.length} clase{newClass.types.length>1?"s":""} seleccionada{newClass.types.length>1?"s":""}
                  </div>
                )}
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
                <div className="form-group" style={{marginBottom:0}}><label>Sexo</label>
                  <select value={editMember.gender||""} onChange={e=>setEditMember(p=>({...p,gender:e.target.value}))}>
                    <option value="">—</option>
                    <option value="F">Mujer</option>
                    <option value="M">Hombre</option>
                  </select></div>
                <div className="form-group" style={{marginBottom:0}}><label>Fecha de ingreso</label>
                  <input type="date" value={editMember.joinDate||""} onChange={e=>setEditMember(p=>({...p,joinDate:e.target.value}))}/></div>
              </div>
              <div className="form-group"><label>Fecha de pago (día del mes)</label>
                <input type="date" value={editMember.paymentDate||""} onChange={e=>setEditMember(p=>({...p,paymentDate:e.target.value}))}/></div>
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

        {/* ── MODAL: Inscripción a clases (por semana) ── */}
        {showEnrollModal && enrollingMember && enrollWeek && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowEnrollModal(false)}>
            <div className="modal" style={{maxWidth:760}}>
              <div className="modal-title">Inscripción a clases</div>
              <div className="modal-sub">{enrollingMember.name}</div>

              {/* Selector de modo */}
              <div style={{display:"flex",gap:4,marginTop:12,marginBottom:14,padding:4,background:G.grayLight,borderRadius:8}}>
                <button
                  onClick={()=>setEnrollWeek(null)}
                  style={{flex:1,padding:"8px 12px",borderRadius:6,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                    background: !enrollWeek ? "white" : "transparent",
                    color: !enrollWeek ? G.teal : G.gray,
                    boxShadow: !enrollWeek ? "0 1px 3px rgba(0,0,0,.08)" : "none"}}>
                  📌 Patrón fijo (cada semana)
                </button>
                <button
                  onClick={()=>setEnrollWeek(getWeekKey(today()))}
                  style={{flex:1,padding:"8px 12px",borderRadius:6,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                    background: enrollWeek ? "white" : "transparent",
                    color: enrollWeek ? G.teal : G.gray,
                    boxShadow: enrollWeek ? "0 1px 3px rgba(0,0,0,.08)" : "none"}}>
                  📅 Por semana (excepciones)
                </button>
              </div>

              {/* Week navigator (solo en modo por semana) */}
              {enrollWeek && (
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:G.tealPale,borderRadius:8,marginBottom:12}}>
                  <button onClick={()=>setEnrollWeek(shiftWeek(enrollWeek, -1))}
                    style={{background:"transparent",border:"none",cursor:"pointer",fontSize:18,color:G.teal,padding:"4px 10px"}}>←</button>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,color:G.teal}}>{formatWeekRange(enrollWeek)}</div>
                    <div style={{fontSize:11,color:G.gray,marginTop:2}}>
                      {enrollWeek === getWeekKey(today()) ? "Semana actual" : "Otra semana"}
                      {hasWeekException(enrollingMember.id, enrollWeek) && " · con excepciones"}
                    </div>
                  </div>
                  <button onClick={()=>setEnrollWeek(shiftWeek(enrollWeek, 1))}
                    style={{background:"transparent",border:"none",cursor:"pointer",fontSize:18,color:G.teal,padding:"4px 10px"}}>→</button>
                </div>
              )}

              <div style={{padding:"8px 12px",background:G.amberLight,borderRadius:8,marginBottom:12,fontSize:11,color:G.amber}}>
                {enrollWeek
                  ? "💡 Esta semana hereda el patrón fijo. Toca las clases para marcar excepciones solo para esta semana."
                  : "💡 Define el patrón regular que se repite cada semana automáticamente."}
              </div>

              <div style={{overflow:"auto",margin:"8px 0",border:"1px solid #e0e8e7",borderRadius:10}}>
                <table className="charges-table" style={{minWidth:640}}>
                  <thead>
                    <tr>
                      <th style={{width:70}}>Hora</th>
                      {DAYS.map(d => <th key={d.id} style={{textAlign:"center"}}>{d.label.slice(0,3)}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const times = [...new Set(schedule.filter(s=>!CLASS_TYPES.find(c=>c.id===s.classType)?.special).map(s => s.startTime))].sort();
                      return times.map(time => (
                        <tr key={time}>
                          <td style={{fontWeight:700,color:G.teal,fontSize:12,whiteSpace:"nowrap"}}>{time}</td>
                          {DAYS.map(d => {
                            const slot = schedule.find(s => s.day === d.id && s.startTime === time && !CLASS_TYPES.find(c=>c.id===s.classType)?.special);
                            if (!slot) return <td key={d.id} style={{background:G.grayLight}}></td>;
                            const ct = CLASS_TYPES.find(c => c.id === slot.classType);
                            const room = rooms.find(r => r.id === slot.roomId);
                            const capacity = room?.capacity || 0;

                            const baseEnrolled = isEnrolled(enrollingMember.id, slot.id);
                            const checked = enrollWeek
                              ? isEnrolledInWeek(enrollingMember.id, slot.id, enrollWeek)
                              : baseEnrolled;

                            // Compute count for display (this week in week-mode, base in pattern-mode)
                            const activeCount = enrollWeek
                              ? getWeekEnrollees(slot.id, enrollWeek).length
                              : getSlotEnrollees(slot.id).length;
                            const isFull = capacity > 0 && activeCount >= capacity && !checked;

                            // Detect if there's an exception for this cell (in week mode)
                            const hasExc = enrollWeek && weeklyExceptions[enrollingMember.id]?.[enrollWeek]?.[slot.id];

                            return (
                              <td key={d.id} style={{padding:6}}>
                                <div
                                  onClick={()=>{
                                    if(isFull) return;
                                    if(enrollWeek) toggleWeekEnrollment(enrollingMember.id, slot.id, enrollWeek);
                                    else toggleEnrollment(enrollingMember.id, slot.id);
                                  }}
                                  style={{
                                    background: checked ? ct?.color : ct?.bg,
                                    color: checked ? "white" : ct?.color,
                                    borderRadius:8,padding:"8px 8px",cursor: isFull?"not-allowed":"pointer",
                                    border:`2px solid ${hasExc ? G.amber : (checked ? ct?.color : "transparent")}`,
                                    opacity: isFull ? 0.4 : 1,
                                    position:"relative",
                                    transition:"all .15s"
                                  }}>
                                  {hasExc && (
                                    <div style={{position:"absolute",top:-6,right:-6,background:G.amber,color:"white",fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:10,border:"2px solid white"}}>
                                      {hasExc === "skip" ? "✕" : "+"}
                                    </div>
                                  )}
                                  <div style={{fontSize:11,fontWeight:700}}>{ct?.icon} {ct?.label}</div>
                                  <div style={{fontSize:10,marginTop:2,opacity:.85}}>{activeCount}{capacity>0?`/${capacity}`:""}</div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>

              {(() => {
                // Count for this view (week or base)
                const count = enrollWeek
                  ? schedule.filter(s => isEnrolledInWeek(enrollingMember.id, s.id, enrollWeek) && !CLASS_TYPES.find(c=>c.id===s.classType)?.special).length
                  : (enrollments[enrollingMember.id]||[]).length;
                const perMonth = count * 4;
                const plan = PLANS.find(p => p.id === enrollingMember.plan);
                const planClasses = plan?.classes || 0;
                const isUnlimited = planClasses >= 999;
                const diff = planClasses - perMonth;
                const msg = isUnlimited ? "Plan ilimitado"
                  : diff === 0 ? "Coincide perfecto con su paquete"
                  : diff > 0 ? `Sobran ${diff} clases del paquete al mes (puede tomar extras)`
                  : `Excede el paquete por ${Math.abs(diff)} clases al mes`;
                const bg = isUnlimited ? G.tealLight : diff >= 0 ? G.greenLight : G.amberLight;
                const color = isUnlimited ? G.teal : diff >= 0 ? G.green : G.amber;
                return (
                  <div style={{padding:"10px 14px",background:bg,borderRadius:8,marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:12,fontWeight:700,color}}>
                        📅 {count} clases {enrollWeek ? "esta semana" : "por semana"} · ~{perMonth} al mes
                      </span>
                      <span style={{fontSize:11,color:G.gray}}>Paquete: {isUnlimited?"∞":planClasses}/mes</span>
                    </div>
                    <div style={{fontSize:11,color,fontWeight:600}}>{msg}</div>
                  </div>
                );
              })()}

              <div className="flex gap-8" style={{justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  {enrollWeek && hasWeekException(enrollingMember.id, enrollWeek) && (
                    <button className="btn btn-ghost btn-sm" onClick={()=>{
                      setWeeklyExceptions(prev => {
                        const memberExc = { ...(prev[enrollingMember.id] || {}) };
                        delete memberExc[enrollWeek];
                        return { ...prev, [enrollingMember.id]: memberExc };
                      });
                    }}>🔄 Quitar excepciones de esta semana</button>
                  )}
                </div>
                <button className="btn btn-primary" onClick={()=>setShowEnrollModal(false)}>Guardar</button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Maestro ── */}
        {showTeacherModal && editingTeacher && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowTeacherModal(false)}>
            <div className="modal">
              <div className="modal-title">{editingTeacher.id?"Editar maestro":"Nuevo maestro"}</div>
              <div className="modal-sub">Datos del instructor</div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Nombre</label>
                  <input value={editingTeacher.name||""} onChange={e=>setEditingTeacher(p=>({...p,name:e.target.value}))} placeholder="Nombre completo"/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Teléfono</label>
                  <input value={editingTeacher.phone||""} onChange={e=>setEditingTeacher(p=>({...p,phone:e.target.value}))} placeholder="55 1234 5678"/></div>
              </div>
              <div className="form-group" style={{marginTop:14}}><label>Pago por clase ($)</label>
                <input type="number" min="0" value={editingTeacher.hourlyRate||0} onChange={e=>setEditingTeacher(p=>({...p,hourlyRate:Number(e.target.value)}))}/></div>
              <div className="form-group"><label>Especialidades (clases que puede dar)</label>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>
                  {CLASS_TYPES.filter(c=>!c.special).map(ct => {
                    const selected = (editingTeacher.specialties||[]).includes(ct.id);
                    return (
                      <span key={ct.id} className="type-pill" onClick={()=>{
                        const curr = editingTeacher.specialties||[];
                        setEditingTeacher(p=>({...p,specialties: selected ? curr.filter(x=>x!==ct.id) : [...curr,ct.id]}));
                      }} style={{background: selected?ct.color:ct.bg, color: selected?"white":ct.color, borderColor:ct.color}}>
                        {ct.icon} {ct.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-8" style={{justifyContent:"space-between",marginTop:16}}>
                <div>{editingTeacher.id && <button className="btn btn-danger btn-sm" onClick={()=>{deleteTeacher(editingTeacher.id);setShowTeacherModal(false);}}>🗑️ Eliminar</button>}</div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost" onClick={()=>setShowTeacherModal(false)}>Cancelar</button>
                  <button className="btn btn-primary" onClick={saveTeacher}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Salón ── */}
        {showRoomModal && editingRoom && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowRoomModal(false)}>
            <div className="modal">
              <div className="modal-title">{editingRoom._oldId?"Editar salón":"Nuevo salón"}</div>
              <div className="modal-sub">Espacio físico de Nuba</div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Ícono (emoji)</label>
                  <input value={editingRoom.icon||""} onChange={e=>setEditingRoom(p=>({...p,icon:e.target.value}))} placeholder="🎨" maxLength={4}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>ID (sin espacios, para referencia interna)</label>
                  <input value={editingRoom.id||""} onChange={e=>setEditingRoom(p=>({...p,id:e.target.value.toLowerCase().replace(/\s+/g,"_")}))} placeholder="arte"/></div>
              </div>
              <div className="form-group" style={{marginTop:14}}><label>Nombre del salón</label>
                <input value={editingRoom.label||""} onChange={e=>setEditingRoom(p=>({...p,label:e.target.value}))} placeholder="Salón de Arte"/></div>
              <div className="form-group"><label>Capacidad máxima (personas)</label>
                <input type="number" min="1" value={editingRoom.capacity||1} onChange={e=>setEditingRoom(p=>({...p,capacity:Number(e.target.value)}))}/></div>
              <div className="flex gap-8" style={{justifyContent:"space-between",marginTop:16}}>
                <div>{editingRoom._oldId && <button className="btn btn-danger btn-sm" onClick={()=>{deleteRoom(editingRoom._oldId);setShowRoomModal(false);}}>🗑️ Eliminar</button>}</div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost" onClick={()=>setShowRoomModal(false)}>Cancelar</button>
                  <button className="btn btn-primary" onClick={saveRoom}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Clase en horario ── */}
        {showScheduleModal && editingSlot && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowScheduleModal(false)}>
            <div className="modal">
              <div className="modal-title">{editingSlot.id?"Editar clase":"Nueva clase en horario"}</div>
              <div className="modal-sub">Programar clase recurrente semanal</div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Día</label>
                  <select value={editingSlot.day} onChange={e=>setEditingSlot(p=>({...p,day:e.target.value}))}>
                    {DAYS.map(d=><option key={d.id} value={d.id}>{d.label}</option>)}
                  </select></div>
                <div className="form-group" style={{marginBottom:0}}><label>Tipo de clase</label>
                  <select value={editingSlot.classType} onChange={e=>setEditingSlot(p=>({...p,classType:e.target.value}))}>
                    {CLASS_TYPES.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                  </select></div>
              </div>
              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Hora inicio</label>
                  <input type="time" value={editingSlot.startTime||""} onChange={e=>setEditingSlot(p=>({...p,startTime:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Hora fin</label>
                  <input type="time" value={editingSlot.endTime||""} onChange={e=>setEditingSlot(p=>({...p,endTime:e.target.value}))}/></div>
              </div>
              <div className="form-row" style={{marginTop:14}}>
                <div className="form-group" style={{marginBottom:0}}><label>Salón</label>
                  <select value={editingSlot.roomId} onChange={e=>setEditingSlot(p=>({...p,roomId:e.target.value}))}>
                    {rooms.map(r=><option key={r.id} value={r.id}>{r.icon} {r.label} (cap. {r.capacity})</option>)}
                  </select></div>
                <div className="form-group" style={{marginBottom:0}}><label>Maestro</label>
                  <select value={editingSlot.teacherId || ""} onChange={e=>setEditingSlot(p=>({...p,teacherId:e.target.value ? Number(e.target.value) : null}))}>
                    <option value="">— Sin maestro —</option>
                    {teachers.filter(t=>t.active && (t.specialties||[]).includes(editingSlot.classType)).map(t=>
                      <option key={t.id} value={t.id}>{t.name}</option>
                    )}
                    {teachers.filter(t=>t.active && !(t.specialties||[]).includes(editingSlot.classType)).map(t=>
                      <option key={t.id} value={t.id}>{t.name} (no especialidad)</option>
                    )}
                  </select></div>
              </div>
              <div className="flex gap-8" style={{justifyContent:"space-between",marginTop:16}}>
                <div>{editingSlot.id && <button className="btn btn-danger btn-sm" onClick={()=>{deleteSlot(editingSlot.id);setShowScheduleModal(false);}}>🗑️ Eliminar</button>}</div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost" onClick={()=>setShowScheduleModal(false)}>Cancelar</button>
                  <button className="btn btn-primary" onClick={saveSlot}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Registrar pago ── */}
        {showPaymentModal && editingPayment && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowPaymentModal(false)}>
            <div className="modal">
              <div className="modal-title">{editingPayment.id?"Editar pago":"Registrar pago"}</div>
              <div className="modal-sub">Pago mensual o abono de un socio</div>

              <div className="form-group"><label>Socio</label>
                <select value={editingPayment.memberId||""} onChange={e=>{
                  const id = Number(e.target.value);
                  const mem = members.find(m=>m.id===id);
                  const plan = mem ? PLANS.find(p=>p.id===mem.plan) : null;
                  setEditingPayment(p=>({...p,memberId:id, amount: p.amount||plan?.price||0}));
                }}>
                  <option value="">— Selecciona un socio —</option>
                  {members.filter(m=>m.active).map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Fecha</label>
                  <input type="date" value={editingPayment.date} onChange={e=>setEditingPayment(p=>({...p,date:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Monto ($)</label>
                  <input type="number" min="0" value={editingPayment.amount||""} onChange={e=>setEditingPayment(p=>({...p,amount:Number(e.target.value)}))}/></div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Concepto</label>
                  <select value={editingPayment.concept} onChange={e=>setEditingPayment(p=>({...p,concept:e.target.value}))}>
                    <option>Mensualidad</option>
                    <option>Paquete adicional</option>
                    <option>Comidas</option>
                    <option>Inscripción</option>
                    <option>Otro</option>
                  </select></div>
                <div className="form-group" style={{marginBottom:0}}><label>Método de pago</label>
                  <select value={editingPayment.method} onChange={e=>setEditingPayment(p=>({...p,method:e.target.value}))}>
                    <option>efectivo</option>
                    <option>transferencia</option>
                    <option>tarjeta</option>
                    <option>depósito</option>
                  </select></div>
              </div>

              <div className="form-group"><label>Nota (opcional)</label>
                <input value={editingPayment.note||""} onChange={e=>setEditingPayment(p=>({...p,note:e.target.value}))} placeholder="Referencia, banco, etc."/></div>

              <div className="flex gap-8" style={{justifyContent:"space-between",marginTop:12}}>
                <div>{editingPayment.id && <button className="btn btn-danger btn-sm" onClick={()=>{deletePayment(editingPayment.id);setShowPaymentModal(false);}}>🗑️ Eliminar</button>}</div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost" onClick={()=>setShowPaymentModal(false)}>Cancelar</button>
                  <button className="btn btn-primary" onClick={savePayment}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Registrar gasto ── */}
        {showExpenseModal && editingExpense && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowExpenseModal(false)}>
            <div className="modal">
              <div className="modal-title">{editingExpense.id?"Editar gasto":"Registrar gasto"}</div>
              <div className="modal-sub">Egreso de Nuba</div>

              <div className="form-row">
                <div className="form-group" style={{marginBottom:0}}><label>Fecha</label>
                  <input type="date" value={editingExpense.date} onChange={e=>setEditingExpense(p=>({...p,date:e.target.value}))}/></div>
                <div className="form-group" style={{marginBottom:0}}><label>Monto ($)</label>
                  <input type="number" min="0" value={editingExpense.amount||""} onChange={e=>setEditingExpense(p=>({...p,amount:Number(e.target.value)}))}/></div>
              </div>

              <div className="form-group"><label>Categoría</label>
                <select value={editingExpense.category} onChange={e=>setEditingExpense(p=>({...p,category:e.target.value}))}>
                  <option value="maestros">Pago a maestros</option>
                  <option value="renta">Renta</option>
                  <option value="insumos">Insumos comedor</option>
                  <option value="materiales">Materiales (arte, limpieza)</option>
                  <option value="servicios">Servicios (luz, agua, internet)</option>
                  <option value="nomina">Nómina (personal)</option>
                  <option value="marketing">Marketing / publicidad</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-group"><label>Descripción</label>
                <input value={editingExpense.note||""} onChange={e=>setEditingExpense(p=>({...p,note:e.target.value}))} placeholder="Ej: Pago semanal María González, Renta abril..."/></div>

              <div className="flex gap-8" style={{justifyContent:"space-between",marginTop:12}}>
                <div>{editingExpense.id && <button className="btn btn-danger btn-sm" onClick={()=>{deleteExpense(editingExpense.id);setShowExpenseModal(false);}}>🗑️ Eliminar</button>}</div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost" onClick={()=>setShowExpenseModal(false)}>Cancelar</button>
                  <button className="btn btn-primary" onClick={saveExpense}>Guardar</button>
                </div>
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
              <AlertBanner type="amber" msg="Al renovar se reinicia el contador de CLASES y arranca un nuevo ciclo de 30 días. Los almuerzos NO se reinician — siguen acumulándose por mes calendario."/>
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
