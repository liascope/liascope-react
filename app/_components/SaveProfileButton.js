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
    <> {status === "idle" && (
         <svg  className="w-7 h-9"
          onClick={handleSave}
          title="Save Chart"  viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#4fa091" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
     <polyline points="7,3 7,50 27,30 47,50 47,3 7,3"></polyline>
  </g>
</svg>)}
      {status === "saved" && (
        <svg className="w-7 h-9 " viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#4fa091" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#4fa091">
     <polyline points="7,3 7,50 27,30 47,50 47,3 7,3"></polyline>
  </g>
</svg>
      )}
       {status === "already" && (
        <div className="w-fit h-fit flex flex-row item-center justify-center text-xs text-[#4fa091]"><span className="sm:w-20">
  Already Saved </span><svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-4 h-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
</svg>

</div>
      )}
      {status === "limit" && (
        <span className="text-[#ca400d] text-xs ml-2">Storage full!</span>
      )}
    </>
  );
}
