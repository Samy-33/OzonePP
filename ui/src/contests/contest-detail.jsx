import React from 'react'
import { withAuthentication } from '../hoc/with-authentication'
import ContestAbout from './components/contest-detail/about'
import ContestAnnouncements from './components/contest-detail/announcements'
import { loadContest, loadContestAnnouncements } from './actions'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Throbber } from '../components/throbber/throbber'
import { withRouter } from 'react-router-dom'
import { NavBar as Navbar } from '../components/navbar/navbar'
import { Footer } from '../components/footer/footer'
import { getTimeFromTZString, getFormatedTimeStringFromTime } from '../utils/time-utils'
import { ReverseTimer } from '../components/reverse-timer/reverse-timer';
import queryString from 'query-string'
import classnames from 'classnames'

import './styles/contest-detail.css'

const CONTEST_DETAIL_TABS = {
  ABOUT: 'about',
  EDITORIALS: 'editorials',
  WINNERS: 'winners',
  ANNOUNCEMENTS: 'announcements',
  STANDINGS: 'standings'
}

class ContestDetailTabItem extends React.Component {
  componentDidMount() {
    this.stateUpdate()
  }

  stateUpdate () {
    if(this.props.preChangeActions !== null && this.props.preChangeActions !== undefined) {
      this.props.preChangeActions.map(func => {
        return func()
      })
    }
    this.props.changeActiveTab(this.props.tabType)
  }

  render() {
    return (
      <NavItem>
        <NavLink
          tag="a"
          href="#"
          className={classnames({active: this.props.activeTab === this.props.tabType})}
          onClick={() => {
            this.stateUpdate()
          }}
        >
          <b>{this.props.tabTitle}</b>
        </NavLink>
      </NavItem>
    )
  }
}

// const ContestDetailTabItem = (props) => {
//   return (
//     <NavItem>
//       <NavLink
//         tag="a"
//         href="#"
//         className={classnames({active: props.activeTab === props.tabType})}
//         onClick={() => {
//           if(props.preChangeActions !== null && props.preChangeActions !== undefined) {
//             props.preChangeActions.map(func => {
//               return func()
//             })
//           }
//           props.changeActiveTab(props.tabType)
//         }}
//       >
//         <b>{props.tabTitle}</b>
//       </NavLink>
//     </NavItem>
//   )
// }

const ContestDetailPresent = (props) => {

  const { contest, changeActiveTab, activeTab, loadContestAnnouncements } = props

  const now = Date.now()
  const startTime = getTimeFromTZString(contest.start_time)
  const endTime = getTimeFromTZString(contest.end_time)

  return (
    <div className="d-flex flex-column mb-3 contest-detail-container">
      <Helmet>
        <title>{contest && contest.code}</title>
      </Helmet>
      <div className="p-2">
        <Navbar />
      </div>
      <div className="p-2 d-flex flex-row flex-grow-1">
        
        {/* <div className="p-2 align-self-begin">
          <h1>{contest.name}</h1>
          {getFormatedTimeStringFromTime(startTime)} - {getFormatedTimeStringFromTime(endTime)}
          
          {/* Reverse Timer }
          {(() => {
            if(now > endTime) return <h3 className="text-secondary"><b>Contest Ended</b></h3>
            else if(now > startTime) return <h3 className="text-secondary"><b>Ends in - </b><ReverseTimer toTime={endTime.toDate()}/></h3>
            else return <h3 className="text-secondary"><b>Starts in - </b><ReverseTimer toTime={startTime.toDate()}/></h3>
          })()}
        </div>
        <div className="p-2 align-self-end">
          {now < startTime && contest.is_registered &&
            <b className="text-success"> Registered</b>
          }
          { now < startTime && !contest.is_registered &&
            <Button color="info" onClick={props.handleRegisterClick}>Register</Button>
          }
        </div> */}

        <div className="d-flex flex-column flex-grow-1">
          <div className="p-2 d-flex flex-row justify-content-between border-bottom">
            <h1>{contest.name}</h1>
            <div className="p-2 font-weight-bold">
                <span className="text-primary">From: </span>
                {getFormatedTimeStringFromTime(startTime)} 
                
                <span className="text-primary"> To </span>
                {getFormatedTimeStringFromTime(endTime)}
            </div>
            
          </div>
          <div className="d-flex flex-row-reverse">
            <div className="p-2 font-weight-bold border-right border-5 border-dark">
              
              {/* Reverse Timer */}
              {(() => {
                if(now > endTime) return <h3 className="text-secondary"><b>Contest Ended</b></h3>
                else if(now > startTime) return <h3 className="text-secondary"><b>Ends in - </b><ReverseTimer toTime={endTime.toDate()}/></h3>
                else return <h3 className="text-secondary"><b>Starts in - </b><ReverseTimer toTime={startTime.toDate()}/></h3>
              })()}
            </div>
            <div className="p-2 align-self-end">
              {now < startTime && contest.is_registered &&
                <b className="text-success"> Registered</b>
              }
              { now < startTime && !contest.is_registered &&
                <Button color="info" onClick={props.handleRegisterClick}>Register</Button>
              }
            </div>
          </div>
          <div className="d-flex flex-row-reverse">
            <Nav tabs>
              <ContestDetailTabItem
                tabTitle="About"
                tabType={CONTEST_DETAIL_TABS.ABOUT}
                {...{activeTab, changeActiveTab}}
              />
              <ContestDetailTabItem
                tabTitle="Announcements"
                preChangeActions = {[() => loadContestAnnouncements(contest.code)]}
                tabType={CONTEST_DETAIL_TABS.ANNOUNCEMENTS}
                {...{activeTab, changeActiveTab}}
              />
              <ContestDetailTabItem
                tabTitle="Standings"
                tabType={CONTEST_DETAIL_TABS.STANDINGS}
                {...{activeTab, changeActiveTab}}
              />
              <ContestDetailTabItem
                tabTitle="Winners"
                tabType={CONTEST_DETAIL_TABS.WINNERS}
                {...{activeTab, changeActiveTab}}
              />
              <ContestDetailTabItem
                tabTitle="Editorials"
                tabType={CONTEST_DETAIL_TABS.EDITORIALS}
                {...{activeTab, changeActiveTab}}
              />
            </Nav>
          </div>
          <TabContent className="flex-grow-1" activeTab={props.activeTab}>
            <TabPane className="flex-grow-1" tabId={CONTEST_DETAIL_TABS.ABOUT}>
              <ContestAbout description={contest.description} />
            </TabPane>
            <TabPane className="flex-grow-1" tabId={CONTEST_DETAIL_TABS.ANNOUNCEMENTS}>
              <ContestAnnouncements contestCode={contest.code} />
            </TabPane>
          </TabContent>

        </div>
      </div>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}

class ContestDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: CONTEST_DETAIL_TABS.ABOUT
    }
  }

  componentWillMount = () => {
    const contestCode = this.props.match.params.code
    this.props.loadContest(contestCode)
    let tab = queryString.parse(this.props.location.search).tab
    console.log(`Tab: ${tab}`)
    if(tab === null || tab === undefined) tab = CONTEST_DETAIL_TABS.ABOUT
    this.setState({
      ...this.state,
      activeTab: tab
    })
  }

  handleRegisterClick = () => {
    
  }

  changeActiveTab = (tabType) => {
    this.setState({
      activeTab: tabType
    })
  }

  render() {
    if(this.props.contestLoading || !this.props.currentContest) {
      return <Throbber type="spin" color="##00ff00" text="Loading Contest..."/>
    }
    return (
      <ContestDetailPresent
        contest={this.props.currentContest}
        activeTab={this.state.activeTab}
        changeActiveTab={this.changeActiveTab}
        loadContestAnnouncements={this.props.loadContestAnnouncements} />
    )
  }
}

const mapStateToProps = ({ contests: { contestLoading, currentContest } }) => ({ contestLoading, currentContest })
const mapDispatchToProps = { loadContest, loadContestAnnouncements }

export default withAuthentication(withRouter(connect(mapStateToProps, mapDispatchToProps)(ContestDetail)))