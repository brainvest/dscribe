/** Ribbon (admin) navigation model: tabs -> groups -> commands. */
export interface RibbonCommand {
  label: string;
  icon: string;
  /** Router link; commands without one are inert placeholders. */
  link?: string;
  /** Large button in the group, vs. a small stacked one. */
  size?: 'large' | 'small';
  /** Only enabled while grid rows are selected. */
  needsSelection?: boolean;
}

export interface RibbonGroup {
  label: string;
  commands: RibbonCommand[];
}

export interface RibbonTab {
  label: string;
  groups: RibbonGroup[];
}

export const ADMIN_RIBBON: RibbonTab[] = [
  {
    label: 'Home',
    groups: [
      {
        label: 'Catalog',
        commands: [
          { label: 'Products', icon: 'inventory_2', link: '/admin/products', size: 'large' },
          { label: 'Categories', icon: 'category' },
          { label: 'Suppliers', icon: 'local_shipping' },
          { label: 'Price lists', icon: 'sell' },
        ],
      },
      {
        label: 'Clipboard',
        commands: [
          { label: 'Paste', icon: 'content_paste', size: 'large' },
          { label: 'Cut', icon: 'content_cut' },
          { label: 'Copy', icon: 'content_copy' },
          { label: 'Format', icon: 'format_paint' },
        ],
      },
      {
        label: 'Records',
        commands: [
          { label: 'Import', icon: 'upload_file', size: 'large' },
          { label: 'Export', icon: 'download', size: 'large' },
          { label: 'Merge', icon: 'merge' },
          { label: 'Archive', icon: 'archive' },
        ],
      },
    ],
  },
  {
    label: 'Data',
    groups: [
      {
        label: 'Query',
        commands: [
          { label: 'Saved views', icon: 'bookmarks', size: 'large' },
          { label: 'Advanced filter', icon: 'filter_alt', size: 'large' },
          { label: 'Group by', icon: 'workspaces' },
          { label: 'Columns', icon: 'view_column' },
        ],
      },
      {
        label: 'Validation',
        commands: [
          { label: 'Run checks', icon: 'rule', size: 'large' },
          { label: 'Duplicates', icon: 'difference' },
          { label: 'Orphans', icon: 'link_off' },
        ],
      },
    ],
  },
  {
    label: 'Reports',
    groups: [
      {
        label: 'Build',
        commands: [
          { label: 'New report', icon: 'lab_profile', size: 'large' },
          { label: 'Schedule', icon: 'schedule_send', size: 'large' },
          { label: 'Templates', icon: 'dashboard_customize' },
          { label: 'Subscriptions', icon: 'mark_email_read' },
        ],
      },
      {
        label: 'Analyse',
        commands: [
          { label: 'Pivot', icon: 'pivot_table_chart', size: 'large' },
          { label: 'Chart', icon: 'insert_chart' },
          { label: 'Trend', icon: 'trending_up' },
        ],
      },
    ],
  },
  {
    label: 'Admin',
    groups: [
      {
        label: 'Access',
        commands: [
          { label: 'Users', icon: 'group', size: 'large' },
          { label: 'Roles', icon: 'admin_panel_settings', size: 'large' },
          { label: 'Permissions', icon: 'key' },
          { label: 'Audit log', icon: 'history_toggle_off' },
        ],
      },
      {
        label: 'System',
        commands: [
          { label: 'Settings', icon: 'settings', size: 'large' },
          { label: 'Integrations', icon: 'hub' },
          { label: 'Jobs', icon: 'conveyor_belt' },
          { label: 'Health', icon: 'monitor_heart' },
        ],
      },
    ],
  },
];

/** Drawer (end-user) navigation model. */
export interface DrawerItem {
  label: string;
  icon: string;
  link?: string;
  badge?: string;
}

export interface DrawerSection {
  label: string;
  items: DrawerItem[];
}

export const USER_DRAWER: DrawerSection[] = [
  {
    label: 'Discover',
    items: [
      { label: 'My collection', icon: 'auto_awesome', link: '/app/collection' },
      { label: 'Highlights', icon: 'star', badge: '3' },
      { label: 'Recently viewed', icon: 'history' },
      { label: 'Saved', icon: 'bookmark' },
    ],
  },
  {
    label: 'Activity',
    items: [
      { label: 'Messages', icon: 'forum', badge: '12' },
      { label: 'Notifications', icon: 'notifications' },
      { label: 'Tasks', icon: 'checklist' },
      { label: 'Calendar', icon: 'event' },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', icon: 'account_circle' },
      { label: 'Preferences', icon: 'tune' },
      { label: 'Help centre', icon: 'help' },
    ],
  },
];
