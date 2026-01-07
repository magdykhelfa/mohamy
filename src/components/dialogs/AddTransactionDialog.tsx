import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddTransactionDialog({ open, onOpenChange, onAdd, initialData }: any) {
  const [cases, setCases] = useState<any[]>([]);
  const [formData, setFormData] = useState({ type: 'income', amount: '', date: new Date().toISOString().split('T')[0], description: '', caseId: 'general', caseName: 'معاملة عامة', downPayment: '', remaining: '' });

  useEffect(() => { if (open) { const saved = localStorage.getItem('lawyer_cases'); if (saved) setCases(JSON.parse(saved)); } }, [open]);
  useEffect(() => { if (initialData) setFormData(initialData); else setFormData({ type: 'income', amount: '', date: new Date().toISOString().split('T')[0], description: '', caseId: 'general', caseName: 'معاملة عامة', downPayment: '', remaining: '' }); }, [initialData, open]);

  useEffect(() => { if (formData.type === 'income') { const left = (Number(formData.amount) || 0) - (Number(formData.downPayment) || 0); setFormData(prev => ({ ...prev, remaining: left.toString() })); } }, [formData.amount, formData.downPayment, formData.type]);

  const handleCaseChange = (id: string) => {
    if (id === 'general') { setFormData({ ...formData, caseId: 'general', caseName: 'معاملة عامة', amount: '', description: '' }); return; }
    const c = cases.find(x => String(x.id) === String(id));
    if (c) { setFormData({ ...formData, caseId: id, caseName: `قضية رقم ${c.number} - ${c.client}`, amount: c.fees || '', description: `أتعاب القضية` }); }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onAdd({ ...formData, amount: Number(formData.amount), downPayment: Number(formData.downPayment), remaining: Number(formData.remaining) }); setTimeout(() => { window.location.reload(); }, 300); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-right">
            {initialData ? 'تعديل بيانات المعاملة' : 'إضافة معاملة جديدة'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-right"><Label>النوع</Label><Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}><SelectTrigger className="text-right"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="income">إيراد</SelectItem><SelectItem value="expense">مصروف</SelectItem></SelectContent></Select></div>
            <div className="space-y-2 text-right"><Label>المبلغ الكلي</Label><Input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} /></div>
          </div>
          <div className="space-y-2 text-right">
            <Label>القضية المرتبطة</Label>
            <Select value={formData.caseId} onValueChange={handleCaseChange}>
              <SelectTrigger className="w-full text-right border-2"><SelectValue placeholder="اختر قضية" /></SelectTrigger>
              <SelectContent className="text-right">
                <SelectItem value="general">-- معاملة عامة --</SelectItem>
                {cases.map((c) => (<SelectItem key={c.id} value={String(c.id)}>{c.number} - {c.client}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          {formData.type === 'income' && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/40 rounded-xl border border-dashed">
              <div className="space-y-2 text-right"><Label className="text-blue-700 font-bold">المقدم</Label><Input type="number" value={formData.downPayment} onChange={(e) => setFormData({...formData, downPayment: e.target.value})} /></div>
              <div className="space-y-2 text-right"><Label className="text-orange-700 font-bold">المتبقي</Label><Input type="number" value={formData.remaining} readOnly className="bg-orange-50 font-bold" /></div>
            </div>
          )}
          <div className="space-y-2 text-right"><Label>الملاحظات</Label><Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="اكتب ملاحظة..." /></div>
          <div className="space-y-2 text-right"><Label>التاريخ</Label><Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} /></div>
          <DialogFooter>
            <Button type="submit" className="btn-gold w-full text-lg h-12 font-bold">
              {initialData ? 'حفظ التعديلات' : 'إضافة للجدول'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}