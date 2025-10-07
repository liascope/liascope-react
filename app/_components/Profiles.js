'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAstroForm } from '../_lib/context/AstroContext';
import Button from './Button';
import Loader from './Loader';
import Trash from './navicons/Trash';

export function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [showLoader, setShowLoader] = useState(true)
const {setFormState, error, loading} = useAstroForm();

  // load profile from localStorage 
  useEffect(() => {
    const stored = localStorage.getItem('liascope-profiles');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfiles(parsed);
      } catch (error) {
        console.error('Error parsing stored profiles:', error);
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
   useEffect(() => {
    if (profiles || error) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 50); 
      return () => clearTimeout(timer);
    }
  }, [profiles, error]);

  if (loading || showLoader) return <Loader></Loader>;

  return (
    <div className=' flex flex-col w-full min-h-screen mt-7'>
       <h2 className="sm:tracking-wide text-md sm:text-2xl sm:mx-[4rem] text-center text-[#e89b53]">Saved Charts || you can save up to 5 charts.</h2>
   
      <div className='left-[25%] w-fit relative mt-10'>
   {profiles.length === 0 ? <p>No charts saved. <Button type="btnBack"></Button> </p>  : <Button type="btnBack"></Button>}</div>

 <div className='flex w-full h-fit items-center flex-col'>
      {profiles.map((profile) => (
        <div
          key={profile.id}
          onClick={() => loadProfile(profile)}
          className="p-4 flex sm:items-center items-end justify-between  w-[90%] sm:w-[70%] h-full bg-[rgb(230,193,85,0.8)] btnGreen"
        >
          <div className='flex flex-col sm:flex-row sm:gap-7 gap-1 sm:justify-evenly sm:items-center-safe w-full text-xs sm:text-base'>
            <span>Saved <strong> Natal: </strong> </span> 
            <span className='flex-1 border-e border-gray-300'> {profile.formState.user}, {profile.formState.birthDate}, {profile.formState.birthTime}, {profile.formState.birthPlaceData.city.split(',')[0]} </span> 
             <span> Saved <strong> Transit:</strong> </span>
              <span className='flex-1'>{profile.formState.transitDate}, {profile.formState.transitTime}, {profile.formState.transitPlaceData.city.split(',')[0]} </span>
          </div>
          <Trash onClick={(e) => {e.stopPropagation();  deleteProfile(profile.id);}}/>
        </div>
      ))}</div>
    </div>);}
