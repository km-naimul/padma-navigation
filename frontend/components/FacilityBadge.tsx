interface FacilityBadgeProps {
  facility: string;
  variant?: 'default' | 'small';
}

const FacilityBadge = ({ facility, variant = 'default' }: FacilityBadgeProps) => {
  const sizeClasses = variant === 'small' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1';
  
  return (
    <span
      className={`inline-flex items-center ${sizeClasses} rounded-full bg-[#d4af37]/20 text-[#b8941d] font-semibold border border-[#d4af37]/30`}
    >
      {facility}
    </span>
  );
};

export default FacilityBadge;
