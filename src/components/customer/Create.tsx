import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Container, Row, Col, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

export interface IValues {
    first_name: string,
    last_name: string,
    email: string,
    description: string,
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            description: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            description: this.state.description,
        }
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        toast.success('Form submit successfull', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        axios.post(`http://localhost:5000/customers`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
      const { submitSuccess, loading } = this.state;

      return (
        <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="form-wrapper">
            <h2>Create Customer</h2>
            {!submitSuccess && (
                <Alert color="info">
                  Fill the form below to create a new post
                </Alert>
            )}
            {submitSuccess && (
                <Alert color="success">
                  The form was successfully submitted!
                </Alert>
            )}
            <Form id="create-post-form" onSubmit={this.processFormSubmission} noValidate={true}>
              <FormGroup>
                <Label for="first_name">First Name</Label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  onChange={(e) => this.handleInputChanges(e)}
                  placeholder="Enter customer's first name" />
              </FormGroup>
              <FormGroup>
                <Label for="first_name">Last Name</Label>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  onChange={(e) => this.handleInputChanges(e)}
                  placeholder="Enter customer's last name" />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => this.handleInputChanges(e)}
                  placeholder="Enter customer's last name" />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  id="description"
                  name="description"
                  onChange={(e) => this.handleInputChanges(e)}
                  placeholder="Enter Description"
                  />
              </FormGroup>
              <Button color="primary" type="submit">
                {loading ? (
                  <span className="fa fa-circle-o-notch fa-spin" />
                  ) : (
                  'Create Customer'
                )}
              </Button>
            </Form>
          </Col>
        </Row>
        </Container>
      )
    }
}
export default withRouter(Create)
