import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { decodeAppIdea } from '@/lib/appIdeaEncoding';
import type { AppIdeaFormData } from '@/pages/LandingPage';

export function useLatestAppIdea() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<AppIdeaFormData | null>({
    queryKey: ['latestAppIdea'],
    queryFn: async () => {
      if (!actor) return null;
      
      try {
        const idea = await actor.getLatestAppIdea();
        return decodeAppIdea(idea);
      } catch (error) {
        // If no idea exists yet, backend will trap - treat as empty state
        return null;
      }
    },
    enabled: !!actor && !isActorFetching,
    retry: false, // Don't retry on error (no idea saved yet is expected)
  });
}
