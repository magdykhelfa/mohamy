import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Phone, Mail, MapPin, Briefcase } from 'lucide-react';

const clients = [
  {
    id: 1,
    name: 'أحمد محمد علي',
    nationalId: '29012345678901',
    phone: '01012345678',
    whatsapp: '01012345678',
    email: 'ahmed@email.com',
    address: 'الجيزة، الدقي، شارع مصدق',
    casesCount: 3,
    totalDue: 25000,
    status: 'active',
  },
  {
    id: 2,
    name: 'شركة النور للتجارة',
    nationalId: '123456789',
    phone: '01123456789',
    whatsapp: '01123456789',
    email: 'info@alnour.com',
    address: 'القاهرة، المعادي، شارع 9',
    casesCount: 5,
    totalDue: 150000,
    status: 'active',
  },
  {
    id: 3,
    name: 'فاطمة إبراهيم حسن',
    nationalId: '28512345678901',
    phone: '01234567890',
    whatsapp: '01234567890',
    email: 'fatma@email.com',
    address: 'الإسكندرية، سموحة',
    casesCount: 1,
    totalDue: 0,
    status: 'inactive',
  },
  {
    id: 4,
    name: 'محمود حسن سعيد',
    nationalId: '27812345678901',
    phone: '01098765432',
    whatsapp: '01098765432',
    email: 'mahmoud@email.com',
    address: 'المنصورة، شارع الجيش',
    casesCount: 2,
    totalDue: 45000,
    status: 'active',
  },
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">إدارة العملاء</h1>
          <p className="text-muted-foreground mt-1">إدارة بيانات العملاء وملفاتهم</p>
        </div>
        <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          عميل جديد
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl shadow-card p-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="بحث بالاسم أو الرقم القومي أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pr-10 w-full"
            />
          </div>
        </div>
        <select className="input-field w-auto">
          <option value="">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          فلاتر إضافية
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-card rounded-xl shadow-card p-6 hover:shadow-hover transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-navy-light flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{client.nationalId}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span dir="ltr">{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{client.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{client.casesCount} قضايا</span>
              </div>
              {client.totalDue > 0 && (
                <span className="text-sm font-medium text-destructive">
                  مستحقات: {client.totalDue.toLocaleString()} ج.م
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
