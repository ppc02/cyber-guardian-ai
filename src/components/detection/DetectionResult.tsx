import { AlertTriangle, CheckCircle, ExternalLink, Image, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface DetectionResultProps {
  id: string;
  sourceContent: {
    title: string;
    preview: string;
    platform: string;
    url: string;
    image?: string;
  };
  matchedFakeNews: {
    title: string;
    preview: string;
    image?: string;
  };
  matchPercentage: number;
  detectedAt: string;
}

export const DetectionResult = ({
  sourceContent,
  matchedFakeNews,
  matchPercentage,
  detectedAt,
}: DetectionResultProps) => {
  const getThreatLevel = (percentage: number) => {
    if (percentage >= 80) return { 
      label: 'ความเสี่ยงสูงมาก', 
      color: 'text-destructive',
      bgColor: 'bg-destructive/20',
      borderColor: 'border-destructive'
    };
    if (percentage >= 60) return { 
      label: 'ความเสี่ยงสูง', 
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      borderColor: 'border-warning'
    };
    if (percentage >= 40) return { 
      label: 'ความเสี่ยงปานกลาง', 
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      borderColor: 'border-accent'
    };
    return { 
      label: 'ความเสี่ยงต่ำ', 
      color: 'text-success',
      bgColor: 'bg-success/20',
      borderColor: 'border-success'
    };
  };

  const threat = getThreatLevel(matchPercentage);

  return (
    <div className={cn(
      "cyber-card border-l-4 transition-all",
      threat.borderColor
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            threat.bgColor,
            matchPercentage >= 80 && "threat-pulse"
          )}>
            {matchPercentage >= 60 ? (
              <AlertTriangle className={cn("w-6 h-6", threat.color)} />
            ) : (
              <CheckCircle className={cn("w-6 h-6", threat.color)} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={cn("text-2xl font-bold", threat.color)}>
                {matchPercentage}%
              </span>
              <Badge className={threat.bgColor}>
                <span className={threat.color}>{threat.label}</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              ตรวจพบเมื่อ {detectedAt}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <ExternalLink className="w-4 h-4" />
          ดูรายละเอียด
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">ความน่าจะเป็นข่าวปลอม</span>
          <span className={threat.color}>{matchPercentage}%</span>
        </div>
        <Progress 
          value={matchPercentage} 
          className={cn("h-2", threat.bgColor)}
        />
      </div>

      {/* Comparison Section */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Source Content */}
        <div className="p-4 rounded-lg bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">ข้อมูลจากระบบย่อยที่ 1</span>
            <Badge variant="secondary" className="ml-auto">
              {sourceContent.platform}
            </Badge>
          </div>
          <h4 className="font-medium text-foreground mb-2">{sourceContent.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-3">{sourceContent.preview}</p>
          {sourceContent.image && (
            <div className="mt-3 rounded-lg overflow-hidden bg-muted">
              <div className="h-32 flex items-center justify-center">
                <Image className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Matched Fake News */}
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">ข่าวปลอมที่ตรงกัน</span>
          </div>
          <h4 className="font-medium text-foreground mb-2">{matchedFakeNews.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-3">{matchedFakeNews.preview}</p>
          {matchedFakeNews.image && (
            <div className="mt-3 rounded-lg overflow-hidden bg-muted">
              <div className="h-32 flex items-center justify-center">
                <Image className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
