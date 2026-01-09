import { MainLayout } from '@/components/layout/MainLayout';
import { PlatformCard } from '@/components/data-fetch/PlatformCard';

const platforms = [
  {
    name: 'Facebook',
    icon: <span className="text-2xl font-bold text-white">f</span>,
    color: 'bg-blue-600',
    placeholder: 'https://facebook.com/pagename หรือชื่อเพจ',
    description: 'ดึงข้อมูลโพสต์และเนื้อหาจากเพจ Facebook',
  },
  {
    name: 'X (Twitter)',
    icon: <span className="text-2xl font-bold text-white">𝕏</span>,
    color: 'bg-neutral-800',
    placeholder: 'https://x.com/username หรือ @username',
    description: 'ดึงข้อมูลทวีตและเธรดจาก X',
  },
  {
    name: 'TikTok',
    icon: <span className="text-2xl font-bold text-white">♪</span>,
    color: 'bg-gradient-to-r from-pink-500 to-cyan-500',
    placeholder: 'https://tiktok.com/@username หรือชื่อบัญชี',
    description: 'ดึงข้อมูลวิดีโอและคำบรรยายจาก TikTok',
  },
  {
    name: 'Pantip',
    icon: <span className="text-2xl font-bold text-white">P</span>,
    color: 'bg-purple-600',
    placeholder: 'https://pantip.com/topic/xxxxx หรือ Room',
    description: 'ดึงข้อมูลกระทู้และความคิดเห็นจาก Pantip',
  },
];

const DataFetch = () => {
  return (
    <MainLayout 
      title="ดึงข้อมูลข่าวสาร" 
      description="ระบบย่อยที่ 1 - นำเข้าข้อมูลจากแพลตฟอร์มโซเชียลมีเดีย"
    >
      <div className="space-y-6 animate-fade-in">
        <div className="cyber-card p-4 bg-accent/5 border-accent/30">
          <p className="text-sm text-muted-foreground">
            <span className="text-accent font-medium">วิธีใช้งาน:</span> กรอก Link หรือชื่อเพจ/บัญชีที่ต้องการติดตามเพื่อดึงข้อมูลโพสต์มาวิเคราะห์หาข่าวปลอม 
            ระบบจะทำการสแกนเนื้อหาและเปรียบเทียบกับฐานข้อมูลข่าวปลอมโดยอัตโนมัติ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map((platform) => (
            <PlatformCard key={platform.name} {...platform} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DataFetch;
