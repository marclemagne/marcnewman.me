export default function SocialLinkedIn() {
  return (
    <a
      aria-label="Marc Newman's LinkedIn profile"
      className="text-grey-500 group inline-flex items-center gap-2 hover:bg-linear-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text hover:text-transparent dark:text-white"
      href="https://www.linkedin.com/in/~marc-newman"
    >
      <svg
        aria-hidden="true"
        className="transition-colors"
        height="24"
        role="presentation"
        viewBox="0 0 72 72"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hover-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {/* cyan-500 */}
            <stop offset="0%" stopColor="#06b6d4" />
            {/* purple-500 */}
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path
            d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
            className="fill-[#007EBB] transition-colors group-hover:fill-[url(#hover-gradient)]"
          />
          <path
            d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
            fill="#FFF"
          />
        </g>
      </svg>
      <span className="text-lg md:text-2xl">~marc-newman</span>
    </a>
  );
}
