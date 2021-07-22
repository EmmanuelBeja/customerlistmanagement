import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Container, Row, Col, Button, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

interface IState {
    customers: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { customers: [] }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers`).then(data => {
            this.setState({ customers: data.data })
        })
    }

    public deleteCustomer(id: number) {
        axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
            const index = this.state.customers.findIndex(customer => customer.id === id);
            this.state.customers.splice(index, 1);
            toast.success('Customer delete successfull', {
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
            }, 1500);

        })
    }

    public render() {
        const customers = this.state.customers;

        return (
          <Container>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <h2>Customers</h2>
                {customers.length === 0 && (
                  <div className="text-center">
                    <h2>No customer found at the moment</h2>
                  </div>
                )}
                <Table striped hover responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Firstname</th>
                      <th scope="col">Lastname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers && customers.map((customer) =>
                      <tr key={customer.id}>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.description}</td>
                        <td>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group" style={{ marginBottom: "20px" }}>
                                <Link
                                  to={`edit/${customer.id}`}
                                  className="btn btn-sm btn-outline-secondary">
                                  Edit Customer
                                </Link>
                                <Button
                                  outline
                                  color="secondary"
                                  size="sm"
                                  onClick={() => this.deleteCustomer(customer.id)}>
                                  Delete Customer
                                </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        )
    }
}
