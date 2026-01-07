import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddSessionDialogProps { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  onAdd?: (data: any) => void; 
  initialData?: any; // ضفنا ده عشان يستقبل بيانات الجلسة اللي بنعدلها
}

const sessionTypes = [
  { value: 'مرافعة', label: 'مرافعة' },
  { value: 'استماع', label: 'استماع' },
  { value: 'نطق بالحكم', label: 'نطق بالحكم' },
  { value: 'صلح', label: 'صلح' },
  { value: 'تحقيق', label: 'تحقيق' },
  { value: 'أخرى', label: 'أخرى' }
];

export default function AddSessionDialog({ open, onOpenChange, onAdd, initialData }: AddSessionDialogProps) {
  const [cases, setCases] = useState<any[]>([]);
  const [formData, setFormData] = useState({ 
    caseNumber: '', 
    caseTitle: '', 
    client: '', 
    date: '', 
    time: '', 
    court: '', 
    type: '', 
    notes: '' 
  });

  // الجزء السحري: بيملى البيانات لما تضغط على "تعديل"
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ caseNumber: '', caseTitle: '', client: '', date: '', time: '', court: '', type: '', notes: '' });
    }
  }, [initialData, open]);

  useEffect(() => {
    if (open) {
      const savedCases = localStorage.getItem('lawyer_cases');
      if (savedCases) setCases(JSON.parse(savedCases));
    }
  }, [open]);

  const handleCaseChange = (caseNum: string) => {
    const selectedCase = cases.find(c => c.number === caseNum);
    if (selectedCase) {
      setFormData({ ...formData, caseNumber: selectedCase.number, caseTitle: selectedCase.title, client: selectedCase.client, court: selectedCase.court });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.caseNumber || !formData.date || !formData.time) { 
      toast.error('يرجى ملء الحقول المطلوبة'); 
      return; 
    }
    if (onAdd) { onAdd(formData); }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {initialData ? 'تعديل بيانات الجلسة' : 'إضافة جلسة جديدة'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>اختيار القضية *</Label>
              <Select value={formData.caseNumber} onValueChange={handleCaseChange}>
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="اختر القضية" />
                </SelectTrigger>
                <SelectContent>
                  {cases.map((c) => (
                    <SelectItem key={c.id} value={c.number}>
                      {c.number} - {c.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>نوع الجلسة</Label>
              <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="اختر نوع الجلسة" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">تاريخ الجلسة *</Label>
              <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="input-field" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">وقت الجلسة *</Label>
              <Input id="time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="input-field" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="court">المحكمة</Label>
              <Input id="court" value={formData.court} readOnly className="input-field bg-muted cursor-not-allowed" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات القرار أو التحضير</Label>
            <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="اكتب قرار الجلسة أو ما تم فيها..." className="input-field min-h-[100px]" />
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
            <Button type="submit" className="btn-gold">
              {initialData ? 'حفظ التعديلات' : 'إضافة الجلسة'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}