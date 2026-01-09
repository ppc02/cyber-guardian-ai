import { useState } from 'react';
import { ExternalLink, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PlatformCardProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  placeholder: string;
  description: string;
}

export const PlatformCard = ({ 
  name, 
  icon, 
  color, 
  placeholder, 
  description 
}: PlatformCardProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "เพิ่มแหล่งข้อมูลสำเร็จ",
      description: `กำลังดึงข้อมูลจาก ${name}`,
    });
    
    setUrl('');
    setIsLoading(false);
  };

  return (
    <div className="cyber-card group hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
          color
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`url-${name}`}>Link หรือชื่อเพจ</Label>
          <div className="relative">
            <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id={`url-${name}`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={placeholder}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full gold-gradient text-primary-foreground"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              กำลังดึงข้อมูล...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มแหล่งข้อมูล
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
