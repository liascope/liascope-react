'use client';
import { useState } from "react";
import { useAstroForm } from "./context/AstroContext";
import Okay from "./navicons/Okay";
import Saved from "./navicons/Saved";

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
    <> {status === "idle" && (
        <Saved stroke="#4fa091" fill="none" onClick={handleSave}/>)}
      {status === "saved" && (
        <Saved stroke="#4fa091" fill="#4fa091"/>
      )}
       {status === "already" && (
        <div className="w-fit h-fit flex flex-row item-center justify-center text-xs text-[#4fa091]"><span className="sm:w-20">
  Already Saved </span><Okay/>
</div>
      )}
      {status === "limit" && (
        <span className="text-[#ca400d] text-xs ml-2">Storage full!</span>
      )}
    </>
  );
}
