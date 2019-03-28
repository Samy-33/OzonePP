import React from 'react'
import Countdown from 'react-countdown-now'
import Alert from 'react-s-alert'

export const ReverseTimer = (props) => {
  return (
    <Countdown
      date={props.toTime}
      daysInHours
      zeroPadTime={2}
      onComplete={() => {Alert.info('Contest Started. Refresh or Enter the contest.')}}
    />
  )
}