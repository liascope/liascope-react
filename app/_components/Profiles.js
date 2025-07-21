'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAstroForm } from './context/AstroContext';
import Button from './Button';

export function Profiles() {
  const [profiles, setProfiles] = useState([]);
const {setFormState} = useAstroForm();

  // load profile from localStorage 
  useEffect(() => {
    const stored = localStorage.getItem('liascope-profiles');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfiles(parsed);
      } catch (error) {
        console.error('Fehler beim Parsen gespeicherter Profile:', error);
      }
    }
  }, []);

  // delete profile
  const deleteProfile = (id) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    localStorage.setItem('liascope-profiles', JSON.stringify(updated));
  };

const router = useRouter();

const loadProfile = useCallback((profile) => {
  if (!profile) return;
  setFormState(profile.formState);
  router.push('/charts/natal');
}, [setFormState, router]);

  return (
    <div className=' flex flex-col w-full min-h-screen mt-7 '>
       <h2 className="tracking-wide text-2xl mx-[4rem] text-center text-[#e89b53]">Saved Charts || you can save up to 5 charts.</h2>
   
      <div className='left-[25%] relative mt-10'>
   {profiles.length === 0 ? <p>No charts saved. <Button type="btnBack"></Button> </p>  : <Button type="btnBack"></Button>}</div>
 <div className='flex w-full h-fit items-center flex-col'>
      {profiles.map((profile) => (
        <div
          key={profile.id}
          onClick={() => loadProfile(profile)}
          className="p-4 flex item-center justify-between w-[70%] h-full bg-[rgb(230,193,85,0.8)] btnGreen"
        >
          <div className='flex flex-row justify-evenly items-center-safe w-full'>
            <span>Saved <strong> Natal </strong> </span> <span> {profile.formState.user}, {profile.formState.birthDate}, {profile.formState.birthTime}, {profile.formState.birthPlaceData.city} </span> | <span> Saved <strong> Transit</strong></span> <span>{profile.formState.transitDate}, {profile.formState.transitTime}, {profile.formState.transitPlaceData.city} </span>
          </div>
          
          <button className='h-full w-10 hover:bg-white/80 border rounded-xl ml-3' title='delete'
            onClick={(e) => {
              e.stopPropagation(); 
              deleteProfile(profile.id);
            }}
          >  🧹
          </button>
          
        </div>
      ))}</div>
    </div>);}
