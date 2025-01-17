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

import { type ComponentType } from 'react'
import { type DefaultCellProps } from '../columns/default-cell'
import { injectable } from 'inversify'

interface ITypeRegistryConfig {
  type: string
  component: ComponentType<DefaultCellProps>
  pasteHandler?: (event: ClipboardEvent, config: DefaultCellProps) => void
  copyHandler?: (event: ClipboardEvent, config: DefaultCellProps) => boolean
}

export interface ITypeRegistry {
  registerType: (config: ITypeRegistryConfig) => void
  getComponentByType: (type: string) => ComponentType<DefaultCellProps>
  getCopyHandlerByType: (type: string) => ITypeRegistryConfig['copyHandler']
  getPasteHandlerByType: (type: string) => ITypeRegistryConfig['pasteHandler']
  getConfigByType: (type: string) => ITypeRegistryConfig
}

@injectable()
export class TypeRegistry implements ITypeRegistry {
  private readonly types: ITypeRegistryConfig[] = []

  registerType (config: ITypeRegistryConfig): void {
    this.types.push(config)
  }

  getComponentByType (type: string): ComponentType<DefaultCellProps> {
    const config = this.getConfigByType(type)

    return config.component
  }

  getCopyHandlerByType (type: string): ITypeRegistryConfig['copyHandler'] {
    const config = this.getConfigByType(type)

    return config.copyHandler
  }

  getPasteHandlerByType (type: string): ITypeRegistryConfig['pasteHandler'] {
    const config = this.getConfigByType(type)

    return config.pasteHandler
  }

  getConfigByType (type: string): ITypeRegistryConfig {
    const config = this.types.find((config) => config.type === type)

    if (config === undefined) {
      throw new Error(`Type ${type} not found`)
    }

    return config
  }
}
