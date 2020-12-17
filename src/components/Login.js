import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import logo from '../img/amazon-dark.png';
import './css/login.css';
import { useState } from 'react';
import { auth } from '../firebase';
import { saveLoginUser } from './../statemangement/localstorage';
import Validate, { ValidateProperty } from './../services/validate';
import Joi from 'joi-browser';
import { useStateValue } from './../statemangement/StateProvider';

const Login = () => {
    const history = useHistory();
    const [showhelp, setShowHelp] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [{ cart, viewed }, dispatch] = useStateValue();
    const [error, setError] = useState();
    const [joivalidattion, setJoiValidation] = useState();
    const schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
    }

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        const error = ValidateProperty(value, schema[name]);
        setJoiValidation(state => ({ ...state, [name]: error }));
    }
    const handleShowHelp = () => {
        setShowHelp(!showhelp);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = Validate(user, schema);
        setJoiValidation(errors);
        if (errors) {
            return;
        }
        auth.signInWithEmailAndPassword(user.email, user.password)
            .then(
                () => {
                    dispatch({
                        type: 'LOG_IN',
                        email: user.email
                    });
                    saveLoginUser(user.email);
                    if (!cart && !viewed) window.location = '/amazoo';
                    history.push('/amazoo');
                }

            )
            .catch(
                ex => {
                    setError(ex.message);
                    return;
                }
            )

    }
    return (
        <>
            <div className="login">
                <div className="login_row">
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                {error && <div className="error">
                    <div className="warning">
                        <FontAwesomeIcon size='lg' icon={faExclamationTriangle} />
                    </div>
                    <div className="error_content">
                        <h3><small>There was a problem</small></h3>
                        <p><small>{error}</small></p>
                    </div>
                </div>}
                <div className="login_form">
                    <div className="formtitle">

                        <h2>Sign-In</h2>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <h5>Email</h5>
                        <input type="text" name='email' value={user.email} onChange={handleChange} />
                        {(joivalidattion && joivalidattion.email) && <label htmlFor="email"><small>{joivalidattion.email}</small></label>}
                        <h5>Password</h5>
                        <input type="password" name='password' value={user.password} onChange={handleChange} />
                        {(joivalidattion && joivalidattion.password) && <label htmlFor="password"><small>{joivalidattion.password}</small></label>}
                        <input type='submit' value='Continue' className="login_signin" />
                        <p className='help_condition'><small>By continuing, you agree to Amazoo's <a>Conditions of Use</a> and <a>Privacy Notice</a>.</small> </p>
                        <p>{!showhelp ? <FontAwesomeIcon icon={faCaretRight} /> : <FontAwesomeIcon icon={faCaretDown} />}<a onClick={handleShowHelp}><small>Need any help?</small></a></p>
                        {showhelp && <p className='help_dropdown'><a><small>Forgot your password</small></a></p>}
                        {showhelp && <p className='help_dropdown'><a><small>Other issues withSign-In </small></a></p>}

                    </form>
                </div>
                <div className="newaccount">
                    <div className="new"><span><small>New to Amazoo?</small></span></div>
                    <Link to='/register'><button className="login_register" >Create your Amazoo account</button></Link>
                </div>
            </div>
        </>
    );
}

export default Login;