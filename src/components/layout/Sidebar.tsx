import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Radar, 
  Database, 
  AlertTriangle, 
  Search,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/' 
  },
  { 
    id: 'data-fetch', 
    label: 'ดึงข้อมูลข่าวสาร', 
    icon: Radar, 
    path: '/data-fetch',
    description: 'ระบบย่อยที่ 1'
  },
  { 
    id: 'fake-news-db', 
    label: 'ฐานข้อมูลข่าวปลอม', 
    icon: Database, 
    path: '/fake-news-db',
    description: 'ระบบย่อยที่ 2'
  },
  { 
    id: 'detection', 
    label: 'ตรวจจับและแจ้งเตือน', 
    icon: AlertTriangle, 
    path: '/detection',
    description: 'ระบบย่อยที่ 3'
  },
  { 
    id: 'manual-check', 
    label: 'ตรวจสอบด้วยตนเอง', 
    icon: Search, 
    path: '/manual-check' 
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center cyber-glow">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg text-foreground">บช.สอท.</h1>
              <p className="text-xs text-muted-foreground">ตำรวจไซเบอร์</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            AI-Threat Detection
          </p>
        )}
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "nav-link group",
                isActive && "active"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!collapsed && (
                <div className="flex-1 animate-fade-in">
                  <span className={cn(
                    "block font-medium",
                    isActive ? "text-primary" : ""
                  )}>
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Settings & Collapse */}
      <div className="p-3 border-t border-border space-y-1">
        <Link to="/settings" className="nav-link group">
          <Settings className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          {!collapsed && <span>ตั้งค่าระบบ</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-link w-full group"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              <span>ย่อเมนู</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
