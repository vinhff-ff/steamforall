import { useState } from "react";

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Nunito:wght@600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --c1: #6b4017; --c2: #4a2b0a; --c3: #3a2008; --c4: #2a1505;
    --gold: #f5d68a; --gold2: #c9a455; --amber: #f5a800;
    --border: #a0621a; --gear: #5a3a10;
    --radius: 14px;
  }

  .lp-root {
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    background: url('/bg.png') center/cover no-repeat fixed;
    position: relative;
    padding: 0 0 80px;
  }
  .lp-root::before {
    content: '';
    position: fixed; inset: 0;
    background: linear-gradient(160deg,#f5e6c8 0%,#e2c98a 35%,#c9a455 65%,#8b5e1a 100%);
    z-index: -1;
  }
  .lp-root::after {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
    opacity: .4;
  }

  .lp-wrap { position: relative; z-index: 1; max-width: 1140px; margin: 0 auto; padding: 0 20px; }

  /* ── TOPBAR ── */
  .lp-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 0 14px;
    border-bottom: 1px solid rgba(160,98,26,0.25);
    margin-bottom: 32px;
    animation: fadeDown .5s ease both;
  }
  .lp-topbar-left { display: flex; align-items: center; gap: 14px; }
  .lp-logo {
    font-family: 'Cinzel', serif; font-size: 1.35rem; font-weight: 900;
    color: #3d1a00;
    text-shadow: 0 1px 0 rgba(255,220,100,.5);
    letter-spacing: 1px;
  }
  .lp-week-chip {
    padding: 4px 14px;
    background: linear-gradient(160deg,var(--c1),var(--c3));
    border: 1.5px solid var(--border); border-radius: 20px;
    color: var(--gold); font-size: .75rem; font-weight: 800; letter-spacing: .5px;
  }

  /* back btn */
  .back-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 7px 16px;
    background: linear-gradient(160deg,var(--c1),var(--c3));
    border: 2px solid var(--border); border-radius: 10px;
    color: var(--gold); font-family: 'Nunito',sans-serif;
    font-size: .82rem; font-weight: 800; cursor: pointer;
    box-shadow: 0 3px 10px rgba(0,0,0,.3);
    transition: filter .2s, transform .1s;
  }
  .back-btn:hover { filter: brightness(1.12); }
  .back-btn:active { transform: translateY(2px); }

  @keyframes fadeDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes popIn    { from{opacity:0;transform:scale(.82)} to{opacity:1;transform:scale(1)} }

  /* ─────────────────────────────────────────
     VIEW 1 – GRADE SELECTOR
  ───────────────────────────────────────── */
  .grade-section { animation: fadeUp .55s ease both; }

  .section-head {
    text-align: center; margin-bottom: 36px;
  }
  .section-head h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem,4vw,2.4rem); font-weight: 900;
    color: #3d1a00;
    text-shadow: 0 1px 0 rgba(255,220,100,.5), 0 3px 10px rgba(0,0,0,.2);
    letter-spacing: 2px;
  }
  .section-head p { margin-top: 9px; font-size: .9rem; font-weight: 700; color: #7a4e10; }

  /* Level strips */
  .level-strip {
    margin-bottom: 28px; animation: fadeUp .55s ease both;
  }
  .level-strip:nth-child(2){animation-delay:.05s}
  .level-strip:nth-child(3){animation-delay:.1s}

  .level-strip-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 14px;
  }
  .level-badge {
    display: flex; align-items: center; justify-content: center;
    width: 44px; height: 44px; border-radius: 50%;
    font-size: 1.4rem;
    border: 3px solid var(--border);
    box-shadow: 0 4px 14px rgba(0,0,0,.35);
    flex-shrink: 0;
  }
  .level-title {
    font-family: 'Cinzel', serif; font-size: 1.05rem; font-weight: 700;
    color: #3d1a00;
  }
  .level-sub { font-size: .78rem; font-weight: 700; color: #7a4e10; }
  .level-line { flex: 1; height: 2px; background: linear-gradient(90deg,var(--border),transparent); border-radius: 2px; }

  /* Grade cards grid */
  .grade-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 14px;
  }

  .grade-card {
    position: relative;
    background: linear-gradient(160deg,var(--c1),var(--c2),var(--c3));
    border: 4px solid var(--c4);
    border-radius: var(--radius);
    padding: 22px 12px 18px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 0 0 1.5px var(--border) inset, 0 6px 20px rgba(0,0,0,.4);
    transition: transform .22s cubic-bezier(.34,1.2,.64,1), box-shadow .2s, filter .15s;
    animation: popIn .45s cubic-bezier(.34,1.56,.64,1) both;
    overflow: hidden;
  }
  .grade-card::before {
    content: '';
    position: absolute; inset: 5px; border-radius: 10px;
    border: 1.5px solid rgba(160,98,26,.28); pointer-events: none;
  }
  .grade-card:hover {
    transform: translateY(-6px) scale(1.04);
    filter: brightness(1.08);
    box-shadow: 0 0 0 2px #c07820 inset, 0 14px 36px rgba(0,0,0,.5);
  }
  .grade-card:active { transform: scale(.97); }

  .grade-card .gc { position: absolute; width: 18px; height: 18px; color: var(--gear); }
  .gc-tl{top:-7px;left:-7px} .gc-tr{top:-7px;right:-7px}
  .gc-bl{bottom:-7px;left:-7px} .gc-br{bottom:-7px;right:-7px}

  .grade-num {
    font-family: 'Cinzel', serif; font-size: 2rem; font-weight: 900;
    color: var(--gold);
    text-shadow: 0 2px 8px rgba(0,0,0,.5);
    line-height: 1;
  }
  .grade-label {
    font-size: .72rem; font-weight: 800; color: var(--gold2);
    margin-top: 5px; letter-spacing: .4px;
    text-transform: uppercase;
  }
  .grade-count {
    margin-top: 9px;
    display: inline-block;
    padding: 2px 10px;
    background: rgba(255,200,50,.12);
    border: 1px solid rgba(255,200,50,.25);
    border-radius: 10px;
    font-size: .68rem; font-weight: 800; color: #ffe066;
  }


  /* ─────────────────────────────────────────
     VIEW 2 – COURSE LIST
  ───────────────────────────────────────── */
  .course-section { animation: fadeUp .5s ease both; }

  .course-header-row {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 28px;
  }
  .course-header-icon {
    width: 54px; height: 54px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem;
    border: 3px solid var(--border);
    box-shadow: 0 4px 14px rgba(0,0,0,.35);
    flex-shrink: 0;
  }
  .course-header-info h2 {
    font-family: 'Cinzel', serif; font-size: 1.5rem; font-weight: 900;
    color: #3d1a00;
    text-shadow: 0 1px 0 rgba(255,220,100,.5);
  }
  .course-header-info p { font-size: .83rem; font-weight: 700; color: #7a4e10; margin-top: 3px; }

  /* Subject filter tabs */
  .subject-tabs {
    display: flex; gap: 8px; flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .subject-tab {
    padding: 6px 16px;
    background: rgba(58,32,8,.5);
    border: 1.5px solid rgba(160,98,26,.35);
    border-radius: 20px;
    font-size: .78rem; font-weight: 800; color: var(--gold2);
    cursor: pointer;
    transition: background .2s, border-color .2s, color .2s;
  }
  .subject-tab:hover { background: rgba(107,64,23,.7); color: var(--gold); }
  .subject-tab.active {
    background: linear-gradient(135deg,var(--c1),var(--c3));
    border-color: var(--border); color: var(--gold);
    box-shadow: 0 3px 10px rgba(0,0,0,.3);
  }

  /* Course grid */
  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px,1fr));
    gap: 22px;
  }

  .course-card {
    position: relative;
    background: linear-gradient(160deg,var(--c1),var(--c2),var(--c3));
    border: 4px solid var(--c4);
    border-radius: var(--radius);
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 0 0 1.5px var(--border) inset, 0 8px 28px rgba(0,0,0,.45);
    transition: transform .22s cubic-bezier(.34,1.2,.64,1), box-shadow .2s, filter .15s;
    animation: popIn .45s cubic-bezier(.34,1.56,.64,1) both;
  }
  .course-card::before {
    content: '';
    position: absolute; inset: 5px; border-radius: 10px;
    border: 1.5px solid rgba(160,98,26,.25); pointer-events: none; z-index: 1;
  }
  .course-card:hover {
    transform: translateY(-5px) scale(1.015);
    filter: brightness(1.06);
    box-shadow: 0 0 0 2px #c07820 inset, 0 16px 40px rgba(0,0,0,.55);
  }

  .course-card .gc { position: absolute; width: 22px; height: 22px; color: var(--gear); z-index: 2; }

  /* Thumbnail */
  .course-thumb {
    position: relative; width: 100%; padding-top: 52%;
    background: rgba(0,0,0,.3); overflow: hidden;
  }
  .course-thumb-inner {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem;
    background: linear-gradient(135deg,rgba(0,0,0,.2),rgba(0,0,0,.4));
  }
  .thumb-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,.35);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity .2s;
  }
  .course-card:hover .thumb-overlay { opacity: 1; }
  .play-circle {
    width: 52px; height: 52px; border-radius: 50%;
    background: rgba(255,255,255,.2);
    border: 2px solid rgba(255,255,255,.6);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    backdrop-filter: blur(4px);
  }
  .course-lessons-badge {
    position: absolute; top: 10px; right: 10px;
    background: rgba(0,0,0,.65); border-radius: 8px;
    padding: 3px 9px; font-size: .68rem; font-weight: 800;
    color: #ffe; backdrop-filter: blur(4px);
  }
  .course-subject-badge {
    position: absolute; bottom: 10px; left: 10px;
    padding: 3px 10px; border-radius: 10px;
    font-size: .65rem; font-weight: 900; letter-spacing: .4px;
    text-transform: uppercase;
  }

  /* Course body */
  .course-body { padding: 16px 18px 18px; position: relative; z-index: 1; }
  .course-title {
    font-family: 'Cinzel', serif; font-size: .95rem; font-weight: 700;
    color: var(--gold); line-height: 1.35; margin-bottom: 7px;
  }
  .course-desc {
    font-size: .76rem; font-weight: 600; color: var(--gold2);
    line-height: 1.6; margin-bottom: 12px;
  }
  .course-meta {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    margin-bottom: 12px;
  }
  .course-meta span {
    font-size: .69rem; font-weight: 800; color: rgba(200,164,90,.7);
    display: flex; align-items: center; gap: 4px;
  }
  /* progress */
  .course-prog-track {
    height: 5px; background: rgba(0,0,0,.35); border-radius: 4px;
    overflow: hidden; border: 1px solid rgba(160,98,26,.2);
  }
  .course-prog-fill {
    height: 100%; border-radius: 4px;
    background: linear-gradient(90deg,var(--amber),#ffe066);
    box-shadow: 0 0 8px rgba(245,168,0,.5);
  }
  .course-prog-label {
    font-size: .68rem; font-weight: 800; color: rgba(200,164,90,.7);
    margin-top: 4px; text-align: right;
  }


  /* ─────────────────────────────────────────
     VIEW 3 – VIDEO LIST (inside course)
  ───────────────────────────────────────── */
  .video-section { animation: fadeUp .5s ease both; }

  .video-course-header {
    display: flex; align-items: flex-start; gap: 18px;
    padding: 20px 24px;
    background: linear-gradient(160deg,var(--c1),var(--c2),var(--c3));
    border: 4px solid var(--c4); border-radius: var(--radius);
    box-shadow: 0 0 0 1.5px var(--border) inset, 0 8px 28px rgba(0,0,0,.45);
    margin-bottom: 26px; position: relative; overflow: hidden;
  }
  .video-course-header::before {
    content:''; position:absolute; inset:5px; border-radius:10px;
    border:1.5px solid rgba(160,98,26,.25); pointer-events:none;
  }
  .video-course-header .gc { position:absolute; width:22px; height:22px; color:var(--gear); }
  .vch-icon {
    width: 60px; height: 60px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; flex-shrink: 0;
    border: 2px solid rgba(160,98,26,.5);
    box-shadow: 0 4px 12px rgba(0,0,0,.4);
  }
  .vch-info { flex: 1; min-width: 0; }
  .vch-info h2 {
    font-family: 'Cinzel', serif; font-size: 1.2rem; font-weight: 900;
    color: var(--gold); margin-bottom: 5px;
  }
  .vch-info p { font-size: .8rem; font-weight: 600; color: var(--gold2); line-height: 1.5; }
  .vch-stats {
    display: flex; gap: 16px; margin-top: 10px; flex-wrap: wrap;
  }
  .vch-stat {
    font-size: .72rem; font-weight: 800; color: var(--gold2);
    display: flex; align-items: center; gap: 4px;
  }

  /* Video layout */
  .video-layout {
    display: grid; grid-template-columns: 1fr 340px; gap: 20px;
    align-items: start;
  }
  @media(max-width:860px){ .video-layout{grid-template-columns:1fr;} }

  /* Player panel */
  .player-panel {
    position: relative;
    background: linear-gradient(160deg,var(--c1),var(--c2),var(--c3));
    border: 4px solid var(--c4); border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 0 0 1.5px var(--border) inset, 0 8px 28px rgba(0,0,0,.45);
  }
  .player-panel::before {
    content:''; position:absolute; inset:5px; border-radius:10px;
    border:1.5px solid rgba(160,98,26,.25); pointer-events:none; z-index:2;
  }
  .player-panel .gc { position:absolute; width:22px; height:22px; color:var(--gear); z-index:3; }

  .video-embed {
    position: relative; width: 100%; padding-top: 56.25%;
    background: #000;
  }
  .video-embed iframe {
    position: absolute; inset: 0; width: 100%; height: 100%;
    border: none;
  }
  /* demo placeholder when no src */
  .video-placeholder {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(135deg,#0d0520,#1a0a40);
    gap: 14px; cursor: pointer;
  }
  .video-placeholder .play-btn {
    width: 70px; height: 70px; border-radius: 50%;
    background: linear-gradient(135deg,rgba(123,94,230,.6),rgba(90,61,200,.8));
    border: 2px solid rgba(180,140,255,.5);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    box-shadow: 0 0 30px rgba(123,94,230,.5);
    transition: transform .2s, box-shadow .2s;
  }
  .video-placeholder:hover .play-btn {
    transform: scale(1.12);
    box-shadow: 0 0 50px rgba(123,94,230,.8);
  }
  .video-placeholder p { color: rgba(200,180,255,.6); font-size: .82rem; font-weight: 700; }

  .player-info { padding: 16px 18px 18px; position: relative; z-index: 1; }
  .player-title {
    font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 900;
    color: var(--gold); margin-bottom: 6px;
  }
  .player-desc { font-size: .78rem; font-weight: 600; color: var(--gold2); line-height: 1.6; }
  .player-actions { display: flex; gap: 10px; margin-top: 14px; }
  .pa-btn {
    flex: 1; padding: 10px;
    background: linear-gradient(135deg,#7b5ee8,#5a3dc8);
    border: none; border-radius: 10px;
    font-family: 'Nunito',sans-serif; font-size: .82rem; font-weight: 800;
    color: white; cursor: pointer;
    box-shadow: 0 3px 0 #3d28a0, 0 5px 14px rgba(90,61,200,.4);
    transition: filter .15s, transform .1s;
  }
  .pa-btn:hover { filter: brightness(1.1); }
  .pa-btn:active { transform: translateY(2px); }
  .pa-btn-ghost {
    flex: 1; padding: 10px;
    background: rgba(255,255,255,.06);
    border: 1.5px solid rgba(255,255,255,.15); border-radius: 10px;
    font-family: 'Nunito',sans-serif; font-size: .82rem; font-weight: 800;
    color: var(--gold2); cursor: pointer;
    transition: background .2s;
  }
  .pa-btn-ghost:hover { background: rgba(255,255,255,.1); color: var(--gold); }

  /* Playlist */
  .playlist-panel {
    position: relative;
    background: linear-gradient(160deg,var(--c1),var(--c2),var(--c3));
    border: 4px solid var(--c4); border-radius: var(--radius);
    box-shadow: 0 0 0 1.5px var(--border) inset, 0 8px 28px rgba(0,0,0,.45);
    overflow: hidden; max-height: 600px; overflow-y: auto;
  }
  .playlist-panel::before {
    content:''; position:sticky; top:0; left:0; right:0; height:1px;
    border-top:1.5px solid rgba(160,98,26,.25); pointer-events:none;
  }
  .playlist-panel .gc { position:absolute; width:20px; height:20px; color:var(--gear); z-index:2; }

  /* scrollbar */
  .playlist-panel::-webkit-scrollbar { width: 6px; }
  .playlist-panel::-webkit-scrollbar-track { background: rgba(0,0,0,.2); }
  .playlist-panel::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  .playlist-header {
    padding: 14px 16px 10px;
    font-family: 'Cinzel', serif; font-size: .82rem; font-weight: 700;
    color: var(--gold2); letter-spacing: 1px; text-transform: uppercase;
    border-bottom: 1px solid rgba(160,98,26,.2);
    background: rgba(0,0,0,.15);
    position: sticky; top: 0; z-index: 1;
  }

  .playlist-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 14px;
    cursor: pointer; border-bottom: 1px solid rgba(160,98,26,.12);
    transition: background .18s;
    position: relative;
  }
  .playlist-item:hover { background: rgba(255,255,255,.05); }
  .playlist-item.active {
    background: rgba(123,94,230,.15);
    border-left: 3px solid rgba(123,94,230,.7);
  }
  .playlist-item.completed { opacity: .7; }

  .pi-num {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: .72rem; font-weight: 900;
    border: 1.5px solid rgba(160,98,26,.4);
    background: rgba(0,0,0,.25); flex-shrink: 0;
    color: var(--gold2);
  }
  .playlist-item.active .pi-num {
    background: rgba(123,94,230,.3); border-color: rgba(123,94,230,.6); color: #c8aaff;
  }
  .playlist-item.completed .pi-num {
    background: rgba(34,166,58,.2); border-color: rgba(34,166,58,.5); color: #6ee47b;
    font-size: .85rem;
  }

  .pi-info { flex: 1; min-width: 0; }
  .pi-title { font-size: .78rem; font-weight: 800; color: var(--gold); line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .playlist-item.active .pi-title { color: #e0d0ff; }
  .pi-meta { font-size: .67rem; font-weight: 700; color: var(--gold2); margin-top: 2px; display: flex; gap: 8px; }
  .pi-dur { font-size: .68rem; font-weight: 700; color: rgba(200,164,90,.6); flex-shrink: 0; }

  /* ── responsive ── */
  @media(max-width:620px) {
    .grade-grid { grid-template-columns: repeat(3,1fr); }
    .course-grid { grid-template-columns: 1fr; }
  }
`;

/* ─────────────────────────────────────────────
   GEAR SVG
───────────────────────────────────────────── */
const GearSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.92A.563.563 0 0 0 13.5 2h-4.4c-.28 0-.52.19-.56.47l-.42 2.92c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.09-.53 0-.66.24l-2.2 3.81c-.14.24-.08.54.13.7l2.32 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L2.1 14.73c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.81 1.85 1.09l.42 2.92c.04.28.28.47.56.47h4.4c.28 0 .52-.19.56-.47l.42-2.92c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.09.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z"/>
  </svg>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const LEVELS = [
  {
    id: "cap1", label: "Cấp 1", icon: "🌱", emoji: "🌱",
    bg: "linear-gradient(135deg,#43b89c,#2d8a6e)",
    grades: [1,2,3,4,5],
    desc: "Tiểu học · Lớp 1–5",
  },
  {
    id: "cap2", label: "Cấp 2", icon: "📚", emoji: "📚",
    bg: "linear-gradient(135deg,#4facfe,#0072ff)",
    grades: [6,7,8,9],
    desc: "THCS · Lớp 6–9",
  },
  {
    id: "cap3", label: "Cấp 3", icon: "🎓", emoji: "🎓",
    bg: "linear-gradient(135deg,#c471ed,#7b5ee8)",
    grades: [10,11,12],
    desc: "THPT · Lớp 10–12",
  },
];

// ── Khai báo hết constants & helpers TRƯỚC khi dùng ──

const DEMO_YOUTUBE_IDS = [
  "dQw4w9WgXcQ",
  "9bZkp7q19f0",
  "kXYiU_JCYtU",
  "hT_nvWreIhg",
  "fJ9rUzIMcZQ",
  "JGwWNGJdvx8",
  "YQHsXMglC9A",
  "CevxZvSJLk8",
];

function makeVideos(subject, grade, offset) {
  const topics = ["Giới thiệu chương trình", "Bài 1: Khái niệm cơ bản", "Bài 2: Lý thuyết nền tảng", "Bài 3: Ví dụ minh họa", "Bài 4: Bài tập thực hành", "Bài 5: Nâng cao & mở rộng", "Ôn tập chương 1", "Bài kiểm tra thử"];
  const durations = ["05:30","12:45","18:20","09:15","22:10","15:40","30:00","10:25"];
  return topics.map((title, i) => ({
    id: `v-${grade}-${offset}-${i}`,
    title: `${title} – ${subject}`,
    desc: `Video bài giảng ${title.toLowerCase()} trong môn ${subject} lớp ${grade}. Giáo viên giải thích chi tiết và dễ hiểu.`,
    duration: durations[i],
    youtubeId: DEMO_YOUTUBE_IDS[(offset + i) % DEMO_YOUTUBE_IDS.length],
    completed: i < 2,
  }));
}

function makeCoursesForGrade(grade, subjects, icons, level) {
  const COLORS = ["#4facfe","#38ef7d","#f7971e","#c471ed","#f953c6","#11998e","#ff6b6b","#ffe066"];
  return subjects.map((name, i) => ({
    id: `g${grade}-${i}`,
    grade, level,
    name,
    icon: icons[i] || "📚",
    color: COLORS[i % COLORS.length],
    desc: `Chương trình chuẩn ${name} dành cho học sinh lớp ${grade}. Bao gồm lý thuyết, bài tập và ôn thi.`,
    lessons: Math.floor(Math.random() * 15) + 8,
    duration: `${Math.floor(Math.random() * 8) + 4}h ${Math.floor(Math.random() * 50) + 10}p`,
    progress: Math.floor(Math.random() * 80),
    videos: makeVideos(name, grade, i),
  }));
}

const COURSES_BY_GRADE = {
  1:  makeCoursesForGrade(1,  ["Toán lớp 1","Tiếng Việt 1","Tự nhiên & Xã hội"],        ["📐","📖","🌿"], "cap1"),
  2:  makeCoursesForGrade(2,  ["Toán lớp 2","Tiếng Việt 2","Đạo đức 2"],                 ["📐","📖","🌟"], "cap1"),
  3:  makeCoursesForGrade(3,  ["Toán lớp 3","Tiếng Việt 3","Khoa học 3"],                ["📐","📖","🔬"], "cap1"),
  4:  makeCoursesForGrade(4,  ["Toán lớp 4","Tiếng Việt 4","Lịch sử 4"],                 ["📐","📖","🏛️"], "cap1"),
  5:  makeCoursesForGrade(5,  ["Toán lớp 5","Tiếng Việt 5","Khoa học 5","Tiếng Anh 1"], ["📐","📖","🔬","🌍"], "cap1"),
  6:  makeCoursesForGrade(6,  ["Toán 6","Ngữ văn 6","Khoa học tự nhiên 6","Lịch sử & ĐL 6"],["📐","📖","🔬","🏛️"],"cap2"),
  7:  makeCoursesForGrade(7,  ["Toán 7","Ngữ văn 7","Vật lý 7","Hóa học 7","Tiếng Anh 7"],["📐","📖","⚡","🧪","🌍"],"cap2"),
  8:  makeCoursesForGrade(8,  ["Toán 8","Ngữ văn 8","Vật lý 8","Hóa học 8","Lịch sử 8"],["📐","📖","⚡","🧪","🏛️"],"cap2"),
  9:  makeCoursesForGrade(9,  ["Toán 9","Ngữ văn 9","Vật lý 9","Hóa học 9","Sinh học 9","Tiếng Anh 9"],["📐","📖","⚡","🧪","🌱","🌍"],"cap2"),
  10: makeCoursesForGrade(10, ["Toán 10","Ngữ văn 10","Vật lý 10","Hóa học 10","Sinh học 10","Tiếng Anh 10","Lịch sử 10"],["📐","📖","⚡","🧪","🌱","🌍","🏛️"],"cap3"),
  11: makeCoursesForGrade(11, ["Toán 11","Ngữ văn 11","Vật lý 11","Hóa học 11","Lập trình 11","Tiếng Anh 11"],["📐","📖","⚡","🧪","💻","🌍"],"cap3"),
  12: makeCoursesForGrade(12, ["Toán 12","Ngữ văn 12","Vật lý 12","Hóa học 12","Sinh học 12","Tiếng Anh 12","Lập trình 12"],["📐","📖","⚡","🧪","🌱","🌍","💻"],"cap3"),
};

/* ─────────────────────────────────────────────
   COMPONENT: Grade Card
───────────────────────────────────────────── */
function GradeCard({ grade, levelBg, onClick, delay }) {
  const courses = COURSES_BY_GRADE[grade] || [];
  return (
    <div className="grade-card"  style={{ animationDelay: delay }}>
      <GearSVG className="gc gc-tl" /><GearSVG className="gc gc-tr" />
      <GearSVG className="gc gc-bl" /><GearSVG className="gc gc-br" />
      <div className="grade-num">{grade}</div>
      <div className="grade-label">Tháng {grade}</div>
      <div className="grade-count">{courses.length} môn học</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Course Card
───────────────────────────────────────────── */
function CourseCard({ course, onClick, delay }) {
  return (
    <div className="course-card" onClick={onClick} style={{ animationDelay: delay }}>
      <GearSVG className="gc gc-tl" /><GearSVG className="gc gc-tr" />
      <GearSVG className="gc gc-bl" /><GearSVG className="gc gc-br" />

      {/* Thumbnail */}
      <div className="course-thumb">
        <div className="course-thumb-inner" style={{ background: `linear-gradient(135deg,${course.color}22,${course.color}44)` }}>
          <span style={{ fontSize: "3.5rem" }}>{course.icon}</span>
        </div>
        <div className="thumb-overlay">
          <div className="play-circle">▶</div>
        </div>
        <div className="course-lessons-badge">📹 {course.lessons} bài</div>
        <div className="course-subject-badge" style={{ background: `${course.color}33`, color: course.color, border: `1px solid ${course.color}55` }}>
          {course.name.split(" ")[0]}
        </div>
      </div>

      {/* Body */}
      <div className="course-body">
        <div className="course-title">{course.name}</div>
        <div className="course-desc">{course.desc}</div>
        <div className="course-meta">
          <span>⏱ {course.duration}</span>
          <span>📹 {course.lessons} bài học</span>
          <span>🎯 Lớp {course.grade}</span>
        </div>
        <div className="course-prog-track">
          <div className="course-prog-fill" style={{ width: `${course.progress}%` }} />
        </div>
        <div className="course-prog-label">{course.progress}% hoàn thành</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Video Player View
───────────────────────────────────────────── */
function VideoView({ course, onBack }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = course.videos[activeIdx];

  return (
    <div className="video-section">
      {/* Course header */}
      <div className="video-course-header">
        <GearSVG className="gc gc-tl" /><GearSVG className="gc gc-tr" />
        <GearSVG className="gc gc-bl" /><GearSVG className="gc gc-br" />
        <div className="vch-icon" style={{ background: `linear-gradient(135deg,${course.color}33,${course.color}55)` }}>
          {course.icon}
        </div>
        <div className="vch-info">
          <h2>{course.name}</h2>
          <p>{course.desc}</p>
          <div className="vch-stats">
            <span className="vch-stat">📹 {course.lessons} bài học</span>
            <span className="vch-stat">⏱ {course.duration}</span>
            <span className="vch-stat">✅ {course.videos.filter(v=>v.completed).length} đã học</span>
            <span className="vch-stat">🎯 Lớp {course.grade}</span>
          </div>
        </div>
      </div>

      {/* Player + playlist */}
      <div className="video-layout">
        {/* Player */}
        <div className="player-panel">
          <GearSVG className="gc gc-tl" /><GearSVG className="gc gc-tr" />

          <div className="video-embed">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="video-placeholder" onClick={() => setPlaying(true)}>
                <div className="play-btn">▶</div>
                <p>Click để xem demo video</p>
                <p style={{ fontSize: ".7rem", opacity: .5 }}>{video.title}</p>
              </div>
            )}
          </div>

          <div className="player-info">
            <div className="player-title">{video.title}</div>
            <div className="player-desc">{video.desc}</div>
            <div className="player-actions">
              <button className="pa-btn" onClick={() => {
                setPlaying(false);
                if (activeIdx > 0) setActiveIdx(i => i - 1);
              }}>⬅ Bài trước</button>
              <button className="pa-btn" onClick={() => {
                setPlaying(false);
                if (activeIdx < course.videos.length - 1) setActiveIdx(i => i + 1);
              }}>Bài tiếp ➡</button>
              <button className="pa-btn-ghost" onClick={() => setPlaying(p => !p)}>
                {playing ? "⏸ Dừng" : "▶ Phát"}
              </button>
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="playlist-panel">
          <GearSVG className="gc gc-tl" /><GearSVG className="gc gc-tr" />
          <div className="playlist-header">
            📋 Danh sách bài học ({course.videos.length})
          </div>
          {course.videos.map((v, i) => (
            <div
              key={v.id}
              className={`playlist-item ${i === activeIdx ? "active" : ""} ${v.completed ? "completed" : ""}`}
              onClick={() => { setActiveIdx(i); setPlaying(false); }}
            >
              <div className="pi-num">
                {v.completed ? "✓" : i + 1}
              </div>
              <div className="pi-info">
                <div className="pi-title">{v.title}</div>
                <div className="pi-meta">
                  <span>📹 Video</span>
                  {v.completed && <span style={{ color: "#6ee47b" }}>✅ Đã học</span>}
                </div>
              </div>
              <div className="pi-dur">⏱ {v.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function LearningPage() {
  // view: "grades" | "courses" | "videos"
  const [view, setView] = useState("grades");
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterSubject, setFilterSubject] = useState("Tất cả");

  const currentLevel = selectedGrade
    ? LEVELS.find(l => l.grades.includes(selectedGrade))
    : null;

  const courses = selectedGrade ? (COURSES_BY_GRADE[selectedGrade] || []) : [];
  const subjects = ["Tất cả", ...new Set(courses.map(c => c.name.split(" ")[0]))];
  const filteredCourses = filterSubject === "Tất cả"
    ? courses
    : courses.filter(c => c.name.startsWith(filterSubject));

  const goToGrades = () => { setView("grades"); setSelectedGrade(null); setSelectedCourse(null); };
  const goToCourses = () => { setView("courses"); setSelectedCourse(null); };

  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">
        <div className="lp-wrap">

          {/* TOPBAR */}
          <div className="lp-topbar">
            <div className="lp-topbar-left">
              <span className="lp-logo">Whisker</span>
              <span className="lp-week-chip">📅 Tháng 4 · 2026</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {view === "courses" && (
                <button className="back-btn" onClick={goToGrades}>← Chọn lớp</button>
              )}
              {view === "videos" && (
                <>
                  <button className="back-btn" onClick={goToGrades}>← Chọn lớp</button>
                  <button className="back-btn" onClick={goToCourses}>← Khoá học</button>
                </>
              )}
            </div>
          </div>

          {/* ── VIEW 1: GRADE SELECTOR ── */}
          {view === "grades" && (
            <div className="grade-section">
              <div className="section-head">
                <h1>📚 Chọn Cấp Học</h1>
                <p>Chọn cấp và lớp học để bắt đầu hành trình tri thức của bạn</p>
              </div>

              {LEVELS.map((level, li) => (
                <div key={level.id} className="level-strip" style={{ animationDelay: `${li * 0.08}s` }}>
                  <div className="level-strip-header">
                    <div className="level-badge" style={{ background: level.bg }}>
                      {level.emoji}
                    </div>
                    <div>
                      <div className="level-title">{level.label}</div>
                      <div className="level-sub">{level.desc}</div>
                    </div>
                    <div className="level-line" />
                  </div>

                  <div className="grade-grid">
                    {level.grades.map((g, gi) => (
                      <GradeCard
                        key={g}
                        grade={g}
                        levelBg={level.bg}
                        delay={`${gi * 0.06}s`}
                        onClick={() => {
                          setSelectedGrade(g);
                          setFilterSubject("Tất cả");
                          setView("courses");
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── VIEW 2: COURSE LIST ── */}
          {view === "courses" && selectedGrade && (
            <div className="course-section">
              <div className="course-header-row">
                <div
                  className="course-header-icon"
                  style={{ background: currentLevel?.bg }}
                >
                  {currentLevel?.emoji}
                </div>
                <div className="course-header-info">
                  <h2>Khoá học Lớp {selectedGrade}</h2>
                  <p>{currentLevel?.label} · {courses.length} môn học · Chọn môn để bắt đầu học</p>
                </div>
              </div>

              {/* Subject filter */}
              <div className="subject-tabs">
                {subjects.map(s => (
                  <button
                    key={s}
                    className={`subject-tab ${filterSubject === s ? "active" : ""}`}
                    onClick={() => setFilterSubject(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="course-grid">
                {filteredCourses.map((course, i) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    delay={`${i * 0.07}s`}
                    onClick={() => {
                      setSelectedCourse(course);
                      setView("videos");
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── VIEW 3: VIDEO PLAYER ── */}
          {view === "videos" && selectedCourse && (
            <VideoView
              course={selectedCourse}
              onBack={goToCourses}
            />
          )}

        </div>
      </div>
    </>
  );
}