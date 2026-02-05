import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { encodeAppIdea } from '@/lib/appIdeaEncoding';
import type { AppIdeaFormData } from '@/pages/LandingPage';

export function useSubmitAppIdea() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: AppIdeaFormData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }

      const { title, description } = encodeAppIdea(formData);
      await actor.submitAppIdea(title, description);
    },
    onSuccess: () => {
      // Invalidate and refetch the latest idea
      queryClient.invalidateQueries({ queryKey: ['latestAppIdea'] });
    },
  });
}
