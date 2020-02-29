import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from "./components/InputFields";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import RegisterUser from "./components/RegisterUser";
import { register } from "./modules/register";

class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    renderRegisterUser: false,
    registered: false,
    authenticated: false,
    message: "",
    entrySaved: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, entrySaved: false });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  onRegister = async e => {
    e.preventDefault();
    const response = await register(
      e.target.email.value,
      e.target.password.value,
      e.target.password_confirmation.value
    );
    if (response.registered) {
      this.setState({ registered: true });
    } else {
      this.setState({ message: response.message, renderRegisterUser: false });
    }
  };

  render() {
    const {
      renderLoginForm,
      renderRegisterUser,
      authenticated,
      message,
      registered
    } = this.state;
    let performanceDataIndex;
    let renderButtons;
    let renderInputForms;
    let renderMessage;

    switch (true) {
      case renderLoginForm && !authenticated:
        renderInputForms = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case renderRegisterUser && !authenticated:
        renderInputForms = <RegisterUser submitFormHandler={this.onRegister} />;
        break;

      case !renderLoginForm && !authenticated:
        renderButtons = (
          <>
            <button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            <button
              id="register"
              onClick={() => this.setState({ renderRegisterUser: true })}
            >
              Sign up
            </button>
            <p id="message">{message}</p>
          </>
        );
        break;

      case authenticated:
        renderMessage = (
          <p id="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
              <button onClick={() => this.setState({ renderIndex: false })}>
                Hide past entries
              </button>
            </>
          );
        } else {
          performanceDataIndex = (
            <button
              id="show-index"
              onClick={() => this.setState({ renderIndex: true })}
            >
              Show past entries
            </button>
          );
        }
        break;
    }
    return (
      <>
        <InputFields onChangeHandler={this.onChangeHandler} />
        {renderButtons}
        {renderInputForms}
        {renderMessage}
        <DisplayCooperResult
          distance={this.state.distance}
          gender={this.state.gender}
          age={this.state.age}
          authenticated={this.state.authenticated}
          entrySaved={this.state.entrySaved}
          entryHandler={() =>
            this.setState({ entrySaved: true, updateIndex: true })
          }
        />
        {performanceDataIndex}
      </>
    );
  }
}

export default App;
