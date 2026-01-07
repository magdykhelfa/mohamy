import { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Calendar, Clock, MapPin, ChevronRight, ChevronLeft, Trash2, Edit2, MoreVertical } from 'lucide-react';
import AddSessionDialog from '@/components/dialogs/AddSessionDialog';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialSessions = [
  { id: 1, date: '2026-01-15', time: '10:00', caseNumber: '2024/1234', caseTitle: 'قضية نزاع ملكية', client: 'أحمد محمد علي', court: 'محكمة الجيزة الابتدائية', type: 'مرافعة', status: 'upcoming', notes: 'تقديم مذكرة دفاع' },
];

export default function Sessions() {
  const [sessionsList, setSessionsList] = useState(() => { 
    const saved = localStorage.getItem('lawyer_sessions'); 
    return saved ? JSON.parse(saved) : initialSessions; 
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);

  const monthName = currentDate.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });
  const todayStr = new Date().toISOString().split('T')[0];

  const days = useMemo(() => {
    const year = currentDate.getFullYear(); 
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const d = [];
    for (let i = 0; i < firstDayOfMonth; i++) d.push(null);
    for (let i = 1; i <= daysInMonth; i++) d.push(i);
    return d;
  }, [currentDate]);

  const filteredSessions = useMemo(() => {
    return sessionsList.filter((s: any) => 
      s.caseNumber?.includes(searchTerm) || 
      s.client?.includes(searchTerm) || 
      s.caseTitle?.includes(searchTerm)
    );
  }, [searchTerm, sessionsList]);

  const handleAddOrUpdateSession = (data: any) => {
    let newList;
    if (editingSession) {
      newList = sessionsList.map((s: any) => s.id === editingSession.id ? { ...data, id: s.id } : s);
      toast.success('تم تحديث الجلسة بنجاح');
    } else {
      newList = [{ ...data, id: Date.now(), status: 'upcoming' }, ...sessionsList];
      toast.success('تم إضافة الجلسة بنجاح');
    }
    
    localStorage.setItem('lawyer_sessions', JSON.stringify(newList));
    setSessionsList(newList);
    setEditingSession(null);
    setIsAddDialogOpen(false);
    
    // ريفريش لضمان تحديث التقويم والجدول معاً
    setTimeout(() => { window.location.reload(); }, 500);
  };

  const deleteSession = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
      const newList = sessionsList.filter((s: any) => s.id !== id);
      localStorage.setItem('lawyer_sessions', JSON.stringify(newList));
      setSessionsList(newList);
      toast.error('تم حذف الجلسة');
      setTimeout(() => { window.location.reload(); }, 500);
    }
  };

  const openEditDialog = (session: any) => {
    setEditingSession(session);
    setIsAddDialogOpen(true);
  };

  const changeMonth = (offset: number) => { 
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)); 
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">الجلسات والمواعيد</h1>
          <p className="text-muted-foreground mt-1">إدارة مواعيد المحاكم والأجندة القانونية</p>
        </div>
        <button 
          onClick={() => { setEditingSession(null); setIsAddDialogOpen(true); }} 
          className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> جلسة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Area */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">{monthName}</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => changeMonth(1)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(d => (
              <div key={d} className="text-center text-xs text-muted-foreground py-2 font-bold">{d}</div>
            ))}
            {days.map((day, i) => {
              if (day === null) return <div key={i} className="h-16" />;
              const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
              const daySessions = sessionsList.filter((s: any) => s.date === dateStr);
              const isToday = dateStr === todayStr;
              
              return (
                <div 
                  key={i} 
                  className={`h-16 p-1 rounded-md border text-right transition-all ${
                    isToday ? 'bg-primary text-primary-foreground border-primary' : 
                    daySessions.length > 0 ? 'bg-gold/10 border-gold/30' : 'border-border'
                  }`}
                >
                  <span className="text-xs font-bold">{day}</span>
                  {daySessions.slice(0, 1).map((s: any) => (
                    <div key={s.id} className="text-[8px] mt-1 p-0.5 bg-background/40 rounded truncate">
                      {s.time} | {s.caseNumber}
                    </div>
                  ))}
                  {daySessions.length > 1 && <div className="text-[7px] text-center mt-0.5">+{daySessions.length - 1} أخرى</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Sidebar */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden border border-border">
          <div className="p-4 border-b bg-primary text-primary-foreground text-center font-bold uppercase tracking-wider">جلسات اليوم</div>
          <div className="divide-y divide-border overflow-y-auto max-h-[420px]">
            {sessionsList.filter((s: any) => s.date === todayStr).length > 0 ? (
              sessionsList.filter((s: any) => s.date === todayStr).map((s: any) => (
                <div key={s.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between font-bold text-xs mb-1">
                    <span className="text-foreground">{s.caseNumber}</span>
                    <span className="text-gold">{s.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1"><MapPin className="inline w-3 h-3 ml-1" />{s.court}</p>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-xs text-muted-foreground">لا يوجد جلسات مسجلة لتاريخ اليوم</div>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden border border-border">
        <div className="p-4 border-b flex flex-wrap justify-between items-center gap-4">
          <h2 className="font-bold text-lg">جدول الجلسات التفصيلي</h2>
          <div className="relative">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="بحث برقم القضية أو العميل..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="input-field pr-9 py-2 text-sm w-72" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="p-4 font-semibold">التاريخ والوقت</th>
                <th className="p-4 font-semibold">القضية</th>
                <th className="p-4 font-semibold">العميل</th>
                <th className="p-4 font-semibold">المحكمة</th>
                <th className="p-4 font-semibold">النوع</th>
                <th className="p-4 font-semibold">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSessions.map((s: any) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" />{s.date}</div>
                    <div className="text-xs text-muted-foreground mt-1"><Clock className="w-3 h-3 inline ml-1" />{s.time}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-foreground">{s.caseNumber}</div>
                    <div className="text-xs text-muted-foreground">{s.caseTitle}</div>
                  </td>
                  <td className="p-4 font-medium">{s.client}</td>
                  <td className="p-4 text-xs text-muted-foreground">{s.court}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-bold">{s.type}</span>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1 hover:bg-muted rounded-full">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => openEditDialog(s)} className="cursor-pointer flex items-center gap-2">
                          <Edit2 className="w-3.5 h-3.5" /> تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteSession(s.id)} className="cursor-pointer flex items-center gap-2 text-destructive">
                          <Trash2 className="w-3.5 h-3.5" /> حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSessions.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">لم يتم العثور على أي جلسات مطابقة للبحث</div>
          )}
        </div>
      </div>

      <AddSessionDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
        onAdd={handleAddOrUpdateSession} 
        initialData={editingSession} 
      />
    </div>
  );
}