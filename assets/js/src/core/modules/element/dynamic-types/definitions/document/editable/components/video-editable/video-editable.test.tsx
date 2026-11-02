/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { VideoEditable } from './video-editable'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('./video-editable.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ title, onClick }: any) => <button onClick={ onClick }>{title}</button>
}))
jest.mock('@Pimcore/components/editable-empty-placeholder', () => ({ EditableEmptyPlaceholder: () => <div /> }))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: () => <div /> }))
jest.mock('../editable-overlay/editable-overlay', () => ({ EditableOverlay: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/modules/element/components/video-modal/hooks/use-video-modal', () => ({
  useVideoModal: () => ({ openModal: jest.fn() })
}))
jest.mock('@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({ reloadIframe: jest.fn() })
}))
jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({
  useAssetVideoThumbnailStatusQuery: () => ({ data: undefined })
}))

// markup as rendered by Pimcore\Model\Document\Editable\Video
const renderWithMarkup = (markup: string): void => {
  const container = document.createElement('div')
  container.innerHTML = markup
  document.body.appendChild(container)

  render(
    <VideoEditable
      containerRef={ { current: container } }
      value={ { type: 'youtube', data: 'dQw4w9WgXcQ' } as any }
    />
  )
}

describe('VideoEditable', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('shows the edit button over the rendered player', () => {
    renderWithMarkup('<div id="pimcore_video_video" class="pimcore_editable_video"><iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"></iframe></div>')

    expect(screen.getByText('edit')).toBeInTheDocument()
  })

  it('shows the edit button over the editmodeImagePreview image', () => {
    renderWithMarkup('<div id="pimcore_video_video" class="pimcore_editable_video"><img src="https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"></div>')

    expect(screen.getByText('edit')).toBeInTheDocument()
  })
})
