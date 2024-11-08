export interface MenuFooterItem {
  label: string; // The display text of the menu item
  path: string; // The URL path the menu item should link to
}

export interface MenuFooterModel {
  items: MenuFooterItem[]; // Array of objects containing label and path
}
