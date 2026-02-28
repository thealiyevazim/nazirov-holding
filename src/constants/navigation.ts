export type NavigationKey = 'home' | 'work' | 'blog' | 'contact'

export type NavigationItem = {
  key: NavigationKey
  href: string
}

export const navigationItems: NavigationItem[] = [
  { key: 'home', href: '#home' },
  { key: 'work', href: '#work' },
  { key: 'blog', href: '#blog' },
  { key: 'contact', href: '#contact' },
]
