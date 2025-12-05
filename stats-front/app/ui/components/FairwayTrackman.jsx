export default function FairwayTrackman({ children }) {
  return (
    <svg
      viewBox="0 0 400 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <rect width="400" height="700" fill="#1a3324" />

      <path
        d="
          M 200 680
          C 260 620, 310 520, 300 420
          C 290 330, 260 250, 200 200
          C 140 250, 110 330, 100 420
          C 90 520, 140 620, 200 680
          Z
        "
        fill="#234c31"
      />

      <path
        d="
          M 200 650
          C 245 590, 275 500, 265 420
          C 255 330, 235 260, 200 230
          C 165 260, 145 330, 135 420
          C 125 500, 155 590, 200 650
          Z
        "
        fill="#3fa85b"
      />

      <path
        d="
          M 200 610
          C 230 560, 250 480, 245 420
          C 240 350, 225 290, 200 265
          C 175 290, 160 350, 155 420
          C 150 480, 170 560, 200 610
          Z
        "
        fill="#4fcf74"
      />

      <ellipse
        cx="200"
        cy="120"
        rx="70"
        ry="35"
        fill="#3da96a"
        stroke="#2a7e4f"
        strokeWidth="3"
      />

      <ellipse
        cx="130"
        cy="130"
        rx="32"
        ry="18"
        fill="#e6dfc8"
        opacity="0.8"
      />

      <line
        x1="200"
        y1="660"
        x2="200"
        y2="120"
        stroke="#ffffff"
        strokeWidth="3"
        strokeDasharray="14 10"
        opacity="0.45"
      />

      {children}
    </svg>
  );
}
