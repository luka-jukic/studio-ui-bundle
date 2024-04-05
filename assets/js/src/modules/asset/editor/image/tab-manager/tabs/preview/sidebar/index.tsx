import { AssetEditorSidebarManager } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/sidebar/sidebar-manager'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { AssetEditorSidebarDetailsTab } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/sidebar/tabs/details/details'

export const sidebarManager = new AssetEditorSidebarManager()

sidebarManager.registerEntry({
  key: 'details',
  icon: <Icon
    name={ 'view-details' }
    options={ { width: '16px', height: '16px' } }
        />,
  component: <AssetEditorSidebarDetailsTab />
})

sidebarManager.registerButton({
  key: 'focal-point',
  icon: <Icon
    name={ 'focal-point' }
    options={ { width: '16px', height: '16px' } }
        />,
  onClick: () => { console.log('focal-point button clicked') }
})