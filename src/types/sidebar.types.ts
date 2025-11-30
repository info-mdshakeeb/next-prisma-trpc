import { LinkProps } from "next/link"


type BaseNavItem = {
  title: string
  badge?: string
  icon?: React.ElementType
}

type INavLink = BaseNavItem & {
  url: LinkProps<string>['href'] | (string & {})
  items?: never
  activePaths?: string[]
}

type INavCollapsible = BaseNavItem & {
  items: (BaseNavItem & {
    activePaths?: string[]
    url: LinkProps<string>['href'] | (string & {})
  })[]
  activePaths?: string[]
  url?: never
}

type INavItem = INavCollapsible | INavLink

type INavGroup = {
  title: string
  items: INavItem[]
  activePaths?: string[];
}

export type { INavCollapsible, INavGroup, INavItem, INavLink }

