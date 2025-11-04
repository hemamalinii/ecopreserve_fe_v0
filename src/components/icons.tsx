import * as React from 'react';
import { Loader2, Lock, LogOut, Mail, ShieldCheck, User, Wallet, Camera, Home, IdCard, AlertCircle, CheckCircle, ChevronRight, CreditCard, FileText, Settings, Bell, X, Plus, Minus, ChevronDown, ChevronUp, Check, Copy, ExternalLink, Link as LinkIcon, Menu, Moon, Sun, Laptop } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  spinner: Loader2,
  user: User,
  mail: Mail,
  lock: Lock,
  wallet: Wallet,
  camera: Camera,
  home: Home,
  idCard: IdCard,
  alertCircle: AlertCircle,
  checkCircle: CheckCircle,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  creditCard: CreditCard,
  fileText: FileText,
  settings: Settings,
  bell: Bell,
  x: X,
  plus: Plus,
  minus: Minus,
  check: Check,
  copy: Copy,
  externalLink: ExternalLink,
  link: LinkIcon,
  menu: Menu,
  moon: Moon,
  sun: Sun,
  laptop: Laptop,
  logOut: LogOut,
  shieldCheck: ShieldCheck,
  swap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
  ),
  verified: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  ),
};
