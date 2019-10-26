
import {Menu} from '../../models/menus';
import {SubMenus} from '../../models/submenus';
export const MENUS = [
      new Menu('dashboard', 'Dashboard', 'dashboard', 'link', true, 'caret_down'),
      new Menu('users', 'Users', 'users', 'link', true, 'caret_down'),
      new Menu('agents', 'Agent', 'agent1', 'link', true, 'caret_down'),
      new Menu('devices', 'Devices', 'devices', 'parent', true, 'caret_down', [
            new SubMenus('groups', 'Groups', 'link'),
            new SubMenus('list', 'Devices List', 'link')
      ]),
      new Menu('beneficiaries', 'Beneficiaries', 'beneficiaries', 'link', true, 'caret_down'),
      new Menu('accessories', 'Accessories', 'accessories', 'link', true, 'caret_down'),
      new Menu('regions', 'Regions Management', 'devices', 'link', true, 'caret_down'),
      new Menu('bulkoperations', 'Bulk Operations', 'operations', 'parent', true, 'caret_down', [
            new SubMenus('upload', 'Upload Entities', 'link')
      ]),
      /*new Menu('firmware', 'Firmware', 'test', 'parent', true, 'caret_down', [new SubMenus('saral-firmware', 'Saral Info', 'link'),
      new SubMenus('newpos-firmware', 'NewPos 9220', 'link')]),*/
      new Menu('firmware', 'Firmware', 'test', 'link', true, 'caret_down'),
      new Menu('reports', 'Reports', 'dashboard', 'parent', true, 'caret_down', [new SubMenus('beneficiariesreport',
      'Beneficiaries Report', 'link'),
      new SubMenus('disbursementreport', 'Disbursement Report Report', 'link')]),
];
