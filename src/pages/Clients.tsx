import { useState, useMemo, useCallback, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Phone, Mail, MapPin, Briefcase, Trash2, UserPen, Eye } from 'lucide-react';
import AddClientDialog from '@/components/dialogs/AddClientDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialClients = [
  { id: 1, name: 'أحمد محمد علي', nationalId: '29012345678901', phone: '01012345678', whatsapp: '01012345678', email: 'ahmed@email.com', address: 'الجيزة، الدقي، شارع مصدق', casesCount: 3, totalDue: 25000, status: 'active' },
  { id: 2, name: 'شركة النور للتجارة', nationalId: '123456789', phone: '01123456789', whatsapp: '01123456789', email: 'info@alnour.com', address: 'القاهرة، المعادي، شارع 9', casesCount: 5, totalDue: 150000, status: 'active' },
];

export default function Clients() {
  const [clientsList, setClientsList] = useState(() => {
    const saved = localStorage.getItem('lawyer_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem('lawyer_clients', JSON.stringify(clientsList));
  }, [clientsList]);

  const filteredClients = useMemo(() => {
    return clientsList.filter((client: any) => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.nationalId.includes(searchTerm) || client.phone.includes(searchTerm);
      const matchesStatus = statusFilter === '' || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, clientsList]);

  const handleAddOrEdit = useCallback((data: any) => {
    let newList;
    if (selectedClient) {
      newList = clientsList.map((c: any) => (c.id === selectedClient.id ? { ...c, ...data } : c));
    } else {
      newList = [{ ...data, id: Date.now(), status: 'active', casesCount: 0, totalDue: 0 }, ...clientsList];
    }
    
    // حفظ البيانات في المخزن الأول
    localStorage.setItem('lawyer_clients', JSON.stringify(newList));
    
    // ريفريش للصفحة عشان نلغي أي تعليق نهائياً
    window.location.reload();
  }, [selectedClient, clientsList]);

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div><h1 className="page-title">إدارة العملاء</h1><p className="text-muted-foreground mt-1">إدارة بيانات العملاء وملفاتهم</p></div>
        <button onClick={() => { setSelectedClient(null); setIsAddDialogOpen(true); }} className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2"><Plus className="w-5 h-5" /> عميل جديد</button>
      </div>

      <div className="bg-card rounded-xl shadow-card p-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]"><div className="relative"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><input type="text" placeholder="بحث..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pr-10 w-full" /></div></div>
        <select className="input-field w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="">جميع الحالات</option><option value="active">نشط</option><option value="inactive">غير نشط</option></select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client: any) => (
          <div key={client.id} className="bg-card rounded-xl shadow-card p-6 hover:shadow-hover transition-all duration-300 group relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-navy-light flex items-center justify-center text-primary-foreground font-bold text-lg">{client.name.charAt(0)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{client.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${client.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`} />
                  </div>
                  <p className="text-sm text-muted-foreground">{client.nationalId}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><button className="p-2 hover:bg-muted rounded-lg transition-colors"><MoreVertical className="w-5 h-5 text-muted-foreground" /></button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => { setSelectedClient(client); setIsAddDialogOpen(true); }} className="flex items-center gap-2 cursor-pointer text-primary"><UserPen className="w-4 h-4" /> تعديل البيانات</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { if(window.confirm('حذف؟')) { const nl = clientsList.filter((c:any)=>c.id !== client.id); localStorage.setItem('lawyer_clients', JSON.stringify(nl)); window.location.reload(); } }} className="flex items-center gap-2 cursor-pointer text-destructive"><Trash2 className="w-4 h-4" /> حذف العميل</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="w-4 h-4" /><span dir="ltr">{client.phone}</span></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /> {client.address}</div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /><span className="text-sm font-medium text-foreground">{client.casesCount} قضايا</span></div>
              {client.totalDue > 0 && <span className="text-sm font-medium text-destructive">مستحقات: {client.totalDue.toLocaleString()} ج.م</span>}
            </div>
          </div>
        ))}
      </div>

      <AddClientDialog 
        key={selectedClient ? `edit-${selectedClient.id}` : 'new'}
        open={isAddDialogOpen} 
        onOpenChange={(open) => { setIsAddDialogOpen(open); if(!open) setSelectedClient(null); }} 
        initialData={selectedClient} 
        onAdd={handleAddOrEdit} 
      />
    </div>
  );
}