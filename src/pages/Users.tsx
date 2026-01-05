import { useState } from 'react';
import { 
  Plus, 
  Search, 
  UserCog, 
  Shield, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'محمد أحمد',
    email: 'mohamed@lawfirm.com',
    phone: '01012345678',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-14 10:30',
    casesCount: 25,
  },
  {
    id: 2,
    name: 'سارة محمد',
    email: 'sara@lawfirm.com',
    phone: '01123456789',
    role: 'lawyer',
    status: 'active',
    lastLogin: '2024-01-14 09:15',
    casesCount: 18,
  },
  {
    id: 3,
    name: 'أحمد علي',
    email: 'ahmed@lawfirm.com',
    phone: '01234567890',
    role: 'lawyer',
    status: 'active',
    lastLogin: '2024-01-13 16:45',
    casesCount: 12,
  },
  {
    id: 4,
    name: 'فاطمة حسن',
    email: 'fatma@lawfirm.com',
    phone: '01098765432',
    role: 'secretary',
    status: 'active',
    lastLogin: '2024-01-14 08:00',
    casesCount: 0,
  },
  {
    id: 5,
    name: 'عمر سعيد',
    email: 'omar@lawfirm.com',
    phone: '01567890123',
    role: 'lawyer',
    status: 'inactive',
    lastLogin: '2024-01-01 12:00',
    casesCount: 5,
  },
];

const roleLabels = {
  admin: 'مدير المكتب',
  lawyer: 'محامي',
  secretary: 'سكرتير',
};

const roleStyles = {
  admin: 'bg-gold/10 text-gold',
  lawyer: 'bg-primary/10 text-primary',
  secretary: 'bg-muted text-muted-foreground',
};

const permissions = [
  { id: 'cases_view', label: 'عرض القضايا' },
  { id: 'cases_edit', label: 'تعديل القضايا' },
  { id: 'cases_delete', label: 'حذف القضايا' },
  { id: 'clients_view', label: 'عرض العملاء' },
  { id: 'clients_edit', label: 'تعديل العملاء' },
  { id: 'finance_view', label: 'عرض المالية' },
  { id: 'finance_edit', label: 'تعديل المالية' },
  { id: 'users_manage', label: 'إدارة المستخدمين' },
];

export default function Users() {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredUsers = selectedRole === 'all' 
    ? users 
    : users.filter(u => u.role === selectedRole);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">إدارة المستخدمين</h1>
          <p className="text-muted-foreground mt-1">إدارة المستخدمين والصلاحيات</p>
        </div>
        <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          مستخدم جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl shadow-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <UserCog className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{users.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gold/10">
            <Shield className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {users.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-sm text-muted-foreground">مدراء</p>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-success/10">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {users.filter(u => u.status === 'active').length}
            </p>
            <p className="text-sm text-muted-foreground">نشط</p>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-destructive/10">
            <XCircle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {users.filter(u => u.status === 'inactive').length}
            </p>
            <p className="text-sm text-muted-foreground">غير نشط</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl shadow-card p-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="بحث بالاسم أو البريد..."
              className="input-field pr-10 w-full"
            />
          </div>
        </div>
        <select 
          className="input-field w-auto"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="all">جميع الأدوار</option>
          <option value="admin">مدير المكتب</option>
          <option value="lawyer">محامي</option>
          <option value="secretary">سكرتير</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-card rounded-xl shadow-card p-6 hover:shadow-hover transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-br from-gold to-gold-light text-navy-dark'
                    : 'bg-gradient-to-br from-primary to-navy-light text-primary-foreground'
                }`}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  <span className={`badge-status ${roleStyles[user.role]}`}>
                    {roleLabels[user.role]}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span dir="ltr">{user.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  user.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                }`} />
                <span className="text-sm text-muted-foreground">
                  {user.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-primary" />
                </button>
                <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Section */}
      <div className="bg-card rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-gold" />
          إعدادات الصلاحيات
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-right text-sm font-medium text-foreground">
                  الصلاحية
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-foreground">
                  مدير المكتب
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-foreground">
                  محامي
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-foreground">
                  سكرتير
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {permissions.map((perm) => (
                <tr key={perm.id}>
                  <td className="px-4 py-3 text-sm text-foreground">{perm.label}</td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle className="w-5 h-5 text-success mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {perm.id.includes('delete') || perm.id === 'users_manage' ? (
                      <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-success mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {perm.id.includes('view') && !perm.id.includes('finance') ? (
                      <CheckCircle className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
