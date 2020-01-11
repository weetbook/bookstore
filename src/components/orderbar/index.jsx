import React from 'react'

import { rhythm } from '../../utils/typography'

import './index.scss'

export const Orderbar = ({ naverOrder, coupangOrder }) => {
  return (
    <ul
      className="orderbar-container"
      role="tablist"
      id="orderbar"
      style={{
        margin: `0 -${rhythm(3 / 4)}`,
      }}
    >
      {naverOrder && (
        <li className="item" role="tab">
          <a href={naverOrder} target="_blank">
            네이버에서 주문
          </a>
        </li>
      )}
      {coupangOrder && (
        <li className="item" role="tab">
          <a href={coupangOrder} target="_blank">
            쿠팡에서 주문
          </a>
        </li>
      )}
    </ul>
  )
}
