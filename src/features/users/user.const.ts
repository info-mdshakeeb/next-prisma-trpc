import { Shield, UserCheck, Users } from 'lucide-react'

export const roles = [
  {
    label: 'Superadmin',
    value: 'SUPERADMIN',
    icon: Shield,
  },
  {
    label: 'Admin',
    value: 'ADMIN',
    icon: UserCheck,
  },
  {
    label: 'User',
    value: 'USER',
    icon: Users,
  },

] as const
