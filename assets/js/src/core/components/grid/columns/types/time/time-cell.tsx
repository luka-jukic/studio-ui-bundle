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

import React, { useEffect, useRef, useState } from 'react'
import { type DefaultCellProps } from '../../default-cell'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { TimePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { PickerRef } from 'rc-picker'
import { FormattedTime } from '@Pimcore/components/formatted-time/formatted-time'
import { useClickOutside } from '@Pimcore/utils/hooks/use-click-outside'

export const TimeCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<number>(Number(props.getValue()))
  const timePickerRef = useRef<PickerRef>(null)

  useClickOutside(timePickerRef, () => {
    disableEditMode()
  }, '.ant-picker-dropdown')

  useEffect(() => {
    if (isInEditMode) {
      setOpen(true)
      timePickerRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (value: number): void {
    setValue(value)
    fireOnUpdateCellDataEvent(String(value))
    disableEditMode()
  }

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      return (
        <FormattedTime timestamp={ value } />
      )
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape' || e.key === 'Enter') {
        disableEditMode()
      }
    }

    return (
      <>
        <TimePicker
          defaultValue={ dayjs.unix(value) }
          format="HH:mm"
          needConfirm
          onChange={ (time: Dayjs) => {
            saveValue(time.unix())
          } }
          onKeyDown={ onKeyDown }
          open={ open }
          ref={ timePickerRef }
        />
      </>
    )
  }

  return (
    <div className={ ['default-cell__content'].join(' ') }>
      {getCellContent()}
    </div>
  )
}
