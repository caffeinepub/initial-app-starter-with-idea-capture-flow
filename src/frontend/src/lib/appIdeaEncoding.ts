import type { AppIdeaFormData } from '@/pages/LandingPage';
import type { AppIdea } from '@/backend';

/**
 * Encodes the full form data into the backend's AppIdea shape (title + description).
 * We'll store the additional fields as JSON in the description field.
 */
export function encodeAppIdea(formData: AppIdeaFormData): AppIdea {
  const encodedData = {
    description: formData.description,
    targetUsers: formData.targetUsers,
    mustHaveFeatures: formData.mustHaveFeatures,
    niceToHaveFeatures: formData.niceToHaveFeatures,
  };

  return {
    title: formData.appName,
    description: JSON.stringify(encodedData),
  };
}

/**
 * Decodes the backend's AppIdea back into the full form data structure.
 * Falls back gracefully if decoding fails.
 */
export function decodeAppIdea(idea: AppIdea): AppIdeaFormData {
  try {
    const parsed = JSON.parse(idea.description);
    return {
      appName: idea.title,
      description: parsed.description || '',
      targetUsers: parsed.targetUsers || '',
      mustHaveFeatures: parsed.mustHaveFeatures || '',
      niceToHaveFeatures: parsed.niceToHaveFeatures || '',
    };
  } catch {
    // If parsing fails, return basic structure with raw description
    return {
      appName: idea.title,
      description: idea.description,
      targetUsers: '',
      mustHaveFeatures: '',
      niceToHaveFeatures: '',
    };
  }
}
