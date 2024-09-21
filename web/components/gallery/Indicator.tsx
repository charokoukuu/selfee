// components/Indicator.tsx
type IndicatorProps = {
  activeIndex: number;
  totalSlides: number;
};

const Indicator: React.FC<IndicatorProps> = ({ activeIndex, totalSlides }) => {
  return (
    <div className="absolute bottom-2 left-1/2 z-50 mt-3 flex -translate-x-1/2 -translate-y-1/2 justify-center space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={`h-3 w-3 rounded-full transition-colors ${
            activeIndex === index ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  );
};

export default Indicator;
