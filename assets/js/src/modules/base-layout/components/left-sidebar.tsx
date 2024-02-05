import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useStlyes } from './left-sidebar.styles'

export const LeftSidebar = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={styles.leftSidebar}>
      <Avatar className='left-sidebar__avatar' size={26} icon={<UserOutlined />} />
    </div>
  )
}
