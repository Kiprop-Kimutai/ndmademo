
import {Menu} from '../../models/menus';
import {SubMenus} from '../../models/submenus';
export const MENUS = [
      new Menu('dashboard', 'Dashboard', 'dashboard', 'link'),
      new Menu('users', 'Users', 'users', 'link'),
      new Menu('agents', 'Agent', 'agent1', 'link'),
      // tslint:disable-next-line: max-line-length
      // new Menu('stock-management', 'Stock Management', 'dashboard', 'parent', [new SubMenus('products', 'Stocked Products', 'link'), new SubMenus('purchase_order', "Purchase Order", 'link'), new SubMenus('lpolist', 'LPO List', 'link'), new SubMenus('suppliers', 'Suppliers', 'link'), new SubMenus('catalogue', 'Catalogue', 'link')]),
      // new Menu('devices', 'Devices', 'devices', 'link'),
      new Menu('devices', 'Devices', 'devices', 'parent', [
            new SubMenus('groups', 'Groups', 'link'),
            new SubMenus('list', 'Devices List', 'link')
      ]),
      // new Menu('beneficiaries', 'Beneficiaries', 'beneficiaries', 'link'),
      new Menu('beneficiaries', 'Beneficiaries', 'beneficiaries', 'link'),
      new Menu('accessories', 'Accessories', 'accessories', 'link'),
      new Menu('bulkoperations', 'Bulk Operations', 'operations', 'parent', [
            new SubMenus('upload', 'Upload Entities', 'link')
      ]),
      new Menu('firmware', 'Firmware', 'test', 'parent', [new SubMenus('saral-firmware', 'Saral Info', 'link'),
      new SubMenus('newpos-firmware', 'NewPos 9220', 'link')]),
      new Menu('reports', 'Reports', 'dashboard', 'parent', [new SubMenus('beneficiariesreport', 'Beneficiaries Report', 'link'),
      new SubMenus('disbursementreport', 'Disbursement Report Report', 'link')]),
];
