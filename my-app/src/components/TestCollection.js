import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Form, Header, Message } from 'semantic-ui-react';

class TestCollection extends Component {

  render() {
    return (<Grid>
      <Link to="/">
        <button>Back</button>
      </Link>
      <Grid.Column width={4}>
        <Form error={error} onSubmit={this.onSubmit}>
          <Header as="h1">Lab Employee Login</Header>
          {error && <Message error={error} content="That username/password is incorrect. Try again!"/>}
          <Form.Input inline="inline" label="Username" name="username" onChange={this.handleChange}/>
          <Form.Input inline="inline" label="Password" type="password" name="password" onChange={this.handleChange}/>
          <Form.Button type="submit">Go!</Form.Button>
        </Form>
      </Grid.Column>
    </Grid>);
  }
}

export default withRouter(TestCollection);