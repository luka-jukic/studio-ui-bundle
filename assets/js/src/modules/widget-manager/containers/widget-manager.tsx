import React, { useEffect } from 'react'
import { WidgetManager as WidgetManagerView } from '../components/widget-manager'
import { widgetManagerFactory } from '../utils/widget-manager-factory'
import { Actions, type ITabRenderValues, Model, type TabNode, type TabSetNode } from 'flexlayout-react'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store/index'
import { selectModel, updateModel } from '../store/widget-manager-slice'
import { getTabTokens } from '../components/widget-manager.styles'
import { theme } from 'antd'
import { WidgetTabTitle } from './widget-tab-title'

const { useToken } = theme

export const WidgetManager = (): React.JSX.Element => {
  const modelJson = useAppSelector(selectModel)
  const dispatch = useAppDispatch()
  const model = Model.fromJson(modelJson)
  const bottomTabset = model.getNodeById('bottom_tabset') as TabSetNode
  const { token } = useToken()

  useEffect(() => {
    const tabToken = getTabTokens(token)

    model.doAction(Actions.updateModelAttributes({
      tabSetTabStripHeight: tabToken.cardHeight,
      tabSetTabHeaderHeight: tabToken.cardHeight,
      borderBarSize: 50
    }))
  }, [])

  if (bottomTabset.getChildren().length === 0) {
    model.doAction(Actions.updateNodeAttributes(bottomTabset.getId(), { height: -8 }))
  } else if (bottomTabset.getHeight() === -8) {
    model.doAction(Actions.updateNodeAttributes(bottomTabset.getId(), { height: 200 }))
  }

  function onModelChange (model: Model): void {
    dispatch(updateModel(model.toJson()))
  }

  function onRenderTab (node: TabNode, renderValues: ITabRenderValues): void {
    renderValues.content = <WidgetTabTitle node={node} />
    renderValues.leading = <></>
  }

  return (
    <WidgetManagerView model={model} factory={widgetManagerFactory} onModelChange={onModelChange} onRenderTab={onRenderTab} />
  )
}
