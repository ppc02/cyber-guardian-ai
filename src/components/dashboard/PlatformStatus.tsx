import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformStatusProps {
  name: string;
  icon: React.ReactNode;
  status: 'active' | 'error' | 'syncing';
  lastSync: string;
  postsScanned: number;
}

export const PlatformStatus = ({ 
  name, 
  icon, 
  status, 
  lastSync, 
  postsScanned 
}: PlatformStatusProps) => {
  const statusIcons = {
    active: <CheckCircle className="w-4 h-4 text-success" />,
    error: <AlertCircle className="w-4 h-4 text-destructive" />,
    syncing: <Loader2 className="w-4 h-4 text-accent animate-spin" />,
  };

  const statusLabels = {
    active: 'กำลังทำงาน',
    error: 'มีปัญหา',
    syncing: 'กำลังซิงค์',
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">
            ซิงค์ล่าสุด: {lastSync}
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2 justify-end">
          {statusIcons[status]}
          <span className={cn(
            "text-sm",
            status === 'active' && "text-success",
            status === 'error' && "text-destructive",
            status === 'syncing' && "text-accent"
          )}>
            {statusLabels[status]}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {postsScanned.toLocaleString()} โพสต์
        </p>
      </div>
    </div>
  );
};
