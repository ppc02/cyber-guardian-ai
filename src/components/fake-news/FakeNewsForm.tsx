import { useState } from 'react';
import { Upload, FileText, Image, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const FakeNewsForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข่าวปลอมถูกเพิ่มเข้าสู่ฐานข้อมูลแล้ว",
    });

    setTitle('');
    setContent('');
    setSource('');
    setImages([]);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="cyber-card space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">เพิ่มข่าวปลอม</h3>
          <p className="text-sm text-muted-foreground">บันทึกข้อมูลข่าวที่ตรวจสอบแล้วว่าเป็นข่าวปลอม</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">หัวข้อข่าว *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ระบุหัวข้อข่าวปลอม"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">เนื้อหาข่าว *</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="ระบุเนื้อหาของข่าวปลอม หรือคัดลอกข้อความมาวาง"
            rows={5}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">แหล่งที่มา</Label>
          <Input
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="ลิงก์หรือแหล่งที่พบข่าวนี้"
          />
        </div>

        <div className="space-y-2">
          <Label>รูปภาพประกอบ</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                คลิกเพื่ออัปโหลดรูปภาพ หรือลากไฟล์มาวาง
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                รองรับ PNG, JPG, WEBP
              </p>
            </label>
          </div>

          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {images.map((file, index) => (
                <div 
                  key={index}
                  className="relative group rounded-lg overflow-hidden bg-muted"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-20 h-20 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full gold-gradient text-primary-foreground"
        disabled={isSubmitting || !title.trim() || !content.trim()}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            กำลังบันทึก...
          </>
        ) : (
          'บันทึกข้อมูลข่าวปลอม'
        )}
      </Button>
    </form>
  );
};
