import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { NavBar as Navbar } from '../components/navbar/navbar'
import { Footer } from '../components/footer/footer'
import { Nav, NavItem, NavLink, TabContent,
  TabPane, ListGroup, Alert } from 'reactstrap'
import { ContestLi } from './components/contest-li'
import  { Helmet } from 'react-helmet'
import { withAuthentication } from '../hoc/with-authentication'
import { loadAllContests } from './actions'

import classnames from 'classnames'
import './styles/contests-home.css'

const ONGOING_CONTESTS_TAB = 'ONGOING_CONTESTS_TAB'
const UPCOMING_CONTESTS_TAB = 'UPCOMING_CONTESTS_TAB'
const PAST_CONTESTS_TAB = 'PAST_CONTESTS_TAB'

const ContestsTabItem = (props) => {
  return (
    <NavItem>
      <NavLink
        tag="a"
        href="#"
        className={classnames({active: props.activeTab === props.tabType})}
        onClick={() => props.changeSetTab(props.tabType)}
      >
        {props.tabTitle}
      </NavLink>
    </NavItem>
  )
}

const ContestsTabContent = (props) => {
  return (
    <ListGroup>
      {_.isEmpty(props.contestsList) &&
        <Alert color="danger">
          No Data for this category.
        </Alert>
      }
      {props.contestsList &&
        props.contestsList.map(contest => {
          return (
            <ContestLi key={contest.id} contest={contest}/>
          )
        })
      }
    </ListGroup>
  )
}

const ContestsPresent = (props) => {

  const { activeTab, changeSetTab, upcomingContests, ongoingContests, pastContests } = props

  return (
    <div className="d-flex flex-column mb-3 contests-body-container">
      <Helmet>
        <title>Contests</title>
      </Helmet>
      <div className="p-2">
        <Navbar />
      </div>
      <div className="p-2 flex-grow-1">
        <Nav tabs>
          <ContestsTabItem tabType={ONGOING_CONTESTS_TAB} tabTitle="Ongoing Contests" {...{changeSetTab, activeTab}}/>
          <ContestsTabItem tabType={UPCOMING_CONTESTS_TAB} tabTitle="Upcoming Contests" {...{changeSetTab, activeTab}}/>
          <ContestsTabItem tabType={PAST_CONTESTS_TAB} tabTitle="Past Contests" {...{changeSetTab, activeTab}}/>
        </Nav>
        <TabContent activeTab={props.activeTab}>
          <TabPane tabId={ONGOING_CONTESTS_TAB}>
            {<ContestsTabContent contestsList={ongoingContests} />}
          </TabPane>
          <TabPane tabId={UPCOMING_CONTESTS_TAB}>
            {<ContestsTabContent contestsList={upcomingContests} />}
          </TabPane>
          <TabPane tabId={PAST_CONTESTS_TAB}>
            {<ContestsTabContent contestsList={pastContests} />}
          </TabPane>
        </TabContent>
      </div>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}

class Contests extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: ONGOING_CONTESTS_TAB
    }

    this.changeSetTab = this.changeSetTab.bind(this)
  }

  changeSetTab = (newTab) => {
    this.setState({
      activeTab: newTab
    })
  }

  componentDidMount = () => {
    this.props.loadAllContests()
  }

  render () {

    const propsToSend = {
      ...this.state,
      ...this.props,
      changeSetTab: this.changeSetTab
    }

    return <ContestsPresent {...propsToSend} />
  }
}

const mapStateToProps = ({contests:{pastContests, ongoingContests, upcomingContests}}) => ({
  pastContests, ongoingContests, upcomingContests
})
const mapDispatchToProps = { loadAllContests }

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(Contests))