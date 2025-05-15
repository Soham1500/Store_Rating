import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(20, 'Name must be at least 20 characters')
    .max(60, 'Name must be at most 60 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      'Password must include at least one uppercase letter and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  address: Yup.string()
    .max(400, 'Address must be at most 400 characters')
    .required('Address is required'),
});

const Register: React.FC = () => {
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...userData } = values;
        await register(userData);
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
        Create a new account
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-md text-error text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput
          label="Full Name"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText="Must be between 20-60 characters"
        />
        
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
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          helperText="Must be 8-16 characters with at least one uppercase letter and one special character"
        />
        
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        
        <FormInput
          label="Address"
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && formik.errors.address}
          helperText="Maximum 400 characters"
        />
        
        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={formik.isSubmitting}
          >
            Sign up
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;