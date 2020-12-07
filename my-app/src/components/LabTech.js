import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Grid, Form, Header, Message } from 'semantic-ui-react';

class LabTech extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
      apiResponse: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  callAPI = async () => {     //callAPI is our function, async is telling it that this is an async task
    const { username, password } = this.state;
    await fetch('http://localhost:9000/loginLabAPI/?labid='+username+'&pass='+password)
    .then(res => res.json())
    .then(json => this.setState({ apiResponse: json }));
  }

  async onSubmit(e) {

    e.preventDefault();

    this.setState({ error: false });
    await this.callAPI();
    console.log(this.state.apiResponse)
    if (this.state.apiResponse.length !== 1) {   //TODO add credentials via mysql
      return this.setState({ error: true });
    }


    console.log("you're logged in. yay!");
    this.props.history.push('/labhome');
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

 render() {
  const { error } = this.state;
  return (

        <Grid>
        <Link to="/">
          <button>Back</button>
        </Link>
        <Grid.Column width={4}>
          <Form error={error} onSubmit={this.onSubmit}>
            <Header as="h1">Login</Header>
            {error && <Message
              error={error}
              content="That username/password is incorrect. Try again!"
            />}
            <Form.Input
              inline
              label="Username"
              name="username"
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              label="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <Form.Button type="submit">Go!</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(LabTech);
