type LoaderProps = {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
};

export default function Loader({
  text = 'Loading...',
  size = 'md',
  className = '',
}: LoaderProps) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[#565959] ${className}`}>
      <span
        className={`inline-block animate-spin rounded-full border border-solid border-[#d5d9d9] border-t-[#007185] ${sizeMap[size]}`}
        aria-label="Loading"
        role="status"
      />
      {text && <span className="text-sm font-medium">{text}</span>}
    </div>
  );
}
