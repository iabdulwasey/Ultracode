import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Plus,
  Settings,
  CreditCard,
  HelpCircle,
} from 'lucide-react';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'New Project',
    href: '/new',
    icon: Plus,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Billing',
    href: '/billing',
    icon: CreditCard,
  },
  {
    title: 'Help',
    href: '/help',
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex h-[calc(100vh-4rem)] w-64 flex-col gap-2 border-r bg-background p-4">
      <div className="flex-1">
        <nav className="grid gap-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  location.pathname === item.href && 'bg-secondary'
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t pt-4">
        <div className="rounded-lg bg-secondary p-4">
          <p className="text-sm font-medium">Free Plan</p>
          <p className="text-xs text-muted-foreground">5 credits remaining</p>
          <Button className="mt-2 w-full" size="sm">
            Upgrade
          </Button>
        </div>
      </div>
    </aside>
  );
}