export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="20" width="32" height="8" rx="2" fill="#4B7FFF"/>
      <rect x="0" y="11" width="22" height="8" rx="2" fill="#4B7FFF" opacity="0.72"/>
      <rect x="0" y="2"  width="13" height="8" rx="2" fill="#4B7FFF" opacity="0.44"/>
    </svg>
  )
}
