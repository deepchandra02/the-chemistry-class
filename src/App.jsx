import "./App.css";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// One elliptical orbit centred on the nucleus, drawn as two half-arcs so
// electrons can follow it with <animateMotion>.
const ORBIT = "M -80 0 A 80 28 0 1 1 80 0 A 80 28 0 1 1 -80 0";

const ORBITS = [
  { angle: 0, dur: 3.2, color: "var(--teal)" },
  { angle: 60, dur: 4.4, color: "var(--violet)" },
  { angle: 120, dur: 5.6, color: "var(--text-h)" },
];

function Atom() {
  return (
    <svg className="atom" viewBox="-100 -100 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="nucleus-fill" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ccfbf1" />
          <stop offset="55%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#a78bfa" />
        </radialGradient>
      </defs>
      {ORBITS.map(({ angle, dur, color }) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path className="orbit" d={ORBIT} />
          <circle
            className="electron"
            r="4"
            cx={reduceMotion ? 80 : 0}
            style={{ fill: color }}
          >
            {!reduceMotion && (
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                path={ORBIT}
              />
            )}
          </circle>
        </g>
      ))}
      <circle className="nucleus" r="11" fill="url(#nucleus-fill)" />
    </svg>
  );
}

// Erlenmeyer flask outline; also clips the solution inside it.
const FLASK =
  "M 52 118 L 52 132 L 30 161 Q 27 166 33 166 L 87 166 Q 93 166 90 161 L 68 132 L 68 118";

const BURETTE_TICKS = [16, 26, 36, 46, 56, 66, 76];

// A burette drips titrant into a swirling flask until the indicator hits its
// pink endpoint, then the cycle starts over.
function Titration() {
  return (
    <svg className="titration" viewBox="0 0 120 170" aria-hidden="true">
      <defs>
        <clipPath id="flask-inside">
          <path d={FLASK} />
        </clipPath>
      </defs>

      {/* Tilted around its tip, so drops still fall straight into the flask */}
      <g transform="rotate(12 60 102)">
        <rect className="titrant" x="56.5" y="10" width="7" height="76" rx="1" />
        <rect className="glass" x="54" y="4" width="12" height="84" rx="2" />
        {BURETTE_TICKS.map((y) => (
          <line key={y} className="glass" x1="54" x2="58" y1={y} y2={y} />
        ))}
        <rect className="glass" x="58.5" y="88" width="3" height="14" />
        <rect className="stopcock" x="51" y="91" width="18" height="4" rx="2" />
      </g>
      <circle className="drop" cx="60" cy="106" r="2" />

      <g className="flask">
        <g clipPath="url(#flask-inside)">
          <rect className="solution" x="20" y="146" width="80" height="24" />
          <ellipse className="ripple" cx="60" cy="146" rx="6" ry="1.5" />
        </g>
        <path className="glass" d={FLASK} />
      </g>
    </svg>
  );
}

// "Chemistry" can't be spelled from whole element symbols (no element is
// "M"/"Mi" or "R"/"Tr"/"Ry"), so each letter is the first letter of a real
// element's symbol and the rest of that symbol is faded.
const CHEMISTRY = [
  { symbol: "C", name: "Carbon", number: 6 },
  { symbol: "H", name: "Hydrogen", number: 1 },
  { symbol: "Eu", name: "Europium", number: 63 },
  { symbol: "Mg", name: "Magnesium", number: 12 },
  { symbol: "I", name: "Iodine", number: 53 },
  { symbol: "S", name: "Sulfur", number: 16 },
  { symbol: "Ti", name: "Titanium", number: 22 },
  { symbol: "Ra", name: "Radium", number: 88 },
  { symbol: "Y", name: "Yttrium", number: 39 },
];

function Element({ symbol, name, number, index }) {
  return (
    <span className="element" style={{ "--i": index }}>
      <span className="number">{number}</span>
      <span className="symbol">
        {symbol[0]}
        {symbol.length > 1 && <span className="faded">{symbol.slice(1)}</span>}
      </span>
      <span className="name">{name}</span>
    </span>
  );
}

function App() {
  return (
    <main className="landing">
      <section className="hero">
        <Atom />
        <span className="badge">
          Coming soon
        </span>
        <h1>
          <span className="sr-only">The Chemistry Class</span>
          <span className="title" aria-hidden="true">
            <span>The</span>
            <span className="chemistry">
              {CHEMISTRY.map((element, i) => (
                <Element key={element.symbol} {...element} index={i} />
              ))}
            </span>
            <span>Class</span>
          </span>
        </h1>
        <p>
          Something new is brewing
        </p>
        <Titration />
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} The Chemistry Class
      </footer>
    </main>
  );
}

export default App;
