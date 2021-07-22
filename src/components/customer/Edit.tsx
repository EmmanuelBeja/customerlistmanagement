import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Container, Row, Col, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';


export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    customer: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditCustomer extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            customer: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers/${this.state.id}`).then(data => {
            this.setState({ customer: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/customers/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            toast.success('Customer edit successfull', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }

    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
      const { submitSuccess, loading } = this.state;

      return (
        <Container>
        {this.state.customer &&
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} className="form-wrapper">
              <h2>Edit Customer</h2>
              {submitSuccess && (
                  <Alert color="success">
                    Customer details edit successfull
                  </Alert>
              )}
              <Form id="create-post-form" onSubmit={this.processFormSubmission} noValidate={true}>
                <FormGroup>
                  <Label for="first_name">First Name</Label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    defaultValue={this.state.customer.first_name}
                    onChange={(e) => this.handleInputChanges(e)}
                    placeholder="Enter customer's first name" />
                </FormGroup>
                <FormGroup>
                  <Label for="first_name">Last Name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    defaultValue={this.state.customer.last_name}
                    onChange={(e) => this.handleInputChanges(e)}
                    placeholder="Enter customer's last name" />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={this.state.customer.email}
                    onChange={(e) => this.handleInputChanges(e)}
                    placeholder="Enter customer's last name" />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    id="description"
                    name="description"
                    defaultValue={this.state.customer.description}
                    onChange={(e) => this.handleInputChanges(e)}
                    placeholder="Enter Description"
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                  {loading ? (
                    <span className="fa fa-circle-o-notch fa-spin" />
                    ) : (
                    'Edit Customer'
                  )}
                </Button>
              </Form>
            </Col>
          </Row>

        }
        </Container>
      )
    }
}


export default withRouter(EditCustomer)
