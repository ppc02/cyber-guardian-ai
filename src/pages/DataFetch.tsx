import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PlatformCard } from '@/components/data-fetch/PlatformCard';
import { NewsSourceTable, NewsSource } from '@/components/data-fetch/NewsSourceTable';
import { useToast } from '@/hooks/use-toast';

const platforms = [
  {
    name: 'Facebook',
    platformKey: 'facebook' as const,
    icon: <span className="text-2xl font-bold text-white">f</span>,
    color: 'bg-blue-600',
    placeholder: 'https://facebook.com/pagename หรือชื่อเพจ',
    description: 'ดึงข้อมูลโพสต์และเนื้อหาจากเพจ Facebook',
  },
  {
    name: 'X (Twitter)',
    platformKey: 'twitter' as const,
    icon: <span className="text-2xl font-bold text-white">𝕏</span>,
    color: 'bg-neutral-800',
    placeholder: 'https://x.com/username หรือ @username',
    description: 'ดึงข้อมูลทวีตและเธรดจาก X',
  },
  {
    name: 'TikTok',
    platformKey: 'tiktok' as const,
    icon: <span className="text-2xl font-bold text-white">♪</span>,
    color: 'bg-gradient-to-r from-pink-500 to-cyan-500',
    placeholder: 'https://tiktok.com/@username หรือชื่อบัญชี',
    description: 'ดึงข้อมูลวิดีโอและคำบรรยายจาก TikTok',
  },
  {
    name: 'Pantip',
    platformKey: 'pantip' as const,
    icon: <span className="text-2xl font-bold text-white">P</span>,
    color: 'bg-purple-600',
    placeholder: 'https://pantip.com/topic/xxxxx หรือ Room',
    description: 'ดึงข้อมูลกระทู้และความคิดเห็นจาก Pantip',
  },
];

// Initial mock data
const initialSources: NewsSource[] = [
  {
    id: '1',
    platform: 'facebook',
    name: 'ข่าวสารชาวบ้าน',
    url: 'https://facebook.com/khaoban',
    status: 'active',
    postsScanned: 1234,
    lastSync: '2 นาทีที่แล้ว',
    addedAt: '2024-01-10',
  },
  {
    id: '2',
    platform: 'twitter',
    name: '@NewsUpdate24',
    url: 'https://x.com/newsupdate24',
    status: 'syncing',
    postsScanned: 567,
    lastSync: 'กำลังซิงค์...',
    addedAt: '2024-01-12',
  },
  {
    id: '3',
    platform: 'tiktok',
    name: 'ข่าวด่วนTH',
    url: 'https://tiktok.com/@khaoduan_th',
    status: 'active',
    postsScanned: 89,
    lastSync: '15 นาทีที่แล้ว',
    addedAt: '2024-01-14',
  },
];

const DataFetch = () => {
  const [sources, setSources] = useState<NewsSource[]>(initialSources);
  const { toast } = useToast();

  const handleAddSource = (newSource: Omit<NewsSource, 'id'>) => {
    const id = Date.now().toString();
    setSources(prev => [...prev, { ...newSource, id }]);

    // Simulate sync completion after 3 seconds
    setTimeout(() => {
      setSources(prev => prev.map(s => 
        s.id === id 
          ? { 
              ...s, 
              status: 'active' as const, 
              lastSync: 'เมื่อสักครู่',
              postsScanned: Math.floor(Math.random() * 500) + 50
            }
          : s
      ));
    }, 3000);
  };

  const handleUpdateSource = (id: string, data: Partial<NewsSource>) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const handleDeleteSource = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  const handleRefreshSource = (id: string) => {
    setSources(prev => prev.map(s => 
      s.id === id 
        ? { ...s, status: 'syncing' as const, lastSync: 'กำลังซิงค์...' }
        : s
    ));
    
    toast({
      title: "กำลังซิงค์ข้อมูล",
      description: "ระบบกำลังดึงข้อมูลล่าสุด",
    });

    // Simulate sync completion
    setTimeout(() => {
      setSources(prev => prev.map(s => 
        s.id === id 
          ? { 
              ...s, 
              status: 'active' as const, 
              lastSync: 'เมื่อสักครู่',
              postsScanned: s.postsScanned + Math.floor(Math.random() * 50) + 10
            }
          : s
      ));
      toast({
        title: "ซิงค์สำเร็จ",
        description: "ดึงข้อมูลล่าสุดเรียบร้อยแล้ว",
      });
    }, 2000);
  };

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
            <PlatformCard 
              key={platform.name} 
              {...platform}
              onAdd={handleAddSource}
            />
          ))}
        </div>

        {/* News Sources Table */}
        <NewsSourceTable
          sources={sources}
          onUpdate={handleUpdateSource}
          onDelete={handleDeleteSource}
          onRefresh={handleRefreshSource}
        />
      </div>
    </MainLayout>
  );
};

export default DataFetch;
