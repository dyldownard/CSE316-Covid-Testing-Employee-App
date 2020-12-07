import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Form, Header, Message } from 'semantic-ui-react';

class WellTesting extends Component {

  render() {
    return (

      <Grid>
            <Link to="/">
              <button>Back</button>
            </Link>
            <Grid.Column width={4}>
              <Form>
                <Header as="h1">Lab Employee Login</Header>
                <Link to="/">
                  <button>Test Collection</button>
                </Link>
                <br/>
                <Link to="/">
                  <button>Pool Mapping</button>
                </Link>
                <br/>
                <Link to="/">
                  <button>Well Testing</button>
                </Link>
              </Form>
            </Grid.Column>
          </Grid>
    );
  }
}

export default withRouter(WellTesting);