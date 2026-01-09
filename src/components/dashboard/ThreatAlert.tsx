import { AlertTriangle, ExternalLink, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThreatAlertProps {
  id: string;
  platform: 'facebook' | 'twitter' | 'tiktok' | 'pantip';
  title: string;
  matchPercentage: number;
  timestamp: string;
  status: 'new' | 'reviewing' | 'confirmed';
}

export const ThreatAlert = ({ 
  platform, 
  title, 
  matchPercentage, 
  timestamp, 
  status 
}: ThreatAlertProps) => {
  const platformColors = {
    facebook: 'bg-blue-500/20 text-blue-400',
    twitter: 'bg-sky-500/20 text-sky-400',
    tiktok: 'bg-pink-500/20 text-pink-400',
    pantip: 'bg-purple-500/20 text-purple-400',
  };

  const platformNames = {
    facebook: 'Facebook',
    twitter: 'X (Twitter)',
    tiktok: 'TikTok',
    pantip: 'Pantip',
  };

  const statusColors = {
    new: 'bg-destructive text-destructive-foreground',
    reviewing: 'bg-warning text-warning-foreground',
    confirmed: 'bg-success text-success-foreground',
  };

  const statusLabels = {
    new: 'ใหม่',
    reviewing: 'กำลังตรวจสอบ',
    confirmed: 'ยืนยันแล้ว',
  };

  const getThreatLevel = (percentage: number) => {
    if (percentage >= 80) return { label: 'สูงมาก', color: 'text-destructive' };
    if (percentage >= 60) return { label: 'สูง', color: 'text-warning' };
    if (percentage >= 40) return { label: 'ปานกลาง', color: 'text-accent' };
    return { label: 'ต่ำ', color: 'text-success' };
  };

  const threat = getThreatLevel(matchPercentage);

  return (
    <div className={cn(
      "cyber-card p-4 border-l-4 transition-all hover:translate-x-1",
      matchPercentage >= 80 ? "border-l-destructive" : 
      matchPercentage >= 60 ? "border-l-warning" : "border-l-accent"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            matchPercentage >= 80 && "threat-pulse"
          )}>
            <AlertTriangle className={cn("w-5 h-5", threat.color)} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={platformColors[platform]}>
                {platformNames[platform]}
              </Badge>
              <Badge className={statusColors[status]}>
                {statusLabels[status]}
              </Badge>
            </div>
            <p className="font-medium text-foreground line-clamp-2">{title}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timestamp}
              </span>
              <span className={cn("font-semibold", threat.color)}>
                ความน่าจะเป็น: {matchPercentage}%
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
