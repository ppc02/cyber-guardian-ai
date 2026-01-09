import { useState } from 'react';
import { 
  Edit2, 
  Trash2, 
  ExternalLink, 
  CheckCircle, 
  Clock,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export interface NewsSource {
  id: string;
  platform: 'facebook' | 'twitter' | 'tiktok' | 'pantip';
  name: string;
  url: string;
  status: 'active' | 'syncing' | 'error';
  postsScanned: number;
  lastSync: string;
  addedAt: string;
}

interface NewsSourceTableProps {
  sources: NewsSource[];
  onUpdate: (id: string, data: Partial<NewsSource>) => void;
  onDelete: (id: string) => void;
  onRefresh: (id: string) => void;
}

const platformColors = {
  facebook: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  twitter: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  tiktok: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  pantip: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const platformNames = {
  facebook: 'Facebook',
  twitter: 'X (Twitter)',
  tiktok: 'TikTok',
  pantip: 'Pantip',
};

const statusConfig = {
  active: { label: 'กำลังทำงาน', icon: CheckCircle, color: 'text-success' },
  syncing: { label: 'กำลังซิงค์', icon: RefreshCw, color: 'text-accent' },
  error: { label: 'มีปัญหา', icon: Clock, color: 'text-destructive' },
};

export const NewsSourceTable = ({ 
  sources, 
  onUpdate, 
  onDelete,
  onRefresh 
}: NewsSourceTableProps) => {
  const [editingSource, setEditingSource] = useState<NewsSource | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const { toast } = useToast();

  const handleEdit = (source: NewsSource) => {
    setEditingSource(source);
    setEditName(source.name);
    setEditUrl(source.url);
  };

  const handleSaveEdit = () => {
    if (!editingSource) return;
    
    if (!editName.trim() || !editUrl.trim()) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบ",
        variant: "destructive",
      });
      return;
    }

    onUpdate(editingSource.id, { name: editName.trim(), url: editUrl.trim() });
    setEditingSource(null);
    toast({
      title: "อัปเดตสำเร็จ",
      description: "แก้ไขข้อมูลแหล่งข่าวเรียบร้อยแล้ว",
    });
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    onDelete(deleteId);
    setDeleteId(null);
    toast({
      title: "ลบสำเร็จ",
      description: "ลบแหล่งข่าวออกจากระบบแล้ว",
    });
  };

  if (sources.length === 0) {
    return (
      <div className="cyber-card">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            ยังไม่มีแหล่งข่าว
          </h3>
          <p className="text-sm text-muted-foreground">
            เพิ่มแหล่งข่าวจากแพลตฟอร์มด้านบนเพื่อเริ่มดึงข้อมูล
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="cyber-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            แหล่งข่าวที่เพิ่มแล้ว ({sources.length} รายการ)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>แพลตฟอร์ม</TableHead>
                <TableHead>ชื่อเพจ/บัญชี</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-center">สถานะ</TableHead>
                <TableHead className="text-center">โพสต์ที่สแกน</TableHead>
                <TableHead>ซิงค์ล่าสุด</TableHead>
                <TableHead className="text-right">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((source) => {
                const StatusIcon = statusConfig[source.status].icon;
                return (
                  <TableRow key={source.id} className="border-border">
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={platformColors[source.platform]}
                      >
                        {platformNames[source.platform]}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {source.name}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <a 
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline flex items-center gap-1 truncate"
                      >
                        <span className="truncate">{source.url}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <StatusIcon 
                          className={cn(
                            "w-4 h-4",
                            statusConfig[source.status].color,
                            source.status === 'syncing' && 'animate-spin'
                          )} 
                        />
                        <span className={cn(
                          "text-sm",
                          statusConfig[source.status].color
                        )}>
                          {statusConfig[source.status].label}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">
                        {source.postsScanned.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {source.lastSync}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onRefresh(source.id)}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            ซิงค์ใหม่
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(source)}>
                            <Edit2 className="w-4 h-4 mr-2" />
                            แก้ไข
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setDeleteId(source.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            ลบ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingSource} onOpenChange={() => setEditingSource(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>แก้ไขแหล่งข่าว</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">ชื่อเพจ/บัญชี</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="ระบุชื่อเพจหรือบัญชี"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-url">URL</Label>
              <Input
                id="edit-url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="ระบุ URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSource(null)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSaveEdit} className="gold-gradient text-primary-foreground">
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบแหล่งข่าวนี้ออกจากระบบหรือไม่? 
              การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              ลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
