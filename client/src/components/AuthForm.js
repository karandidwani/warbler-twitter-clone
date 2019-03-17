import React, {Component} from 'react'

class AuthForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const authType = this.props.signup ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.props.history.push("/");
            })
            .catch(()=> {
                return;
            })
    }

    render() {
        const {email, username, profileImageUrl} = this.state;
        const {heading, buttonText, signup, errors, history, removeErrors} = this.props;

        history.listen(() => {
            removeErrors();
        })

        return (
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                        <h2>{heading}</h2>
                        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text" className="form-control"
                            id="email"
                            name="email"
                            onChange={this.handleChange}
                            value={email}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password" className="form-control"
                            id="password"
                            name="password"
                            onChange={this.handleChange}
                        />
                        {signup && <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text" className="form-control"
                                id="username"
                                name="username"
                                onChange={this.handleChange}
                                value={username}
                            />
                            <label htmlFor="profileImageUrl">Profile Image URL:</label>
                            <input
                                type="text" className="form-control"
                                id="profileImageUrl"
                                name="profileImageUrl"
                                onChange={this.handleChange}
                                value={profileImageUrl}
                            />
                        </div>}
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AuthForm;