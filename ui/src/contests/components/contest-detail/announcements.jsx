import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'
import { getFormatedTimeStringFromTime } from '../../../utils/time-utils'
import {Throbber} from '../../../components/throbber/throbber'
import ReactMarkdown from 'react-markdown'

const ContestAnnouncementsPresent = (props) => {
  const {contestAnnouncements} = props

  return (
    <center>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            if(contestAnnouncements === null || contestAnnouncements === undefined) return;

            if(contestAnnouncements.length === 0) {
              return <tr><td colSpan={3} className="alert alert-danger">No Announcements.</td></tr>
            }

            else {
              return contestAnnouncements.map((announcement, index) => {
                return (
                  <tr key={announcement.id}>
                    <td>{index + 1}</td>
                    <td> {getFormatedTimeStringFromTime(announcement.added_at)} </td>
                    <td><ReactMarkdown source={announcement.text}/></td>
                  </tr>
                )
              })
            }

          })()}
        </tbody>
      </Table>
    </center>
  )
}

class ContestAnnouncementsUnConnected extends React.Component {

  render () {
    const {contestAnnouncementsLoading } = this.props

    if(contestAnnouncementsLoading) {
      return <Throbber type="spin" color="##00ff00" text="Loading Announcements..."/>
    }

    return <ContestAnnouncementsPresent {...this.props} />
    
  }
}

const mapStateToProps = ({contests: {contestAnnouncementsLoading, contestAnnouncements}}) => (
  {
    contestAnnouncementsLoading,
    contestAnnouncements
  }
)

// const mapDispatchToProps = { loadContestAnnouncements }

export default connect(mapStateToProps)(ContestAnnouncementsUnConnected)