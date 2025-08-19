import React, { useState } from "react";

interface PopOverProps {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  url?: string;
  message: string;
  children: React.ReactNode;
}
const PopOver: React.FC<PopOverProps> = ({
  top,
  left,
  right,
  bottom,
  url,
  message,
  children,
}) => {
  const [PopOver, setPopOver] = useState(false);

  return (
    <div
      onMouseEnter={() => setPopOver(true)}
      onMouseLeave={() => setPopOver(false)}
      className="relative flex items-center">
      {children}
      {PopOver && (
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

export default PopOver;
