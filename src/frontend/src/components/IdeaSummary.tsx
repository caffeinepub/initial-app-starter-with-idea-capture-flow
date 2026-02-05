import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Edit, Sparkles } from 'lucide-react';
import type { AppIdeaFormData } from '@/pages/LandingPage';

interface IdeaSummaryProps {
  idea: AppIdeaFormData;
  onNewIdea: () => void;
}

export function IdeaSummary({ idea, onNewIdea }: IdeaSummaryProps) {
  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Your idea has been saved!
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Here's a summary of your app vision. You can always come back to refine it.
        </p>
      </div>

      {/* Summary Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <CardTitle className="text-2xl">{idea.appName}</CardTitle>
              </div>
              <CardDescription className="text-base">
                Your app idea summary
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onNewIdea}
              className="ml-4"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Idea
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Description
            </h3>
            <p className="text-base leading-relaxed">{idea.description}</p>
          </div>

          <Separator />

          {/* Target Users */}
          {idea.targetUsers && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Target Users
                </h3>
                <p className="text-base leading-relaxed">{idea.targetUsers}</p>
              </div>
              <Separator />
            </>
          )}

          {/* Must-Have Features */}
          {idea.mustHaveFeatures && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Must-Have Features
                  </h3>
                  <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                    Essential
                  </Badge>
                </div>
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {idea.mustHaveFeatures}
                </p>
              </div>
              <Separator />
            </>
          )}

          {/* Nice-to-Have Features */}
          {idea.niceToHaveFeatures && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Nice-to-Have Features
                </h3>
                <Badge variant="secondary">Optional</Badge>
              </div>
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {idea.niceToHaveFeatures}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={onNewIdea}
          size="lg"
          variant="outline"
          className="text-base"
        >
          <Edit className="w-5 h-5 mr-2" />
          Refine Your Idea
        </Button>
      </div>
    </div>
  );
}
