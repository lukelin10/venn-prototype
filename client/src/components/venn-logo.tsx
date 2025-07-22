interface VennLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function VennLogo({ size = "md", className = "" }: VennLogoProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Venn Diagram Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          {/* Left circle */}
          <circle
            cx="9"
            cy="12"
            r="6"
            stroke="#8B5CF6"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          {/* Right circle */}
          <circle
            cx="15"
            cy="12"
            r="6"
            stroke="#8B5CF6"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          {/* Intersection highlight */}
          <path
            d="M12 7.5C13.5 9 13.5 15 12 16.5C10.5 15 10.5 9 12 7.5Z"
            fill="#8B5CF6"
            opacity="0.3"
          />
        </svg>
      </div>
      
      {/* Text */}
      <span className={`font-bold text-black ${textSizeClasses[size]}`}>
        Venn.ai
      </span>
    </div>
  );
}