import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const Login: React.FC = () => {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/dashboard');
      } catch (err) {
        // Error is already handled in the auth context
      }
    },
  });
  
  // Clear any existing errors when input changes
  React.useEffect(() => {
    if (error) clearError();
  }, [formik.values, error, clearError]);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Sign in to your account
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-md text-error text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput
          label="Email Address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />
        
        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        />
        
        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={formik.isSubmitting}
          >
            Sign in
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
            Sign up now
          </Link>
        </p>
      </div>
      
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-500 text-center">
          <p>Demo Accounts:</p>
          <p>Admin: admin@example.com / Admin@123</p>
          <p>User: user@example.com / User@123</p>
          <p>Store: store@example.com / Store@123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;