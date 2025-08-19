import React, { useState } from "react";

interface ToolTipProps {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  url?: string;
  message: string;
  children: React.ReactNode;
}
const ToolTip: React.FC<ToolTipProps> = ({
  top,
  left,
  right,
  bottom,
  url,
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
          className="absolute border border-white bg-gray-900 text-white text-sm px-2 py-1 w-50 sm:w-105"
          style={{
            right: right,
            top: top,
            left: left,
            bottom: bottom,
          }}>
          <p>
            {message}{" "}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline cursor-pointer hover:text-blue-400 active:text-blue-600 whitespace-nowrap">
                see code instead
              </a>
            )}
          </p>
        </span>
      )}
    </div>
  );
};

export default ToolTip;
