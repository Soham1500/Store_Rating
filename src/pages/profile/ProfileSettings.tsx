import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormInput from '../../components/forms/FormInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUserPassword } from '../../services/authService';

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      'Password must include at least one uppercase letter and one special character'
    )
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: PasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await updateUserPassword(values.currentPassword, values.newPassword);
        setUpdateSuccess(true);
        resetForm();
        
        // Clear success message after a delay
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 5000);
      } catch (err) {
        console.error('Error updating password:', err);
      }
    },
  });
  
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin':
        return 'System Administrator';
      case 'store_owner':
        return 'Store Owner';
      default:
        return 'Normal User';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile and account settings
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardBody>
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">{user?.name}</h3>
                <p className="text-gray-500">{user?.email}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-white">
                    {getRoleDisplay(user?.role || 'user')}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <FormInput
                    label="Full Name"
                    value={user?.name || ''}
                    disabled
                    helperText="Contact an administrator to update your name"
                  />
                </div>
                <div>
                  <FormInput
                    label="Email Address"
                    value={user?.email || ''}
                    disabled
                    helperText="Contact an administrator to update your email"
                  />
                </div>
                <div>
                  <FormInput
                    label="Address"
                    value={user?.address || ''}
                    disabled
                    helperText="Contact an administrator to update your address"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
              </CardHeader>
              <CardBody>
                {updateSuccess && (
                  <div className="mb-4 p-3 bg-success bg-opacity-10 border border-success border-opacity-30 rounded-md text-success text-sm">
                    Password updated successfully!
                  </div>
                )}
                
                <form onSubmit={passwordFormik.handleSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <FormInput
                        label="Current Password"
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordFormik.values.currentPassword}
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        error={
                          passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword
                            ? passwordFormik.errors.currentPassword
                            : undefined
                        }
                      />
                    </div>
                    <div>
                      <FormInput
                        label="New Password"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordFormik.values.newPassword}
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        error={
                          passwordFormik.touched.newPassword && passwordFormik.errors.newPassword
                            ? passwordFormik.errors.newPassword
                            : undefined
                        }
                        helperText="Must be 8-16 characters with at least one uppercase letter and one special character"
                      />
                    </div>
                    <div>
                      <FormInput
                        label="Confirm New Password"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordFormik.values.confirmPassword}
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        error={
                          passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword
                            ? passwordFormik.errors.confirmPassword
                            : undefined
                        }
                      />
                    </div>
                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={passwordFormik.isSubmitting}
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;