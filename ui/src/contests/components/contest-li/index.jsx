import React from 'react'
import { ListGroupItem, Button } from 'reactstrap'
import { ReverseTimer } from '../../../components/reverse-timer/reverse-timer'
import { CONTESTS_ROUTE } from '../../../config/constants'
import { Link } from 'react-router-dom'
import { getFormatedTimeFromTZString, getTimeFromTZString } from '../../../utils/time-utils'
import './contest-li.css'

export const ContestLi = (props) => {

  const { contest } = props

  const now = Date.now()
  const startTime = getTimeFromTZString(contest.start_time)
  const endTime = getTimeFromTZString(contest.end_time)
  
  const timerStopTime = startTime < now ? endTime : startTime

  return (
    <ListGroupItem tag={Link} to={`${CONTESTS_ROUTE}/${contest.code}`}
      action
      className="d-flex flex-column justify-contenst-around contest-li">
      <div className="p-2 d-flex justify-content-between">
        <div><h4>{contest.name}</h4> {contest.code}</div>
        <div>
          <b>From: </b>{getFormatedTimeFromTZString(contest.start_time)} &nbsp;&nbsp;
          <b> To: </b> {getFormatedTimeFromTZString(contest.end_time)}
        </div>
      </div>
      <div className="p-2 d-flex justify-content-between">
        <div className="p-2 d-flex text-wrap">
          {contest.description}
        </div>
        <div className="p-2 d-flex flex-column">
          {now <= endTime &&
            <div className="p-2">
              {(()=>{
                if(now <= startTime) {
                  return <span><b>Starts In - </b></span>
                }
                return <span><b>Ends In - </b></span>
              })()}
              <ReverseTimer toTime={timerStopTime.toDate()} />
            </div>
          }
          {!contest.is_registered && now < startTime - 5000 &&
            <div className="p-2">
              <Button color="primary"> Register </Button>
            </div>
          }
        </div>
      </div>
    </ListGroupItem>
  )
}