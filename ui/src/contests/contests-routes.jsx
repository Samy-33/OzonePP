import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Contests from './contests'
import ContestDetail from './contest-detail'

const ContestsRoutes = (props) => {
  return (
    <Switch>
      <Route exact path="/contests" component={Contests} />
      <Route exact path="/contests/:code" component={ContestDetail} />
    </Switch>
  )
}

export default ContestsRoutes