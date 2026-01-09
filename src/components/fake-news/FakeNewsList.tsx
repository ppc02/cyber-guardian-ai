import { useState } from 'react';
import { Search, Filter, Eye, Trash2, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockData = [
  {
    id: '1',
    title: 'ข่าวปลอมเกี่ยวกับการแจกเงินจากรัฐบาล',
    category: 'การเงิน',
    dateAdded: '2024-01-15',
    matchCount: 23,
    status: 'active',
  },
  {
    id: '2',
    title: 'ข่าวหลอกลวงเรื่องผลิตภัณฑ์สุขภาพ',
    category: 'สุขภาพ',
    dateAdded: '2024-01-14',
    matchCount: 45,
    status: 'active',
  },
  {
    id: '3',
    title: 'แชร์ลูกโซ่หลอกลวงการลงทุน',
    category: 'การลงทุน',
    dateAdded: '2024-01-13',
    matchCount: 89,
    status: 'active',
  },
  {
    id: '4',
    title: 'ข่าวปลอมเกี่ยวกับภัยพิบัติ',
    category: 'ทั่วไป',
    dateAdded: '2024-01-12',
    matchCount: 12,
    status: 'archived',
  },
];

export const FakeNewsList = () => {
  const [search, setSearch] = useState('');

  const filteredData = mockData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cyber-card">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาข่าวปลอม..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          ตัวกรอง
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>หัวข้อ</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead>วันที่เพิ่ม</TableHead>
              <TableHead className="text-center">ตรวจพบ</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead className="text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="border-border">
                <TableCell className="font-medium max-w-xs truncate">
                  {item.title}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.category}</Badge>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {item.dateAdded}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="outline" 
                    className={item.matchCount > 50 ? 'border-destructive text-destructive' : ''}
                  >
                    {item.matchCount} ครั้ง
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={item.status === 'active' 
                      ? 'bg-success/20 text-success hover:bg-success/30' 
                      : 'bg-muted text-muted-foreground'
                    }
                  >
                    {item.status === 'active' ? 'ใช้งาน' : 'เก็บถาวร'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          ไม่พบข้อมูลที่ค้นหา
        </div>
      )}
    </div>
  );
};
