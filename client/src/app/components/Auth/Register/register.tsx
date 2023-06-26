import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { registerUser } from '../../../../services/auth.service';
import Link from 'next/link';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        'Password should contains a lowercase, a uppercase character and a digit.',
      ),
    confirmPassword: Yup.string()
      .required()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        'Password should contains a lowercase, a uppercase character and a digit.',
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleValidSubmit = async (data: FormData) => {
    setIsSubmitted(true);
    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response?.data) {
        navigate('/login');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
    setIsSubmitted(false);
  };

  return (
    <div className="authContainer">
      <div className="leftImageContainer"></div>
      <div className="authForm">
        <h1 className="title"></h1>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <div className="formInput">
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" {...register('name')} />
          </div>

          <div className="formInput">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" {...register('email')} />
          </div>

          <div className="formInput">
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" {...register('password')} />
          </div>

          <div className="formInput">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
            />
          </div>

          <div className="formInput">
            <button
              type="submit"
              disabled={!isDirty || !isValid || isSubmitted}
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="alreadyUser">
          Already a member? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
