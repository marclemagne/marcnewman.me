export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <picture>
        {/* Landscape for larger screens (768px and up) */}
        <source
          media="(min-width: 768px)"
          srcSet="
            /bg-landscape-sm.jpg 640w,
            /bg-landscape-md.jpg 1920w,
            /bg-landscape-lg.jpg 2400w
          "
          sizes="100vw"
        />

        {/* Portrait for mobile (below 768px) */}
        <source
          media="(max-width: 767px)"
          srcSet="
            /bg-portrait-sm.jpg 640w,
            /bg-portrait-md.jpg 1920w,
            /bg-portrait-lg.jpg 2400w
          "
          sizes="100vw"
        />

        {/* Fallback image */}
        <img
          src="/bg-landscape-md.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </picture>
    </div>
  );
}
