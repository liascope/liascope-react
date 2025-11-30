import { useQuery } from "@tanstack/react-query";
import { fetchSuggestions } from "../data-service";


export function useAutofillPlace(key, place, enabled=true) {
  return useQuery({
    queryKey: ["place", key, place],
    queryFn: () => fetchSuggestions(place),
    enabled: !!place && enabled, // start only if true
    staleTime: 60, // 1 h 
    retry: 1,
  });
}
