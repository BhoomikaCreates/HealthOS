import React, { useState, useEffect } from "react";
import "./WorkoutTracker.css";
import Lottie from "lottie-react";
import runningAnim from "../../assets/lottie/running.json";
import walkingAnim from "../../assets/lottie/walking.json";
import swimmingAnim from "../../assets/lottie/swimming.json";
import cardioAnim from "../../assets/lottie/cardio.json";
import weightAnim from "../../assets/lottie/lifting.json";

const CATEGORIES = [
  {
    id: "running",
    label: "Running",
    emoji: "🏃",
    color: "#00f5d4",
    colorDim: "rgba(0,245,212,0.12)",
    border: "rgba(0,245,212,0.3)",
    desc: "Track distance, pace & calories",
    lottieData: runningAnim, // ✅ updated
    fields: [
      { key: "distance", label: "Distance (km)", type: "number", placeholder: "e.g. 5.2", icon: "📍" },
      { key: "duration", label: "Duration (min)", type: "number", placeholder: "e.g. 30", icon: "⏱" },
      { key: "pace", label: "Avg Pace (min/km)", type: "text", placeholder: "e.g. 5:45", icon: "💨" },
      { key: "calories", label: "Calories Burned", type: "number", placeholder: "e.g. 320", icon: "🔥" },
    ],
    stats: [
      { label: "Best Pace", value: "5:12 /km" },
      { label: "Total Distance", value: "42.3 km" },
      { label: "Sessions", value: "9" },
    ],
  },
  {
    id: "walking",
    label: "Walking",
    emoji: "🚶",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.3)",
    desc: "Steps, distance & active minutes",
    lottieData: walkingAnim, // ✅ updated
    fields: [
      { key: "steps", label: "Steps", type: "number", placeholder: "e.g. 8000", icon: "👟" },
      { key: "distance", label: "Distance (km)", type: "number", placeholder: "e.g. 6.0", icon: "📍" },
      { key: "duration", label: "Duration (min)", type: "number", placeholder: "e.g. 60", icon: "⏱" },
      { key: "calories", label: "Calories Burned", type: "number", placeholder: "e.g. 180", icon: "🔥" },
    ],
    stats: [
      { label: "Avg Steps/Day", value: "7,240" },
      { label: "Total Distance", value: "58.1 km" },
      { label: "Sessions", value: "14" },
    ],
  },
  {
    id: "swimming",
    label: "Swimming",
    emoji: "🏊",
    color: "#38bdf8",
    colorDim: "rgba(56,189,248,0.12)",
    border: "rgba(56,189,248,0.3)",
    desc: "Laps, strokes & endurance",
    lottieData: swimmingAnim, // ✅ updated
    fields: [
      { key: "laps", label: "Laps", type: "number", placeholder: "e.g. 20", icon: "🔄" },
      { key: "distance", label: "Distance (m)", type: "number", placeholder: "e.g. 1000", icon: "📍" },
      { key: "duration", label: "Duration (min)", type: "number", placeholder: "e.g. 40", icon: "⏱" },
      { key: "stroke", label: "Stroke Style", type: "text", placeholder: "e.g. Freestyle", icon: "🏊" },
    ],
    stats: [
      { label: "Best Lap", value: "1:12 /lap" },
      { label: "Total Distance", value: "12.4 km" },
      { label: "Sessions", value: "6" },
    ],
  },
  {
    id: "cardio",
    label: "Cardio",
    emoji: "❤️",
    color: "#fb7185",
    colorDim: "rgba(251,113,133,0.12)",
    border: "rgba(251,113,133,0.3)",
    desc: "Heart rate, intervals & endurance",
    lottieData: cardioAnim, // ✅ updated
    fields: [
      { key: "type", label: "Cardio Type", type: "text", placeholder: "e.g. HIIT, Cycling", icon: "⚡" },
      { key: "duration", label: "Duration (min)", type: "number", placeholder: "e.g. 25", icon: "⏱" },
      { key: "heartRate", label: "Avg Heart Rate (bpm)", type: "number", placeholder: "e.g. 145", icon: "💓" },
      { key: "calories", label: "Calories Burned", type: "number", placeholder: "e.g. 400", icon: "🔥" },
    ],
    stats: [
      { label: "Max HR", value: "178 bpm" },
      { label: "Avg Duration", value: "28 min" },
      { label: "Sessions", value: "11" },
    ],
  },
  {
    id: "weightlifting",
    label: "Weightlifting",
    emoji: "🏋️",
    color: "#8aec55",
    colorDim: "rgba(106, 210, 50, 0.25)",
    border: "rgba(7, 175, 38, 0.3)",
    desc: "Sets, reps, weight & volume",
    lottieData: weightAnim, // ✅ updated
    fields: [
      { key: "exercise", label: "Exercise", type: "text", placeholder: "e.g. Bench Press", icon: "💪" },
      { key: "sets", label: "Sets", type: "number", placeholder: "e.g. 4", icon: "🔢" },
      { key: "reps", label: "Reps per Set", type: "number", placeholder: "e.g. 10", icon: "🔁" },
      { key: "weight", label: "Weight (kg)", type: "number", placeholder: "e.g. 80", icon: "⚖️" },
    ],
    stats: [
      { label: "Max Lift", value: "120 kg" },
      { label: "Total Volume", value: "4,800 kg" },
      { label: "Sessions", value: "18" },
    ],
  },
];

// ✅ LottiePlaceholder replaced with real Lottie component
const LottiePlaceholder = ({ lottieData, isHovered }) => (
  <Lottie
    animationData={lottieData}
    loop={isHovered}
    autoplay={isHovered}
    style={{ width: '100%', height: '100%' }}
  />
);

// ============================================================
// CATEGORY CARD
// ============================================================
const CategoryCard = ({ cat, onClick, isSelected }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`category-card ${isSelected ? "selected" : ""}`}
      style={{
        background: hovered || isSelected
          ? `linear-gradient(135deg, ${cat.colorDim}, rgba(11,14,20,0.9))`
          : "rgba(15,21,36,0.6)",
        borderColor: hovered || isSelected ? cat.border : "rgba(255,255,255,0.06)",
        boxShadow: isSelected ? `0 0 30px ${cat.color}22, inset 0 0 20px ${cat.color}08` : "none",
      }}
      onClick={() => onClick(cat)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ✅ Updated: passes lottieData instead of emoji/color */}
      <div className="card-lottie-area">
        <LottiePlaceholder lottieData={cat.lottieData} isHovered={hovered || isSelected} />
      </div>

      <div className="card-text">
        <h3 className="card-title" style={{ color: hovered || isSelected ? cat.color : "#e2e8f0" }}>
          {cat.label}
        </h3>
        <p className="card-desc">{cat.desc}</p>
        <div className="card-stats">
          {cat.stats.map((s) => (
            <div key={s.label} className="card-stat">
              <span className="stat-val" style={{ color: cat.color }}>{s.value}</span>
              <span className="stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="card-arrow"
        style={{ color: hovered || isSelected ? cat.color : "#374151" }}
      >
        {isSelected ? "✓" : "→"}
      </div>
    </div>
  );
};

// ============================================================
// DETAIL PANEL
// ============================================================
const DetailPanel = ({ cat, onClose }) => {
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleChange = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    if (Object.keys(form).length === 0) return;
    const entry = { ...form, date: new Date().toLocaleDateString("en-IN"), id: Date.now() };
    setLogs((p) => [entry, ...p]);
    setForm({});
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="detail-panel" style={{ borderColor: cat.border }}>
      <div className="detail-header" style={{ borderBottomColor: `${cat.color}22` }}>
        <div className="detail-title-row">
          <span className="detail-emoji">{cat.emoji}</span>
          <div>
            <h2 className="detail-title" style={{ color: cat.color }}>{cat.label} Tracker</h2>
            <p className="detail-subtitle">{cat.desc}</p>
          </div>
        </div>
        <button className="detail-close" onClick={onClose}>✕</button>
      </div>

      <div className="detail-body">
        <div className="log-form-section">
          <h4 className="section-heading" style={{ color: cat.color }}>Log Session</h4>
          <div className="log-form-grid">
            {cat.fields.map((f) => (
              <div key={f.key} className="form-field">
                <label className="field-label">
                  <span>{f.icon}</span> {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key] || ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  className="field-input"
                  style={{ "--accent": cat.color }}
                />
              </div>
            ))}
          </div>
          <button
            className={`save-btn ${saved ? "saved" : ""}`}
            style={{
              background: saved ? "rgba(34,197,94,0.2)" : `linear-gradient(135deg, ${cat.color}33, ${cat.color}11)`,
              borderColor: saved ? "#22c55e" : cat.color,
              color: saved ? "#22c55e" : cat.color,
            }}
            onClick={handleSave}
          >
            {saved ? "✓ Saved!" : "Log Session"}
          </button>
        </div>

        {logs.length > 0 && (
          <div className="logs-section">
            <h4 className="section-heading" style={{ color: cat.color }}>Recent Sessions</h4>
            <div className="logs-list">
              {logs.map((log) => (
                <div key={log.id} className="log-entry" style={{ borderLeftColor: cat.color }}>
                  <span className="log-date">{log.date}</span>
                  <div className="log-values">
                    {Object.entries(log)
                      .filter(([k]) => k !== "date" && k !== "id")
                      .map(([k, v]) => (
                        <span key={k} className="log-chip" style={{ background: `${cat.color}15`, color: cat.color }}>
                          {k}: <strong>{v}</strong>
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="stats-section">
          <h4 className="section-heading" style={{ color: cat.color }}>All-Time Stats</h4>
          <div className="stats-grid">
            {cat.stats.map((s) => (
              <div key={s.label} className="stat-card" style={{ borderColor: `${cat.color}22` }}>
                <span className="stat-card-val" style={{ color: cat.color }}>{s.value}</span>
                <span className="stat-card-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const WorkoutTracker = () => {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const handleSelect = (cat) => {
    if (selected?.id === cat.id) {
      setSelected(null);
    } else {
      setSelected(cat);
    }
  };

  return (
    <div className={`workout-tracker ${visible ? "visible" : ""}`}>
      <div className="tracker-header">
        <div>
          <h1 className="tracker-title">Workout Tracker</h1>
          <p className="tracker-subtitle">Choose a category and log your session</p>
        </div>
        <div className="tracker-badge">
          <span className="badge-dot"></span>
          Active
        </div>
      </div>

      <div className={`tracker-layout ${selected ? "split" : ""}`}>
        <div className="categories-panel">
          <p className="panel-label">Workout Categories</p>
          <div className="categories-list">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                onClick={handleSelect}
                isSelected={selected?.id === cat.id}
              />
            ))}
          </div>
        </div>

        {selected && (
          <DetailPanel cat={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
};

export default WorkoutTracker;
