import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  variant?: 'default' | 'warning' | 'danger' | 'success';
}

export const StatCard = ({ title, value, change, icon, variant = 'default' }: StatCardProps) => {
  const variants = {
    default: 'border-border',
    warning: 'border-warning/30 bg-warning/5',
    danger: 'border-destructive/30 bg-destructive/5',
    success: 'border-success/30 bg-success/5',
  };

  const iconVariants = {
    default: 'bg-primary/10 text-primary',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-destructive/20 text-destructive',
    success: 'bg-success/20 text-success',
  };

  return (
    <div className={cn("stat-card", variants[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm",
              change >= 0 ? "text-success" : "text-destructive"
            )}>
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}% จากเดือนที่แล้ว</span>
            </div>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconVariants[variant])}>
          {icon}
        </div>
      </div>
    </div>
  );
};
