import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import type { AppIdeaFormData } from '@/pages/LandingPage';

interface IdeaCaptureFormProps {
  onSubmit: (data: AppIdeaFormData) => void;
  isSubmitting?: boolean;
}

export function IdeaCaptureForm({ onSubmit, isSubmitting = false }: IdeaCaptureFormProps) {
  const [formData, setFormData] = useState<AppIdeaFormData>({
    appName: '',
    description: '',
    targetUsers: '',
    mustHaveFeatures: '',
    niceToHaveFeatures: '',
  });

  const handleChange = (field: keyof AppIdeaFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.appName.trim() && formData.description.trim();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Tell us about your app idea</CardTitle>
        <CardDescription>
          Fill out the details below to capture your vision. We'll save it for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* App Name */}
          <div className="space-y-2">
            <Label htmlFor="appName" className="text-base font-semibold">
              App Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="appName"
              placeholder="e.g., TaskMaster Pro"
              value={formData.appName}
              onChange={(e) => handleChange('appName', e.target.value)}
              required
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              What will you call your app?
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what your app does and why it's needed..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
              rows={4}
              className="text-base resize-none"
            />
            <p className="text-sm text-muted-foreground">
              What problem does your app solve?
            </p>
          </div>

          {/* Target Users */}
          <div className="space-y-2">
            <Label htmlFor="targetUsers" className="text-base font-semibold">
              Target Users
            </Label>
            <Input
              id="targetUsers"
              placeholder="e.g., Busy professionals, Students, Small business owners"
              value={formData.targetUsers}
              onChange={(e) => handleChange('targetUsers', e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              Who will use your app?
            </p>
          </div>

          {/* Must-Have Features */}
          <div className="space-y-2">
            <Label htmlFor="mustHaveFeatures" className="text-base font-semibold">
              Must-Have Features
            </Label>
            <Textarea
              id="mustHaveFeatures"
              placeholder="List the essential features your app needs to have..."
              value={formData.mustHaveFeatures}
              onChange={(e) => handleChange('mustHaveFeatures', e.target.value)}
              rows={3}
              className="text-base resize-none"
            />
            <p className="text-sm text-muted-foreground">
              What features are absolutely necessary?
            </p>
          </div>

          {/* Nice-to-Have Features */}
          <div className="space-y-2">
            <Label htmlFor="niceToHaveFeatures" className="text-base font-semibold">
              Nice-to-Have Features
            </Label>
            <Textarea
              id="niceToHaveFeatures"
              placeholder="List features that would be great to include but aren't critical..."
              value={formData.niceToHaveFeatures}
              onChange={(e) => handleChange('niceToHaveFeatures', e.target.value)}
              rows={3}
              className="text-base resize-none"
            />
            <p className="text-sm text-muted-foreground">
              What would make your app even better?
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full text-base h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving Your Idea...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Save My App Idea
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
