import { useState, useEffect } from 'react';
import { IdeaCaptureForm } from '@/components/IdeaCaptureForm';
import { IdeaSummary } from '@/components/IdeaSummary';
import { useLatestAppIdea } from '@/hooks/useLatestAppIdea';
import { useSubmitAppIdea } from '@/hooks/useSubmitAppIdea';
import { Lightbulb, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface AppIdeaFormData {
  appName: string;
  description: string;
  targetUsers: string;
  mustHaveFeatures: string;
  niceToHaveFeatures: string;
}

export function LandingPage() {
  const [submittedIdea, setSubmittedIdea] = useState<AppIdeaFormData | null>(null);
  const { data: latestIdea, isLoading, error } = useLatestAppIdea();
  const submitMutation = useSubmitAppIdea();

  useEffect(() => {
    if (latestIdea) {
      setSubmittedIdea(latestIdea);
    }
  }, [latestIdea]);

  const handleSubmit = async (formData: AppIdeaFormData) => {
    try {
      await submitMutation.mutateAsync(formData);
      setSubmittedIdea(formData);
    } catch (err) {
      console.error('Failed to submit idea:', err);
    }
  };

  const handleNewIdea = () => {
    setSubmittedIdea(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">IdeaForge</h1>
              <p className="text-xs text-muted-foreground">Shape your vision</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {!submittedIdea ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Start Building Your Dream App</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                What will you create today?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every great app starts with a clear vision. Let's capture yours with a simple guided form.
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <Alert>
                <AlertDescription>Loading your previous ideas...</AlertDescription>
              </Alert>
            )}

            {/* Error State (show as info, not blocking) */}
            {error && !isLoading && (
              <Alert>
                <AlertDescription>
                  No previous ideas found. Start fresh below!
                </AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <IdeaCaptureForm 
              onSubmit={handleSubmit} 
              isSubmitting={submitMutation.isPending}
            />
          </div>
        ) : (
          <IdeaSummary idea={submittedIdea} onNewIdea={handleNewIdea} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2026. Built with <span className="text-red-500">♥</span> using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-amber-600 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
