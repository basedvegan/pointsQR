import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import SubtractBtn from "../../components/SubtractBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Students extends Component {
  // Setting our component's initial state
  state = {
    students: [],
    studentname: "",
    points: "",
    qrcode: ""
  };

  // When the component mounts, load all students and save them to this.state.students
  componentDidMount() {
    this.loadStudents();
  }

  // Loads all students  and sets them to this.state.students
  loadStudents = () => {
    API.getStudents()
      .then(res =>
        this.setState({ students: res.data, studentname: "", points: "", qrcode: "" })
      )
      .catch(err => console.log(err));
  };

  // adds points to the database with a given id, then reloads students from the db
  addPoints = id => {
    API.addPoints(id)
      .then(res => this.loadStudents())
      .catch(err => console.log(err));
  };

  // subtracts points from the database with a given id, then reloads students from the db
  subtractPoints = id => {
    API.subtractPoints(id)
      .then(res => this.loadStudents())
      .catch(err => console.log(err));
  };

  // Deletes a student from the database with a given id, then reloads students from the db
  deleteStudent = id => {
    API.deleteStudent(id)
      .then(res => this.loadStudents())
      .catch(err => console.log(err));
  };



  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveStudent method to save the student data
  // Then reload students from the database
  handleFormSubmit = event => {
    event.preventDefault();


    var QRCode = require('qrcode')
    var canvas = document.getElementById('canvas')

    QRCode.toCanvas(canvas, this.state.studentname, function (error) {
      if (error) console.error(error)
      console.log('success!');
    })

    //var QRCode = require('qrcode')

    //QRCode.toDataURL(this.state.studentname, function (err, qrcode) {
    //console.log(qrcode)
    //})

    if (this.state.studentname && this.state.points) {
      API.saveStudent({
        studentname: this.state.studentname,
        points: this.state.points,
        qrcode: this.state.qrcode
      })
        .then(res => this.loadStudents())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add Students to Class</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.studentname}
                onChange={this.handleInputChange}
                name="studentname"
                placeholder="Student Name"
              />
              <Input
                value={this.state.points}
                onChange={this.handleInputChange}
                name="points"
                placeholder="Points"
              />
              <canvas id="canvas"></canvas>
              <script src="bundle.js"></script>
              <FormBtn
                disabled={!(this.state.points && this.state.studentname)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Students in My Class</h1>
            </Jumbotron>
            {this.state.students.length ? (
              <List>
                {this.state.students.map(student => {
                  return (
                    <ListItem key={student._id}>
                      <a href={"/students/" + student._id}>
                        <strong>
                          {student.studentname} : {student.points} points : {student.qrcode}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteStudent(student._id)} />
                      <AddBtn onClick={() => this.addPoints(student._id)} />
                      <SubtractBtn onClick={() => this.subtractPoints(student._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Students;
