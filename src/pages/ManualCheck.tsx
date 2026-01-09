import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ManualCheckForm } from '@/components/detection/ManualCheckForm';
import { AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CheckResult {
  matchPercentage: number;
  matchedNews?: {
    title: string;
    preview: string;
  };
}

const ManualCheck = () => {
  const [result, setResult] = useState<CheckResult | null>(null);

  const getThreatLevel = (percentage: number) => {
    if (percentage >= 80) return { 
      label: 'มีความเป็นไปได้สูงมากว่าเป็นข่าวปลอม', 
      color: 'text-destructive',
      bgColor: 'bg-destructive/20',
      icon: AlertTriangle,
    };
    if (percentage >= 60) return { 
      label: 'มีความเป็นไปได้สูงว่าเป็นข่าวปลอม', 
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      icon: AlertTriangle,
    };
    if (percentage >= 40) return { 
      label: 'ควรตรวจสอบเพิ่มเติม', 
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      icon: ShieldCheck,
    };
    return { 
      label: 'น่าจะเป็นข่าวจริง', 
      color: 'text-success',
      bgColor: 'bg-success/20',
      icon: CheckCircle,
    };
  };

  return (
    <MainLayout 
      title="ตรวจสอบด้วยตนเอง" 
      description="นำเข้าบทความหรือรูปภาพเพื่อตรวจสอบว่าเป็นข่าวปลอมหรือไม่"
    >
      <div className="space-y-6 animate-fade-in">
        <div className="cyber-card p-4 bg-accent/5 border-accent/30">
          <p className="text-sm text-muted-foreground">
            <span className="text-accent font-medium">สำหรับกรณีพิเศษ:</span> ใช้ฟีเจอร์นี้เมื่อต้องการตรวจสอบข่าวหรือรูปภาพที่ไม่ได้อยู่ในระบบติดตามอัตโนมัติ (ระบบย่อยที่ 1) 
            ระบบจะวิเคราะห์และเปรียบเทียบกับฐานข้อมูลข่าวปลอมเพื่อแจ้งผลลัพธ์
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ManualCheckForm onResult={setResult} />

          {/* Results Panel */}
          <div className="cyber-card">
            <h3 className="font-semibold text-foreground mb-6">ผลการวิเคราะห์</h3>
            
            {result ? (
              <div className="space-y-6">
                {(() => {
                  const threat = getThreatLevel(result.matchPercentage);
                  const IconComponent = threat.icon;
                  return (
                    <>
                      <div className={cn(
                        "p-6 rounded-xl text-center",
                        threat.bgColor
                      )}>
                        <IconComponent className={cn(
                          "w-16 h-16 mx-auto mb-4",
                          threat.color,
                          result.matchPercentage >= 60 && "threat-pulse"
                        )} />
                        <p className={cn("text-4xl font-bold mb-2", threat.color)}>
                          {result.matchPercentage}%
                        </p>
                        <p className={cn("font-medium", threat.color)}>
                          {threat.label}
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">ระดับความน่าจะเป็น</span>
                          <span className={threat.color}>{result.matchPercentage}%</span>
                        </div>
                        <Progress 
                          value={result.matchPercentage} 
                          className={cn("h-3", threat.bgColor)}
                        />
                      </div>

                      {result.matchedNews && (
                        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                            <span className="text-sm font-medium text-destructive">
                              ข่าวปลอมที่ตรงกัน
                            </span>
                          </div>
                          <h4 className="font-medium text-foreground mb-2">
                            {result.matchedNews.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {result.matchedNews.preview}
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShieldCheck className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                  กรอกข้อมูลและกดตรวจสอบเพื่อดูผลการวิเคราะห์
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManualCheck;
