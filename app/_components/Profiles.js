'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAstroForm } from '../_lib/context/AstroContext';
import Button from './Button';
import Loader from './Loader';
import Trash from './navicons/Trash';

export function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setFormState } = useAstroForm();
  const router = useRouter();

  // Load profiles from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('liascope-profiles');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfiles(parsed);
      }
    } catch (err) {
      console.error('Failed to load profiles', err);
      setError('Could not load profiles');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete profile
  const deleteProfile = (id) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    localStorage.setItem('liascope-profiles', JSON.stringify(updated));
  };

  // Load profile and navigate
  const loadProfile = useCallback(
    (profile) => {
      if (!profile) return;
      setFormState(profile.formState);
      router.push('/charts/natal');
    },
    [setFormState, router]
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
        <Button type="btnBack" />
      </div>
    );

  return (
    <div className="flex flex-col w-full min-h-screen mt-7">
      <h2 className="sm:tracking-wide text-md sm:text-2xl sm:mx-[4rem] text-center text-[#e89b53]">
        Saved Charts || you can save up to 5 charts.
      </h2>
  <div className="left-[25%] w-fit relative mt-10">
  <p>{profiles.length === 0 ? "No charts saved." : ""} <Button type="btnBack" /></p>
</div>
      <div className="flex w-full h-fit items-center flex-col">
        {profiles.map((profile) => {
  const { user, birthDate, birthTime, birthPlaceData, transitDate, transitTime, transitPlaceData } = profile.formState || {};
  return (
    <div
      key={profile.id}
      onClick={() => loadProfile(profile)}
      className="p-4 flex sm:items-center items-end justify-between w-[90%] sm:w-[70%] bg-[rgb(230,193,85,0.8)] btnGreen cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row sm:gap-7 gap-1 w-full text-xs sm:text-base">
        <span>Saved <strong>Natal:</strong></span>
        <span className="flex-1 border-e border-gray-300">
          {user}, {birthDate}, {birthTime}, {birthPlaceData?.city?.split(',')[0]}
        </span>
        <span>Saved <strong>Transit:</strong></span>
        <span className="flex-1">
          {transitDate}, {transitTime}, {transitPlaceData?.city?.split(',')[0]}
        </span>
      </div>
      <Trash onClick={(e) => { e.stopPropagation(); deleteProfile(profile.id); }} />
    </div> ); })}
      </div>
    </div>
  );
}
