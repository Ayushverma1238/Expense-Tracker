import React from 'react'
import { getInitial } from '../../utils/helper'

const ChatAvatar = ({fullName, width, height, style}) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style ||"" } flex items-center justify-center text-gray-900 rounded-full font-medium bg-gray-100`}>
        {getInitial({fullName})}
    </div>
  )
}

export default ChatAvatar