"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

type ModalProps = {
  children: React.ReactNode;
};

type OpenProps = {
  children: React.ReactNode;
  opens: string;
  additionalFn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type WindowProps = {
  children: React.ReactNode;
  name: string;
  version?: string;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => {
    setOpenName("");
  };
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens, additionalFn }: OpenProps) {
  const { open } = useContext(ModalContext)!;
  return cloneElement(children as React.ReactElement, {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      open(opens);
      if (additionalFn) {
        additionalFn(e);
      }
    },
  });
}

function Window({ children, name, version }: WindowProps) {
  const { openName, close } = useContext(ModalContext)!;

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 h-full w-full z-[1000]">
      <div className="h-full w-full bg-black opacity-20" onClick={close}></div>
      <motion.div
        className={clsx(
          "fixed top-1/2 left-1/2 bg-white -translate-y-1/2 -translate-x-1/2 z-[51] rounded-lg p-6 w-[90vw]  max-h-[90vh] overflow-y-auto",
          version === "second"
            ? "max-w-[550px]"
            : version === "forQuiz"
            ? "max-w-5xl"
            : "max-w-[650px]"
        )}
        animate={{ translateY: "-50%", translateX: "-50%", opacity: 1 }}
        initial={{ translateY: "-40%", translateX: "-50%", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        {cloneElement(children as React.ReactElement, {
          onCloseModal: close,
        })}
      </motion.div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
