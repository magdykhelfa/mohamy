import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  FileText,
  Bell,
  UserCog,
  Search,
  FileBarChart,
  Scale,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, path: '/' },
  { id: 'clients', label: 'العملاء', icon: Users, path: '/clients' },
  { id: 'cases', label: 'القضايا', icon: Briefcase, path: '/cases' },
  { id: 'sessions', label: 'الجلسات', icon: Calendar, path: '/sessions' },
  { id: 'finance', label: 'المالية', icon: DollarSign, path: '/finance' },
  { id: 'documents', label: 'المستندات', icon: FileText, path: '/documents' },
  { id: 'alerts', label: 'التنبيهات', icon: Bell, path: '/alerts' },
  { id: 'users', label: 'المستخدمين', icon: UserCog, path: '/users' },
  { id: 'reports', label: 'التقارير', icon: FileBarChart, path: '/reports' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed right-0 top-0 h-screen bg-sidebar transition-all duration-300 z-50 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
            <Scale className="w-6 h-6 text-navy-dark" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-sidebar-foreground">المحامي</h1>
              <p className="text-xs text-sidebar-foreground/60">نظام إدارة المكتب</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`sidebar-item ${isActive ? 'active' : ''} ${
                    isCollapsed ? 'justify-center px-2' : ''
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-sidebar-primary' : ''}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          to="/settings"
          className={`sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}`}
          title={isCollapsed ? 'الإعدادات' : undefined}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>الإعدادات</span>}
        </Link>
        <button
          className={`sidebar-item w-full text-destructive hover:bg-destructive/10 ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? 'تسجيل الخروج' : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-24 w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-foreground" />
        )}
      </button>
    </aside>
  );
}
