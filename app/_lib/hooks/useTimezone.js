import { useQuery } from "@tanstack/react-query";
import { fetchTimezone } from "../data-service";

export function useTimezone(key, lat, lng, enabled=true) {
  return useQuery({
    queryKey: ["timezone", key, lat, lng],
    queryFn: () => fetchTimezone( +lat, +lng ),
    enabled: !!lat && !!lng && enabled, // start only if coord true
    staleTime: 1000 * 60 * 60, // 1 h 
    retry: 1,
  });
}
