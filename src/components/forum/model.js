import React from "react";

export default function Modal({ isOpen, onClose, children, width, top }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`relative rounded-lg ${width}`} >
        <button
          onClick={onClose}
          className={`absolute ${top} right-6 text-4xl text-gray-600`}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
