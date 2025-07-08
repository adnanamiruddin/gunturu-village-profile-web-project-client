import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { useState } from "react";

export default function Dropdown({ title, showBorderTop, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${showBorderTop ? "border-t-[1.5px] border-gray-300" : ""}`}
    >
      <div
        className={`${
          showBorderTop ? "pt-3" : ""
        } flex justify-between items-center gap-6`}
      >
        <h3
          className={`w-[90%] text-base text-start ${
            isOpen ? "font-semibold" : "font-normal"
          }`}
        >
          {title}
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-4 flex flex-col gap-3">{children}</div>
      ) : null}
    </div>
  );
}
