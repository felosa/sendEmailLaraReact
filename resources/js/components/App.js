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
            to: "",
            subject: "",
            redirect: false,
            noField: false,
            sendIt: false
        };
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const { text, to, subject } = this.state;

        const email = {
            text,
            to,
            subject
        };

        if(text==="" || text===null || to==="" || to===null ||subject==="" || subject===null){
            this.setState({noField: true})
            return}

        Axios.post(`/api/send`, email).then(response => {
            
        });
        this.setState({
            noField:false,
            sendIt: true
        });
        // })
        // .catch( error => console.log(error) )
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value, sendIt: false });
    }

    render() {
        console.log(this.state.text, "texto")
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
                        marginTop: "100px"
                    }}
                >
                    {/* <CssBaseline /> */}
                    <h2>Nuevo Email</h2>
                    <div
                    // className={classes.paper}
                    >
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
                                name="to"
                                label="Destinatario"
                                type="text"
                                id="to"
                                value={this.state.to}
                                onChange={e => this.handleChange(e)}
                            />
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
                            {this.state.noField?<div><p style={{color:"red"}}>
                                No ha introducido todos los campos necesarios
                            </p></div>:<div></div>}
                            {this.state.sendIt?<div><p style={{color:"red"}}>
                                Email enviado correctamente
                            </p></div>:<div></div>}
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
