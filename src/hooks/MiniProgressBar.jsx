import { motion } from "framer-motion";

const SEGMENTS = 5;
const FULL_ANGLE = 220; 
const ARC_START_ANGLE = 90; 
const gapDeg = 7; 
const radius = 130; 
const strokeWidth = 25;
const center = 140; 
 
const smallArc = 36;
const bigArc = 81;
const segmentSizes = [smallArc, smallArc, bigArc, smallArc, smallArc];

const MiniProgressBar = ({ value }) => {
  const segmentStarts = segmentSizes.reduce((acc, size, i) => {
    if (i === 0) acc.push(ARC_START_ANGLE);
    else acc.push(acc[i - 1] + segmentSizes[i - 1] + gapDeg);
    return acc;
  }, []);

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const getLabel = (val) => {
    if (val >= 90) return "Excellent";
    if (val >= 75) return "Good";
    if (val >= 50) return "Average";
    return "Poor";
  };

  const getPathLength = (startAngle, endAngle) => {
    const angle = endAngle - startAngle;
    return (Math.PI * radius * angle) / 180;
  };

  const generateArcs = () => {
    const totalSegmentDegrees = segmentSizes.reduce((a, b) => a + b, 0);
    const totalPercent = 100;

    const segmentPercents = segmentSizes.map(
      (size) => (size / totalSegmentDegrees) * totalPercent
    );

    let backgroundArcs = [];
    let progressArcs = [];

    let firstFilledIndex = -1;
    let lastFilledIndex = -1;

    for (let i = 0; i < SEGMENTS; i++) {
      const segmentStartPercent = segmentPercents
        .slice(0, i)
        .reduce((a, b) => a + b, 0);
      const segmentEndPercent = segmentStartPercent + segmentPercents[i];

      if (
        value >= segmentEndPercent ||
        (value > segmentStartPercent && value < segmentEndPercent)
      ) {
        if (firstFilledIndex === -1) firstFilledIndex = i;
        lastFilledIndex = i;
      }
    }

    for (let i = 0; i < SEGMENTS; i++) {
      const startAngle = segmentStarts[i];
      const endAngle = startAngle + segmentSizes[i];

      const start = polarToCartesian(center, center, radius, endAngle);
      const end = polarToCartesian(center, center, radius, startAngle);

      const totalPathLength = getPathLength(startAngle, endAngle);

      let bgStrokeLinecap = "butt";
      if (i === 0) bgStrokeLinecap = "round";
      else if (i === SEGMENTS - 1) bgStrokeLinecap = "round"; 

      backgroundArcs.push(
        <path
          key={`bg-${i}`}
          d={`M ${end.x} ${end.y} A ${radius} ${radius} 0 0 1 ${start.x} ${start.y}`}
          stroke="#e5e7eb"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap={bgStrokeLinecap}
        />
      );

      const segmentStartPercent = segmentPercents
        .slice(0, i)
        .reduce((a, b) => a + b, 0);
      const segmentEndPercent = segmentStartPercent + segmentPercents[i];

      let fillRatio = 0;
      if (value >= segmentEndPercent) fillRatio = 1;
      else if (value > segmentStartPercent)
        fillRatio = (value - segmentStartPercent) / segmentPercents[i];

      if (fillRatio > 0) {
        let strokeLinecap = "butt";
        if (i === firstFilledIndex) strokeLinecap = "round"; 
        if (i === lastFilledIndex) strokeLinecap = "round";

        progressArcs.push(
          <motion.path
            key={`fg-${i}`}
            d={`M ${end.x} ${end.y} A ${radius} ${radius} 0 0 1 ${start.x} ${start.y}`}
            stroke="#22c55e"
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={totalPathLength}
            strokeDashoffset={(1 - fillRatio) * totalPathLength}
            initial={{ strokeDashoffset: totalPathLength }}
            animate={{ strokeDashoffset: (1 - fillRatio) * totalPathLength }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        );
      }
    }

    return [...backgroundArcs, ...progressArcs];
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      <div>
        <svg
          className="rounded-full h-[200px] md:h-[400px] sm:h-[250px] w-[200px] md:w-[400px] sm:w-[250px] rotate-[54deg]"
          viewBox="-5 0 290 280"
        >
          {generateArcs()}
        </svg>

        <div className="md:-mt-68 sm:-mt-45 -mt-36">
          <div className="text-center">
            <span className="w-fit font-semibold bg-green-100 text-green-600 md:text-[16px] text-xs sm:text-sm px-4 py-0.5 rounded-full">
              {getLabel(value)}
            </span>
            <div className="md:text-6xl text-4xl sm:text-5xl font-bold text-primary mt-2 md:mt-4">
              {value}
            </div>

            <div className="w-full mt-8 sm:mt-12 md:mt-20 flex justify-between text-gray-600 text-sm md:text-xl font-semibold">
              <span>0</span>
              <span className="md:-mr-2 -mr-3 sm:-mr-5">100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProgressBar;
