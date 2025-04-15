"use client";

import React from "react";
import Modal from "./ui/Modal";

export default function Important() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="draus">
          <button>Kliknij po ważną wiadomość</button>
        </Modal.Open>

        <Modal.Window name="draus">
          <h2 className="text-lg">Draus byłby z cb dumny</h2>
        </Modal.Window>
      </Modal>
    </div>
  );
}
