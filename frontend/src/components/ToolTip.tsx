import React, { useState } from "react";

interface ToolTipProps {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  message: string;
  children: React.ReactNode;
}
const ToolTip: React.FC<ToolTipProps> = ({
  top,
  left,
  right,
  bottom,
  message,
  children,
}) => {
  const [toolTip, setToolTip] = useState(false);

  return (
    <div
      onMouseEnter={() => setToolTip(true)}
      onMouseLeave={() => setToolTip(false)}
      className="relative flex items-center">
      {children}
      {toolTip && (
        <span
          className="absolute border border-white bg-gray-900 text-white text-sm px-2 py-1 whitespace-nowrap"
          style={{
            right: right,
            top: top,
            left: left,
            bottom: bottom,
          }}>
          {message}
        </span>
      )}
    </div>
  );
};

export default ToolTip;
