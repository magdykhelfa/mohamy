import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddCaseDialogProps { open: boolean; onOpenChange: (open: boolean) => void; onAdd?: (data: any) => void; initialData?: any; }

const caseTypes = [{ value: 'مدني', label: 'مدني' }, { value: 'جنائي', label: 'جنائي' }, { value: 'أسرة', label: 'أسرة' }, { value: 'تجاري', label: 'تجاري' }, { value: 'عمالي', label: 'عمالي' }, { value: 'إداري', label: 'إداري' }];
const degrees = [{ value: 'ابتدائي', label: 'ابتدائي' }, { value: 'استئناف', label: 'استئناف' }, { value: 'نقض', label: 'نقض' }];
const roles = [{ value: 'مدعي', label: 'مدعي' }, { value: 'مدعى عليه', label: 'مدعى عليه' }, { value: 'مدعي بالحق المدني', label: 'مدعي بالحق المدني' }];

export default function AddCaseDialog({ open, onOpenChange, onAdd, initialData }: AddCaseDialogProps) {
  const [formData, setFormData] = useState({ number: '', title: '', type: '', client: '', court: '', department: '', opponent: '', role: '', degree: '', openDate: '', notes: '', status: 'active', nextSession: 'لم يحدد بعد' });

  useEffect(() => {
    if (initialData) { setFormData(initialData); } 
    else { setFormData({ number: '', title: '', type: '', client: '', court: '', department: '', opponent: '', role: '', degree: '', openDate: '', notes: '', status: 'active', nextSession: 'لم يحدد بعد' }); }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.number || !formData.title || !formData.type || !formData.client) { toast.error('يرجى ملء الحقول المطلوبة'); return; }
    if (onAdd) { onAdd(formData); toast.success(initialData ? 'تم تعديل القضية بنجاح' : 'تم إضافة القضية بنجاح'); }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-xl font-bold text-foreground">{initialData ? 'تعديل بيانات القضية' : 'إضافة قضية جديدة'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="number">رقم القضية *</Label><Input id="number" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} placeholder="مثال: 2024/1234" className="input-field" dir="ltr" /></div>
            <div className="space-y-2"><Label htmlFor="title">عنوان القضية *</Label><Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="وصف مختصر للقضية" className="input-field" /></div>
            <div className="space-y-2"><Label>نوع القضية *</Label><Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}><SelectTrigger className="input-field"><SelectValue placeholder="اختر نوع القضية" /></SelectTrigger><SelectContent>{caseTypes.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}</SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="client">العميل *</Label><Input id="client" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} placeholder="اسم العميل" className="input-field" /></div>
            <div className="space-y-2"><Label htmlFor="court">المحكمة</Label><Input id="court" value={formData.court} onChange={(e) => setFormData({ ...formData, court: e.target.value })} placeholder="اسم المحكمة" className="input-field" /></div>
            <div className="space-y-2"><Label htmlFor="department">الدائرة</Label><Input id="department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} placeholder="رقم الدائرة" className="input-field" /></div>
            <div className="space-y-2"><Label htmlFor="opponent">الخصم</Label><Input id="opponent" value={formData.opponent} onChange={(e) => setFormData({ ...formData, opponent: e.target.value })} placeholder="اسم الخصم" className="input-field" /></div>
            <div className="space-y-2"><Label>صفة المكتب</Label><Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}><SelectTrigger className="input-field"><SelectValue placeholder="اختر صفة المكتب" /></SelectTrigger><SelectContent>{roles.map((r) => (<SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>))}</SelectContent></Select></div>
            <div className="space-y-2"><Label>درجة التقاضي</Label><Select value={formData.degree} onValueChange={(v) => setFormData({ ...formData, degree: v })}><SelectTrigger className="input-field"><SelectValue placeholder="اختر درجة التقاضي" /></SelectTrigger><SelectContent>{degrees.map((d) => (<SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>))}</SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="openDate">تاريخ فتح القضية</Label><Input id="openDate" type="date" value={formData.openDate} onChange={(e) => setFormData({ ...formData, openDate: e.target.value })} className="input-field" /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="notes">ملاحظات</Label><Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="أي ملاحظات إضافية..." className="input-field min-h-[100px]" /></div>
          <DialogFooter className="gap-2"><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button><Button type="submit" className="btn-gold">{initialData ? 'حفظ التعديلات' : 'إضافة القضية'}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}