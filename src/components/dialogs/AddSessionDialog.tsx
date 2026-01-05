import { useState } from 'react';
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
}

const sessionTypes = [
  { value: 'hearing', label: 'استماع' },
  { value: 'pleading', label: 'مرافعة' },
  { value: 'verdict', label: 'نطق بالحكم' },
  { value: 'conciliation', label: 'صلح' },
  { value: 'investigation', label: 'تحقيق' },
  { value: 'other', label: 'أخرى' },
];

export default function AddSessionDialog({ open, onOpenChange }: AddSessionDialogProps) {
  const [formData, setFormData] = useState({
    caseNumber: '',
    date: '',
    time: '',
    court: '',
    type: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.caseNumber || !formData.date || !formData.time) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    // Here you would typically save to database
    console.log('New session:', formData);
    toast.success('تم إضافة الجلسة بنجاح');
    
    setFormData({
      caseNumber: '',
      date: '',
      time: '',
      court: '',
      type: '',
      notes: '',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">إضافة جلسة جديدة</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="caseNumber">رقم القضية *</Label>
              <Input
                id="caseNumber"
                value={formData.caseNumber}
                onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                placeholder="مثال: 2024/1234"
                className="input-field"
                dir="ltr"
              />
            </div>
            
            <div className="space-y-2">
              <Label>نوع الجلسة</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="اختر نوع الجلسة" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">تاريخ الجلسة *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">وقت الجلسة *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="input-field"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="court">المحكمة</Label>
              <Input
                id="court"
                value={formData.court}
                onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                placeholder="اسم المحكمة والدائرة"
                className="input-field"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="ما المطلوب تحضيره أو ملاحظات..."
              className="input-field min-h-[100px]"
            />
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="btn-gold">
              إضافة الجلسة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
