import { 
  AlertTriangle, 
  Database, 
  Radar, 
  Shield,
  TrendingUp
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ThreatAlert } from '@/components/dashboard/ThreatAlert';
import { PlatformStatus } from '@/components/dashboard/PlatformStatus';

const mockAlerts = [
  {
    id: '1',
    platform: 'facebook' as const,
    title: 'พบเพจปล่อยข่าวปลอมเกี่ยวกับการแจกเงินดิจิทัล 10,000 บาท จากรัฐบาล',
    matchPercentage: 92,
    timestamp: '5 นาทีที่แล้ว',
    status: 'new' as const,
  },
  {
    id: '2',
    platform: 'tiktok' as const,
    title: 'คลิปหลอกลวงเกี่ยวกับผลิตภัณฑ์ลดน้ำหนักอันตราย',
    matchPercentage: 78,
    timestamp: '12 นาทีที่แล้ว',
    status: 'reviewing' as const,
  },
  {
    id: '3',
    platform: 'twitter' as const,
    title: 'ข่าวปลอมเรื่องภัยพิบัติในพื้นที่ภาคเหนือ',
    matchPercentage: 65,
    timestamp: '25 นาทีที่แล้ว',
    status: 'reviewing' as const,
  },
  {
    id: '4',
    platform: 'pantip' as const,
    title: 'กระทู้แชร์ลูกโซ่หลอกลวงการลงทุนคริปโต',
    matchPercentage: 88,
    timestamp: '1 ชั่วโมงที่แล้ว',
    status: 'confirmed' as const,
  },
];

const Dashboard = () => {
  return (
    <MainLayout 
      title="Dashboard" 
      description="ภาพรวมระบบตรวจจับข่าวปลอม"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="ข่าวปลอมที่ตรวจพบ (วันนี้)"
            value="127"
            change={12}
            icon={<AlertTriangle className="w-6 h-6" />}
            variant="danger"
          />
          <StatCard
            title="โพสต์ที่สแกน"
            value="15,482"
            change={8}
            icon={<Radar className="w-6 h-6" />}
          />
          <StatCard
            title="ฐานข้อมูลข่าวปลอม"
            value="3,847"
            change={5}
            icon={<Database className="w-6 h-6" />}
          />
          <StatCard
            title="ความแม่นยำ AI"
            value="94.7%"
            change={2}
            icon={<TrendingUp className="w-6 h-6" />}
            variant="success"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Alerts */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                การแจ้งเตือนล่าสุด
              </h2>
              <span className="text-sm text-muted-foreground">
                อัปเดต: เมื่อสักครู่
              </span>
            </div>
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <ThreatAlert key={alert.id} {...alert} />
              ))}
            </div>
          </div>

          {/* Platform Status */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              สถานะแพลตฟอร์ม
            </h2>
            <div className="cyber-card p-4 space-y-3">
              <PlatformStatus
                name="Facebook"
                icon={<div className="text-blue-400 font-bold">f</div>}
                status="active"
                lastSync="2 นาทีที่แล้ว"
                postsScanned={8234}
              />
              <PlatformStatus
                name="X (Twitter)"
                icon={<div className="text-foreground font-bold">𝕏</div>}
                status="syncing"
                lastSync="กำลังซิงค์..."
                postsScanned={4521}
              />
              <PlatformStatus
                name="TikTok"
                icon={<div className="text-pink-400 font-bold">♪</div>}
                status="active"
                lastSync="5 นาทีที่แล้ว"
                postsScanned={2189}
              />
              <PlatformStatus
                name="Pantip"
                icon={<div className="text-purple-400 font-bold">P</div>}
                status="active"
                lastSync="8 นาทีที่แล้ว"
                postsScanned={538}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
