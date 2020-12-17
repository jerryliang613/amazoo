import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import logo from '../img/amazon-dark.png';
import './css/register.css';
import { useState } from 'react';
import { auth } from '../firebase';
import Joi from 'joi-browser';
import Validate, { ValidateProperty } from './../services/validate';
import { saveToLocal } from './../statemangement/localstorage';
import { useStateValue } from './../statemangement/StateProvider';

const Register = () => {
    const history = useHistory();
    const [, dispatch] = useStateValue();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [confirmpasword, setConfirmPassword] = useState();
    const [response, setResponse] = useState();
    const [errors, setErrors] = useState();
    const schema = {
        name: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(6).required().label('Password'),
        // repassword: Joi.any().valid(Joi.ref('user.password')).required().label('Passwords').options({ language: { any: { allowOnly: ' must match ' } } })
    }
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
        const error = ValidateProperty(value, schema[name]);
        setErrors({ ...errors, [name]: error });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setResponse();
        const errors = Validate(user, schema);
        const error = confirmPassword(user.password, confirmpasword);
        if (!errors && !error) {
            auth.createUserWithEmailAndPassword(user.email, user.password)
                .then(auth => {
                    if (auth) {
                        saveToLocal('user', user.email);
                        dispatch({
                            type: 'LOG_IN',
                            user: {
                                email: user.email,
                            }
                        })
                        history.push('/');
                    }
                })
                .catch(
                    error => {
                        console.log(error);
                        setResponse(error.message)
                    }
                )
            return;
        }
        if (error) errors.repassword = error;
        setErrors(errors);

    }

    const confirmPassword = (password, passwordConfirmation) => {

        return password === passwordConfirmation
            ? null
            : '"Passwords" must mach'
    }

    const handlePasswordConfirmation = ({ target }) => {
        setConfirmPassword(target.value);
        const error = confirmPassword(user.password, target.value);
        setErrors({ ...errors, repassword: error });
    }
    return (
        <>
            <div className="login">
                <div className="login_row">
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                {response && <div className="error">
                    <div className="warning">
                        <FontAwesomeIcon size='lg' icon={faExclamationTriangle} />
                    </div>
                    <div className="error_content">

                        <p><small>{response}</small></p>
                    </div>
                </div>}
                <div className="login_form">
                    <div className="formtitle">

                        <h2>Create account</h2>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <h5>Name</h5>
                        <input type="text" name='name' value={user.name} onChange={handleChange} />
                        {(errors && errors['name'] !== undefined) && <label htmlFor="name"><small>{errors['name']}</small></label>}
                        <h5>Email</h5>
                        <input type="text" name='email' value={user.email} onChange={handleChange} />
                        {(errors && errors['email'] !== undefined) && <label htmlFor="email"><small>{errors['email']}</small></label>}
                        <h5>Password</h5>
                        <input type="password" name='password' value={user.password} onChange={handleChange} placeholder='At least 6 characters' />
                        {(errors && errors['password'] !== undefined) && <label htmlFor="password"><small>{errors['password']}</small></label>}
                        <h5>Re-enter password</h5>
                        <input type="password" name='repassword' value={user.repassword} onChange={handlePasswordConfirmation} />
                        {errors && errors['repassword'] && <label htmlFor="repassword"><small>{errors['repassword']}</small></label>}
                        <input type='submit' value='Create your Amazoo account' className="login_signin" />
                        <p className='help_condition'><small>By continuing, you agree to Amazoo's <a>Conditions of Use</a> and <a>Privacy Notice</a>.</small> </p>
                    </form>
                    <div className="newaccount">
                        <div className="line"></div>
                        <p><small>Already have an account? <Link to='/login'>Sing-in <FontAwesomeIcon icon={faCaretRight} /> </Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;