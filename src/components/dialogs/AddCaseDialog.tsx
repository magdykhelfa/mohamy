import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const caseTypes = [
  { value: 'civil', label: 'مدني' },
  { value: 'criminal', label: 'جنائي' },
  { value: 'family', label: 'أسرة' },
  { value: 'commercial', label: 'تجاري' },
  { value: 'labor', label: 'عمالي' },
  { value: 'administrative', label: 'إداري' },
];

const degrees = [
  { value: 'first', label: 'ابتدائي' },
  { value: 'appeal', label: 'استئناف' },
  { value: 'cassation', label: 'نقض' },
];

const roles = [
  { value: 'plaintiff', label: 'مدعي' },
  { value: 'defendant', label: 'مدعى عليه' },
  { value: 'civilRight', label: 'مدعي بالحق المدني' },
];

export default function AddCaseDialog({ open, onOpenChange }: AddCaseDialogProps) {
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    type: '',
    client: '',
    court: '',
    department: '',
    opponent: '',
    role: '',
    degree: '',
    openDate: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.number || !formData.title || !formData.type || !formData.client) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    // Here you would typically save to database
    console.log('New case:', formData);
    toast.success('تم إضافة القضية بنجاح');
    
    setFormData({
      number: '',
      title: '',
      type: '',
      client: '',
      court: '',
      department: '',
      opponent: '',
      role: '',
      degree: '',
      openDate: '',
      notes: '',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">إضافة قضية جديدة</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">رقم القضية *</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="مثال: 2024/1234"
                className="input-field"
                dir="ltr"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">عنوان القضية *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="وصف مختصر للقضية"
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <Label>نوع القضية *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="اختر نوع القضية" />
                </SelectTrigger>
                <SelectContent>
                  {caseTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client">العميل *</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="اسم العميل"
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="court">المحكمة</Label>
              <Input
                id="court"
                value={formData.court}
                onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                placeholder="اسم المحكمة"
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">الدائرة</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="رقم الدائرة"
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="opponent">الخصم</Label>
              <Input
                id="opponent"
                value={formData.opponent}
                onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                placeholder="اسم الخصم"
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <Label>صفة المكتب</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="اختر صفة المكتب" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>درجة التقاضي</Label>
              <Select value={formData.degree} onValueChange={(value) => setFormData({ ...formData, degree: value })}>
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="اختر درجة التقاضي" />
                </SelectTrigger>
                <SelectContent>
                  {degrees.map((degree) => (
                    <SelectItem key={degree.value} value={degree.value}>
                      {degree.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="openDate">تاريخ فتح القضية</Label>
              <Input
                id="openDate"
                type="date"
                value={formData.openDate}
                onChange={(e) => setFormData({ ...formData, openDate: e.target.value })}
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
              placeholder="أي ملاحظات إضافية..."
              className="input-field min-h-[100px]"
            />
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="btn-gold">
              إضافة القضية
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
