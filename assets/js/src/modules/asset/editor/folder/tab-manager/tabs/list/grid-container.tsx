import React from 'react'
import { FormattedDate } from '@Pimcore/components/formatted-date/formatted-date'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { Tag } from 'antd'
import { PreviewContainer } from './grid-columns/preview-container'
import { type ApiAssetsGetCollection, type ApiAssetsGetCollectionItem } from '@Pimcore/modules/asset/asset-api'
import { useTranslation } from 'react-i18next'

interface GridContainerProps {
  assets: ApiAssetsGetCollection
}

const GridContainer = (props: GridContainerProps): React.JSX.Element => {
  const { assets } = props
  const { t } = useTranslation()
  const columnHelper = createColumnHelper<ApiAssetsGetCollectionItem>()

  const columns = [
    columnHelper.accessor('fullPath', {
      header: t('asset.asset-editor-tabs.list.columns.preview'),
      cell: info => {
        if (info.row.original.type !== 'image') {
          return <></>
        }

        return <PreviewContainer cellInfo={ info } />
      },
      id: 'preview',
      size: 110
    }),

    columnHelper.accessor('id', {
      header: t('asset.asset-editor-tabs.list.columns.id')
    }),

    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.list.columns.type')
    }),

    columnHelper.accessor('fullPath', {
      header: t('asset.asset-editor-tabs.list.columns.fullPath'),
      cell: info => (
        <Tag
          bordered={ false }
          color='processing'
        >{info.getValue()!}</Tag>
      ),
      id: 'fullPath',
      size: 300
    }),

    columnHelper.accessor('creationDate', {
      header: t('asset.asset-editor-tabs.list.columns.creationDate'),
      cell: info => <FormattedDate timestamp={ info.getValue() as number * 1000 } />
    }),

    columnHelper.accessor('modificationDate', {
      header: t('asset.asset-editor-tabs.list.columns.modificationDate'),
      cell: info => <FormattedDate timestamp={ info.getValue() as number * 1000 } />
    })
  ]

  return (
    <Grid
      columns={ columns }
      data={ assets }
      resizable
    />
  )
}

export { GridContainer }