import { useState } from 'react';
import { Search, Upload, Loader2, X, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface ManualCheckFormProps {
  onResult: (result: {
    matchPercentage: number;
    matchedNews?: {
      title: string;
      preview: string;
    };
  }) => void;
}

export const ManualCheckForm = ({ onResult }: ManualCheckFormProps) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheck = async () => {
    if (!content.trim() && images.length === 0) {
      toast({
        title: "กรุณาระบุข้อมูล",
        description: "กรุณากรอกเนื้อหาหรืออัปโหลดรูปภาพเพื่อตรวจสอบ",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock result
    const mockPercentage = Math.floor(Math.random() * 100);
    onResult({
      matchPercentage: mockPercentage,
      matchedNews: mockPercentage > 40 ? {
        title: 'ข่าวปลอมที่ตรงกับเนื้อหาที่ตรวจสอบ',
        preview: 'นี่คือตัวอย่างเนื้อหาข่าวปลอมที่ระบบตรวจพบว่ามีความคล้ายคลึงกับข้อมูลที่ท่านส่งมาตรวจสอบ...',
      } : undefined,
    });

    setIsChecking(false);
  };

  return (
    <div className="cyber-card">
      <div className="flex items-center gap-3 pb-4 border-b border-border mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <Search className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">ตรวจสอบข่าวด้วยตนเอง</h3>
          <p className="text-sm text-muted-foreground">
            นำเข้าบทความหรือรูปภาพเพื่อตรวจสอบว่าเป็นข่าวปลอมหรือไม่
          </p>
        </div>
      </div>

      <Tabs defaultValue="text" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
          <TabsTrigger value="text" className="gap-2">
            <FileText className="w-4 h-4" />
            บทความ/ข้อความ
          </TabsTrigger>
          <TabsTrigger value="image" className="gap-2">
            <Image className="w-4 h-4" />
            รูปภาพ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="check-content">เนื้อหาที่ต้องการตรวจสอบ</Label>
            <Textarea
              id="check-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="วางหรือพิมพ์เนื้อหาข่าว/บทความที่ต้องการตรวจสอบ..."
              rows={8}
              className="resize-none"
            />
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          <div className="space-y-2">
            <Label>รูปภาพที่ต้องการตรวจสอบ</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="check-image-upload"
              />
              <label htmlFor="check-image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">
                  คลิกเพื่ออัปโหลดรูปภาพ หรือลากไฟล์มาวาง
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  รองรับ PNG, JPG, WEBP (สูงสุด 10MB)
                </p>
              </label>
            </div>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {images.map((file, index) => (
                  <div 
                    key={index}
                    className="relative group rounded-lg overflow-hidden bg-muted border border-border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-24 h-24 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Button 
        onClick={handleCheck}
        className="w-full mt-6 gold-gradient text-primary-foreground"
        disabled={isChecking || (!content.trim() && images.length === 0)}
      >
        {isChecking ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            กำลังวิเคราะห์ด้วย AI...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            ตรวจสอบข่าว
          </>
        )}
      </Button>
    </div>
  );
};
