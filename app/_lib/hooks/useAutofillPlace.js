import { useQuery } from "@tanstack/react-query";
import { fetchSuggestions } from "../data-service";

export function useAutofillPlace(key, place, fetchStart) {
  return useQuery({
    queryKey: ["place", key, place],
    queryFn: () => fetchSuggestions(place),
    enabled: place?.length > 3 && fetchStart,
    staleTime: Infinity,       
    cacheTime: 1000 * 60 * 60,  
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // retry:0
  });
}
