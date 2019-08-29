import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import Container from "@material-ui/core/Container";
import { TextField, Button } from "@material-ui/core";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      oneEmail: "",
      emails: [],
      subject: "",
      redirect: false,
      noField: false,
      sendIt: false,
      noEmail: false
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { text, emails, subject } = this.state;

    const email = {
      text,
      emails,
      subject
    };
console.log(emails.length, "longitud")
    if (
        emails.length===0 
      ) {
        this.setState({ noEmail: true });
        return;
      }

    if (
      text === "" ||
      text === null ||
      subject === "" ||
      subject === null
    ) {
      this.setState({ noField: true });
      return;
    }

    Axios.post(`/api/send`, email).then(response => {
      this.setState({
        noField: false,
        sendIt: true,
        noEmail: false,
        text: "",
        oneEmail: "",
        emails: [],
        subject: ""
      });
    });
    // })
    // .catch( error => console.log(error) )
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value, sendIt: false });
  }

  addEmail(event) {
    event.preventDefault();

    this.state.emails.push(this.state.oneEmail);
    this.setState({ emails: this.state.emails, oneEmail: "" , noEmail: false});
  }

  render() {
    console.log(this.state.emails, "emails");
    return (
      <div className="container">
        <Container
          component="main"
          maxWidth="xs"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "40px",
            paddingTop: "20px",
            marginTop: "100px",
          }}
        >
          {/* <CssBaseline /> */}
          <h2>Nuevo Email</h2>
          <div
          // className={classes.paper}
          >
            <form onSubmit={e => this.addEmail(e)}>
              {this.state.emails &&
                this.state.emails.map(email => {
                  return <span>{email}, </span>;
                })}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="oneEmail"
                label="Destinatario/s"
                type="text"
                id="oneEmail"
                value={this.state.oneEmail}
                onChange={e => this.handleChange(e)}
              />
              {this.state.noEmail ? (
                <div>
                  <p style={{ color: "red" }}>Introduce por lo menos un email</p>
                </div>
              ) : (
                <div></div>
              )}
              <Button
              type="submit"
              variant="contained"
              color="primary">Añadir</Button>
            </form>
            <form
              onSubmit={e => this.handleFormSubmit(e)}
              // className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="subject"
                label="Asunto"
                type="text"
                id="subject"
                value={this.state.subject}
                onChange={e => this.handleChange(e)}
              />
              <TextField
                variant="outlined"
                required
                margin="normal"
                required
                fullWidth
                id="text"
                label="Texto"
                multiline={true}
                rows={4}
                name="text"
                autoFocus
                value={this.state.text}
                onChange={e => this.handleChange(e)}
              />
              {this.state.noField ? (
                <div>
                  <p style={{ color: "red" }}>
                    No ha introducido todos los campos necesarios
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              {this.state.sendIt ? (
                <div>
                  <p style={{ color: "red" }}>Email enviado correctamente</p>
                </div>
              ) : (
                <div></div>
              )}
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                // className={classes.submit}
              >
                Enviar
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

if (document.getElementById("App")) {
  ReactDOM.render(<App />, document.getElementById("App"));
}
