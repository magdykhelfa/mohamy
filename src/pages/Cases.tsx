import { useState, useMemo, useEffect, useCallback } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, Calendar, User, Building } from 'lucide-react';
import AddCaseDialog from '@/components/dialogs/AddCaseDialog';

const initialCases = [
  { id: 1, number: '2024/1234', title: 'قضية نزاع ملكية عقارية', type: 'مدني', client: 'أحمد محمد علي', court: 'محكمة الجيزة الابتدائية', department: 'الدائرة 15 مدني', opponent: 'محمود سعيد إبراهيم', role: 'مدعي', degree: 'ابتدائي', openDate: '2024-01-01', status: 'active', nextSession: '2024-01-20', lawyer: 'محمد أحمد' },
  { id: 2, number: '2024/5678', title: 'قضية شيك بدون رصيد', type: 'جنائي', client: 'شركة النور للتجارة', court: 'محكمة الجنح المستأنفة', department: 'الدائرة 8 جنح', opponent: 'علي حسن محمد', role: 'مدعي بالحق المدني', degree: 'استئناف', openDate: '2023-11-15', status: 'active', nextSession: '2024-01-18', lawyer: 'محمد أحمد' },
  { id: 3, number: '2024/9012', title: 'قضية نفقة', type: 'أسرة', client: 'فاطمة إبراهيم حسن', court: 'محكمة الأسرة بالجيزة', department: 'الدائرة 3 أسرة', opponent: 'حسن محمود علي', role: 'مدعية', degree: 'ابتدائي', openDate: '2024-01-10', status: 'pending', nextSession: '2024-02-05', lawyer: 'سارة محمد' },
];

const typeColors: Record<string, string> = { 'مدني': 'bg-blue-100 text-blue-700', 'جنائي': 'bg-red-100 text-red-700', 'أسرة': 'bg-pink-100 text-pink-700', 'تجاري': 'bg-purple-100 text-purple-700', 'عمالي': 'bg-orange-100 text-orange-700', 'إداري': 'bg-teal-100 text-teal-700' };
const statusStyles: Record<string, string> = { active: 'bg-success/10 text-success', pending: 'bg-warning/10 text-warning', closed: 'bg-muted text-muted-foreground' };
const statusLabels: Record<string, string> = { active: 'نشطة', pending: 'معلقة', closed: 'منتهية' };

export default function Cases() {
  const [casesList, setCasesList] = useState(() => { const saved = localStorage.getItem('lawyer_cases'); return saved ? JSON.parse(saved) : initialCases; });
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  useEffect(() => { localStorage.setItem('lawyer_cases', JSON.stringify(casesList)); }, [casesList]);

  const filteredCases = useMemo(() => {
    return casesList.filter((c: any) => {
      const matchesSearch = c.number.includes(searchTerm) || c.client.toLowerCase().includes(searchTerm.toLowerCase()) || c.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === '' || c.type === typeFilter;
      const matchesStatus = statusFilter === '' || c.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter, casesList]);

  const handleAddOrEdit = useCallback((data: any) => {
    const newList = selectedCase ? casesList.map((c: any) => (c.id === selectedCase.id ? { ...c, ...data } : c)) : [{ ...data, id: Date.now(), status: data.status || 'active' }, ...casesList];
    localStorage.setItem('lawyer_cases', JSON.stringify(newList));
    window.location.reload();
  }, [selectedCase, casesList]);

  const handleDelete = (id: number) => { if (window.confirm('هل أنت متأكد من حذف هذه القضية؟')) { const nl = casesList.filter((c: any) => c.id !== id); localStorage.setItem('lawyer_cases', JSON.stringify(nl)); window.location.reload(); } };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div><h1 className="page-title">إدارة القضايا</h1><p className="text-muted-foreground mt-1">عرض وإدارة جميع القضايا</p></div>
        <button onClick={() => { setSelectedCase(null); setIsAddDialogOpen(true); }} className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2"><Plus className="w-5 h-5" /> قضية جديدة</button>
      </div>

      <div className="bg-card rounded-xl shadow-card p-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]"><div className="relative"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><input type="text" placeholder="بحث برقم القضية أو اسم العميل..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pr-10 w-full" /></div></div>
        <select className="input-field w-auto" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="">جميع الأنواع</option><option value="مدني">مدني</option><option value="جنائي">جنائي</option><option value="أسرة">أسرة</option><option value="تجاري">تجاري</option><option value="عمالي">عمالي</option><option value="إداري">إداري</option></select>
        <select className="input-field w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="">جميع الحالات</option><option value="active">نشطة</option><option value="pending">معلقة</option><option value="closed">منتهية</option></select>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-muted/50 text-right text-xs font-medium text-muted-foreground uppercase"><th className="px-6 py-4">رقم القضية</th><th className="px-6 py-4">العميل</th><th className="px-6 py-4">النوع</th><th className="px-6 py-4">المحكمة</th><th className="px-6 py-4">الحالة</th><th className="px-6 py-4">الجلسة القادمة</th><th className="px-6 py-4">إجراءات</th></tr></thead>
            <tbody className="divide-y divide-border">
              {filteredCases.map((caseItem: any) => (
                <tr key={caseItem.id} className="table-row-hover">
                  <td className="px-6 py-4"><div><span className="font-semibold text-foreground">{caseItem.number}</span><p className="text-sm text-muted-foreground mt-0.5">{caseItem.title}</p></div></td>
                  <td className="px-6 py-4"><div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /><span className="text-foreground">{caseItem.client}</span></div></td>
                  <td className="px-6 py-4"><span className={`badge-status ${typeColors[caseItem.type] || 'bg-gray-100'}`}>{caseItem.type}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center gap-2"><Building className="w-4 h-4 text-muted-foreground" /><div><span className="text-foreground text-sm">{caseItem.court}</span><p className="text-xs text-muted-foreground">{caseItem.department}</p></div></div></td>
                  <td className="px-6 py-4"><span className={`badge-status ${statusStyles[caseItem.status]}`}>{statusLabels[caseItem.status]}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span className="text-foreground">{caseItem.nextSession}</span></div></td>
                  <td className="px-6 py-4"><div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => { setSelectedCase(caseItem); setIsAddDialogOpen(true); }} className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(caseItem.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddCaseDialog key={selectedCase ? `edit-${selectedCase.id}` : 'new'} open={isAddDialogOpen} onOpenChange={(o) => { setIsAddDialogOpen(o); if (!o) setSelectedCase(null); }} initialData={selectedCase} onAdd={handleAddOrEdit} />
    </div>
  );
}