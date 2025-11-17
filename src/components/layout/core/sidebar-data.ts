import { INavGroup } from '@/types/sidebar.types'
import {
  LayoutDashboard,
  ListTodo,
  MessagesSquare,
  Package,
  ShieldCheck,
  Users
} from 'lucide-react'


export const sidebarData: INavGroup[] = [
  {
    title: 'General',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Tasks',
        url: '/tasks',
        icon: ListTodo,
      },
      {
        title: 'Apps',
        url: '/apps',
        icon: Package,
      },
      {
        title: 'Chats',
        url: '/chats',
        badge: '3',
        icon: MessagesSquare,
      },
      {
        title: 'Users',
        url: '/dashboard/users',
        icon: Users,
      },

    ],
  },
  {
    title: 'Pages',
    items: [
      {
        title: 'Auth',
        icon: ShieldCheck,
        items: [
          {
            title: 'Sign In',
            url: '/sign-in',
          },
          {
            title: 'Sign In (2 Col)',
            url: '/sign-in-2',
          },
          {
            title: 'Sign Up',
            url: '/sign-up',
          },
          {
            title: 'Forgot Password',
            url: '/forgot-password',
          },
          {
            title: 'OTP',
            url: '/otp',
          },
        ],
      },

    ],
  },

]
