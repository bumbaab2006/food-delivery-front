export default function RedAddIcon({ className, onClick }) {
  return (
    <svg
      onClick={onClick} // ← ⚡ CLICK энд ажиллана!
      className={`cursor-pointer ${className}`}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
        fill="#EF4444"
      />
      <path
        d="M19.9987 15.3334V24.6667M15.332 20H24.6654"
        stroke="#FAFAFA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
