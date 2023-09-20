import React from 'react'

const MsgBox = ({Msg}) => {
  return (
<>

      <div class="info">
    <div class="info__icon">
      
    </div>
    <div class="info__title">
<p>
{Msg}</p>

    </div>
    <div class="info__close"></div>
</div></>  )
}

export default MsgBox