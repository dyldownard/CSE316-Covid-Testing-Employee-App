import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Form, Header } from 'semantic-ui-react';

class LabHome extends Component {

  render() {
    return (

      <Grid>
            <Link to="/">
              <button>Back</button>
            </Link>
            <Grid.Column width={4}>
              <Form>
                <Header as="h1">Lab Employee Home</Header>
                <Link to="/testcol">
                  <button>Test Collection</button>
                </Link>
                <br/>
                <br/>
                <Link to="/poolmap">
                  <button>Pool Mapping</button>
                </Link>
                <br/>
                <br/>
                <Link to="/welltest">
                  <button>Well Testing</button>
                </Link>
              </Form>
            </Grid.Column>
          </Grid>
    );
  }
}

export default withRouter(LabHome);