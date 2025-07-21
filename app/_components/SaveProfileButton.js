'use client';
import { useState } from "react";
import { useAstroForm } from "./context/AstroContext";

export default function SaveProfileButton() {
  const { formState } = useAstroForm();
  const [status, setStatus] = useState("idle");

  function handleSave() {
    if (!formState) return;

    const newProfileId = `${formState.user}-${formState.birthDate}-${formState.birthTime}`;
    const newProfile = {
      id: newProfileId,
      formState,
      savedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('liascope-profiles') || "[]");
    const existingIndex = existing.findIndex(profile => profile.id === newProfileId);

    if (existing.length >= 5 && existingIndex === -1) {
      setStatus("limit");
      return;
    }

    if (existingIndex !== -1) {
      const existingProfile = existing[existingIndex];
      if (JSON.stringify(existingProfile.formState) === JSON.stringify(formState)) {
        setStatus("already");
        return;
      } else {
        existing[existingIndex] = newProfile;
        localStorage.setItem('liascope-profiles', JSON.stringify(existing));
        setStatus("saved");
        return;
      }
    }

    // save new profile
    existing.push(newProfile);
    localStorage.setItem('liascope-profiles', JSON.stringify(existing));
    setStatus("saved");
  }

  return (
    <>
      {status === "idle" && (

        <button
          className="text-2xl hover:text-[#e89b53]"
          onClick={handleSave}
          title="Save Chart"
        >
          ⎙
        </button>
        
      )}
      {status === "saved" && (
        <span className="text-[#607f6a] text-sm ml-2">✔ Saved</span>
      )}
      {status === "already" && (
        <span className="text-gray-500 text-xs ml-2">Already saved</span>
      )}
      {status === "limit" && (
        <span className="text-[#ca400d] text-xs ml-2">Storage full</span>
      )}
    </>
  );
}
