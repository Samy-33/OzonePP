import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import { PrettyCard } from '../../../../components/cards/cards';
import { TopTenTable } from './components/top-ten-table';
import './style.css';

const mapStateToProps = (state) => {
  return state;
};

class ConnectedHome extends Component {

  render () {
    return (
        <div>
          <Container className="cards">
            <Row>
              <Col>
                <PrettyCard
                  imgSrc="http://i.huffpost.com/gen/4784786/images/n-CODING-628x314.jpg"
                  imgAlt="Coding Practice img"
                  title="Practice"
                  text="Practice with more than a 100 questions now, and increase your skills"
                  buttonColor="success"
                  buttonText="Click Here to Practice"
                  buttonLink="/practice"
                />
              </Col>
              <Col>
                <PrettyCard
                  imgSrc="https://labs.openviewpartners.com/wp-content/uploads/2016/10/hackathon-e1352218995482-2.jpg"
                  imgAlt="Participate in Contests img"
                  title="Participate"
                  text="Participate in ongoing contests and move up the leaderboard"
                  buttonColor="primary"
                  buttonText="Click Here to Participate"
                  buttonLink="/contests"
                />
              </Col>
              <Col>
                <PrettyCard
                  imgSrc="https://images.tech.co/wp-content/uploads/2012/07/learn_to_code.png"
                  imgAlt="Learn Coding img"
                  title="Learn"
                  text="Learn from various resources online and written by your seniors and peers"
                  buttonColor="dark"
                  buttonText="Click Here to Learn"
                  buttonLink="/resources"
                />
              </Col>
            </Row>
          </Container>
          <br />
          <hr />
          <Container className="ozone-home-best10">
            <Row>
              <Col>
                <TopTenTable
                  title="Top Rated Users"
                  firstColName="Username"
                  secondColName="Rating"
                  data={this.props.toprateddata}
                >

                </TopTenTable>
              </Col>
              <Col>
                <TopTenTable
                  title="Top Rated Contributors"
                  firstColName="Username"
                  secondColName="Score"
                  data={this.props.topcontributeddata}
                >

                </TopTenTable>
              </Col>
            </Row>
          </Container>
        </div>
    );
  };
};

export const Home = connect(mapStateToProps)(ConnectedHome);
