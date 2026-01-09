import { useState } from 'react';
import { Filter, RefreshCw } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DetectionResult } from '@/components/detection/DetectionResult';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockDetections = [
  {
    id: '1',
    sourceContent: {
      title: 'รัฐบาลแจกเงินดิจิทัล 10,000 บาท รีบลงทะเบียนด่วน!',
      preview: 'ข่าวดี! รัฐบาลประกาศแจกเงินดิจิทัล 10,000 บาทให้ประชาชนทุกคน กดลิงก์ลงทะเบียนได้เลย...',
      platform: 'Facebook',
      url: 'https://facebook.com/example',
      image: '/placeholder.svg',
    },
    matchedFakeNews: {
      title: 'ข่าวปลอม: การแจกเงินดิจิทัลผ่านลิงก์ไม่ทราบที่มา',
      preview: 'ข่าวนี้เป็นข่าวปลอมที่พยายามหลอกลวงให้กรอกข้อมูลส่วนตัว การแจกเงินจากรัฐบาลต้องผ่านช่องทางทางการเท่านั้น...',
      image: '/placeholder.svg',
    },
    matchPercentage: 92,
    detectedAt: '15 ม.ค. 2567, 14:32 น.',
  },
  {
    id: '2',
    sourceContent: {
      title: 'ลดน้ำหนัก 20 กก. ใน 1 สัปดาห์ด้วยวิธีง่ายๆ',
      preview: 'ค้นพบวิธีลดน้ำหนักสุดมหัศจรรย์! ไม่ต้องออกกำลังกาย ไม่ต้องอดอาหาร...',
      platform: 'TikTok',
      url: 'https://tiktok.com/example',
    },
    matchedFakeNews: {
      title: 'อ้างสรรพคุณเกินจริง: ผลิตภัณฑ์ลดน้ำหนักอันตราย',
      preview: 'ผลิตภัณฑ์นี้ถูกแจ้งเตือนจาก อย. ว่าเป็นผลิตภัณฑ์ที่อาจเป็นอันตรายต่อสุขภาพ...',
    },
    matchPercentage: 78,
    detectedAt: '15 ม.ค. 2567, 13:15 น.',
  },
  {
    id: '3',
    sourceContent: {
      title: 'ด่วน! พบน้ำท่วมใหญ่ในกรุงเทพฯ',
      preview: 'รายงานด่วน! พบน้ำท่วมสูงหลายเมตรในหลายพื้นที่ของกรุงเทพฯ ประชาชนควรเตรียมพร้อมอพยพ...',
      platform: 'X (Twitter)',
      url: 'https://x.com/example',
    },
    matchedFakeNews: {
      title: 'ข่าวปลอมเรื่องภัยพิบัติ',
      preview: 'ข่าวนี้ใช้ภาพเก่าจากปี 2554 มาตัดต่อเพื่อสร้างความตื่นตระหนก...',
    },
    matchPercentage: 45,
    detectedAt: '15 ม.ค. 2567, 11:45 น.',
  },
];

const Detection = () => {
  const [filter, setFilter] = useState('all');

  return (
    <MainLayout 
      title="ตรวจจับและแจ้งเตือน" 
      description="ระบบย่อยที่ 3 - แสดงผลการตรวจจับข่าวปลอมและแจ้งเตือน"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Filter Bar */}
        <div className="cyber-card p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-destructive/20 text-destructive">
                12 รายการใหม่
              </Badge>
              <Badge variant="secondary">
                รอตรวจสอบ: 5
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="กรองตามระดับ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="high">ความเสี่ยงสูงมาก (80%+)</SelectItem>
                  <SelectItem value="medium">ความเสี่ยงสูง (60-79%)</SelectItem>
                  <SelectItem value="low">ความเสี่ยงปานกลาง (40-59%)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Detection Results */}
        <div className="space-y-4">
          {mockDetections.map((detection) => (
            <DetectionResult key={detection.id} {...detection} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Detection;
