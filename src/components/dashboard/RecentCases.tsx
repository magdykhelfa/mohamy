import { Briefcase, ArrowLeft } from 'lucide-react';

const cases = [
  {
    id: 1,
    number: '2024/1234',
    title: 'قضية نزاع ملكية',
    client: 'أحمد محمد علي',
    type: 'مدني',
    status: 'active',
    lastUpdate: 'منذ ساعتين',
  },
  {
    id: 2,
    number: '2024/5678',
    title: 'قضية تجارية',
    client: 'شركة النور للتجارة',
    type: 'تجاري',
    status: 'pending',
    lastUpdate: 'منذ يوم',
  },
  {
    id: 3,
    number: '2024/9012',
    title: 'قضية أحوال شخصية',
    client: 'فاطمة إبراهيم',
    type: 'أسرة',
    status: 'active',
    lastUpdate: 'منذ 3 أيام',
  },
  {
    id: 4,
    number: '2024/3456',
    title: 'قضية جنائية',
    client: 'محمود حسن',
    type: 'جنائي',
    status: 'closed',
    lastUpdate: 'منذ أسبوع',
  },
  {
    id: 5,
    number: '2024/7890',
    title: 'قضية عمالية',
    client: 'سعيد عبدالله',
    type: 'عمالي',
    status: 'active',
    lastUpdate: 'منذ يومين',
  },
];

const statusStyles = {
  active: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  closed: 'bg-muted text-muted-foreground',
};

const statusLabels = {
  active: 'نشطة',
  pending: 'معلقة',
  closed: 'منتهية',
};

const typeStyles: Record<string, string> = {
  'مدني': 'bg-blue-100 text-blue-700',
  'تجاري': 'bg-purple-100 text-purple-700',
  'أسرة': 'bg-pink-100 text-pink-700',
  'جنائي': 'bg-red-100 text-red-700',
  'عمالي': 'bg-orange-100 text-orange-700',
};

export function RecentCases() {
  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          آخر القضايا
        </h2>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          عرض الكل
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                رقم القضية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                العميل
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                النوع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                آخر تحديث
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="table-row-hover cursor-pointer">
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">{caseItem.number}</span>
                  <p className="text-sm text-muted-foreground">{caseItem.title}</p>
                </td>
                <td className="px-6 py-4 text-foreground">{caseItem.client}</td>
                <td className="px-6 py-4">
                  <span className={`badge-status ${typeStyles[caseItem.type] || 'bg-gray-100 text-gray-700'}`}>
                    {caseItem.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`badge-status ${statusStyles[caseItem.status]}`}>
                    {statusLabels[caseItem.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{caseItem.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
