import { MainLayout } from '@/components/layout/MainLayout';
import { FakeNewsForm } from '@/components/fake-news/FakeNewsForm';
import { FakeNewsList } from '@/components/fake-news/FakeNewsList';

const FakeNewsDB = () => {
  return (
    <MainLayout 
      title="ฐานข้อมูลข่าวปลอม" 
      description="ระบบย่อยที่ 2 - บันทึกและจัดการข่าวปลอมที่ตรวจสอบแล้ว"
    >
      <div className="space-y-6 animate-fade-in">
        <div className="cyber-card p-4 bg-destructive/5 border-destructive/30">
          <p className="text-sm text-muted-foreground">
            <span className="text-destructive font-medium">หมายเหตุ:</span> เฉพาะข่าวที่ผ่านการตรวจสอบโดยเจ้าหน้าที่แล้วเท่านั้น 
            ข้อมูลในฐานข้อมูลนี้จะถูกใช้เป็นตัวเปรียบเทียบเพื่อตรวจจับข่าวปลอมในระบบย่อยที่ 3
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <FakeNewsForm />
          </div>
          <div className="lg:col-span-2">
            <FakeNewsList />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FakeNewsDB;
