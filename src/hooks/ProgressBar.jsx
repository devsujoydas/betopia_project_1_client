/* eslint-disable prefer-const */
import { motion } from "framer-motion";

const SEGMENTS = 5;
const FULL_ANGLE = 210;  // 3/4 circle
const ARC_START_ANGLE = 90; // Start at 90 deg for perfect horizontal baseline
const gapDeg = 8; // gap between segments
const radius = 130; // bigger radius for bigger arc
const strokeWidth = 20;
const center = 140; // center moved a bit down to fit arc properly

// Calculate total gap degrees
const totalGapDeg = gapDeg * (SEGMENTS - 1);
// Total arc degrees available after gaps
const totalArcDeg = FULL_ANGLE - totalGapDeg;

// Segment sizes adjusted proportionally to fill totalArcDeg
const smallArc = 36;
const bigArc = 81;
const segmentSizes = [smallArc, smallArc, bigArc, smallArc, smallArc];

const ProgressBar = ({ value }) => {
  // Calculate starting angle of each segment
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
      const segmentStartPercent = segmentPercents.slice(0, i).reduce((a, b) => a + b, 0);
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

      const isFirstSegment = i === 0;
      const isLastSegment = i === SEGMENTS - 1;

      // Background arcs with rounded caps only on first segment start and last segment end
      backgroundArcs.push(
        <path
          key={`bg-${i}`}
          d={`M ${end.x} ${end.y} A ${radius} ${radius} 0 0 1 ${start.x} ${start.y}`}
          stroke="#e5e7eb"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap={
            isFirstSegment
              ? "round"
              : isLastSegment
                ? "round"
                : "butt"
          }
        />
      );

      const segmentStartPercent = segmentPercents.slice(0, i).reduce((a, b) => a + b, 0);
      const segmentEndPercent = segmentStartPercent + segmentPercents[i];

      let fillRatio = 0;
      if (value >= segmentEndPercent) fillRatio = 1;
      else if (value > segmentStartPercent)
        fillRatio = (value - segmentStartPercent) / segmentPercents[i];

      if (fillRatio > 0) {
        const isFirstFilled = i === firstFilledIndex;
        const isLastFilled = i === lastFilledIndex;

        const strokeLinecap =
          isFirstFilled || isLastFilled ? "round" : "butt";

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
    <div className="flex flex-col items-center  w-full relative">
      <div className=" ">
        <div className="-mr-10 "> 
            <svg className="border rotate-[58deg]" width="360" height="480" viewBox="0 0 280 200">
              {generateArcs()}
            </svg> 
        </div>

        <div className=" -mt-55 -ml-8 ">
          <div className=" text-center">
            <span className="w-fit bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
              {getLabel(value)}
            </span>
            <div className="text-4xl font-bold text-primary mt-2">{value}</div>

            <div className="w-full mt-15 flex justify-between text-gray-600 text-lg font-medium px-2">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
