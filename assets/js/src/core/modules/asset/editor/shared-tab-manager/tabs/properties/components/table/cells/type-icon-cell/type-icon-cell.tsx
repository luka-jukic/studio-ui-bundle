/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './type-icon-cell.styles'

export const TypeIconCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyles()
  const propertyType = props.row.original.type

  function renderCell (): React.JSX.Element {
    switch (propertyType) {
      case 'text':
        return <Icon name={ 'note' } />
      case 'document':
        return <Icon name={ 'mainDocument' } />
      case 'asset':
        return <Icon name={ 'mainAsset' } />
      case 'object':
        return <Icon name={ 'mainObject' } />
      case 'bool':
        return <Icon name={ 'check-done-02' } />
      case 'select':
        return <Icon name={ 'chevron-selector-vertical' } />
      default:
        return <span></span>
    }
  }

  return (
    <div className={ styles.typeIconCell }>
      {renderCell()}
    </div>
  )
}
