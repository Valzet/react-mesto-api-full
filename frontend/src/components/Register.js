import React from 'react'
import { Link } from "react-router-dom";

const Register = (props) => {
  const [formParams, setFormParams] = React.useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = formParams;
    props.handleRegister({ email, password })
    console.log({ email, password })
  }
  return (
    <section className='register'>
      <p className='register__welcome'>Регистрация</p>
      <form className='register__form' onSubmit={handleSubmit}>
        <input className='register__form_type_input' placeholder="Email" id="email" name="email" type="email" required onChange={handleChange} value={formParams.email} />
        <input className='register__form_type_input' placeholder='Пароль' name="password" type='password' required onChange={handleChange} value={formParams.password} />
        <div className="register__button-container">
          <button type="submit" className="button register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/signin" className="register__login-link">Войти</Link>
      </div>
    </section>
  )
}


export default Register