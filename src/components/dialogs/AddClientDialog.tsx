import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// السطر ده هو اللي بيشيل الأخطاء الحمراء - بنعرف التايب سكريبت بالبيانات الجديدة
interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (client: any) => void;
  initialData?: any; // ده اللي كان عامل خطأ "Property does not exist"
}

export default function AddClientDialog({ open, onOpenChange, onAdd, initialData }: AddClientDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    notes: '',
  });

  // ميزته إنه بيملى الفورم أول ما تدوس تعديل ويصفره أول ما تقفل
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        nationalId: '',
        phone: '',
        whatsapp: '',
        email: '',
        address: '',
        notes: '',
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    if (onAdd) {
      onAdd(formData);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {initialData ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل *</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="أدخل اسم العميل" className="input-field" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nationalId">الرقم القومي / السجل التجاري</Label>
              <Input id="nationalId" value={formData.nationalId} onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })} placeholder="أدخل الرقم القومي" className="input-field" dir="ltr" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="01xxxxxxxxx" className="input-field" dir="ltr" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp">واتساب</Label>
              <Input id="whatsapp" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} placeholder="01xxxxxxxxx" className="input-field" dir="ltr" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="example@email.com" className="input-field" dir="ltr" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="أدخل العنوان" className="input-field" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="أي ملاحظات إضافية..." className="input-field min-h-[100px]" />
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
            <Button type="submit" className="btn-gold">{initialData ? 'حفظ التعديلات' : 'إضافة العميل'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}