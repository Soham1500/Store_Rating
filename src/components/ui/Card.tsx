import React from 'react';
import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
}) => {
  return (
    <div
      className={classNames(
        'bg-white rounded-lg shadow-sm overflow-hidden',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  withBorder = true,
}) => {
  return (
    <div
      className={classNames(
        'px-5 py-4',
        withBorder && 'border-b border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames('p-5', className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  withBorder = true,
}) => {
  return (
    <div
      className={classNames(
        'px-5 py-4',
        withBorder && 'border-t border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;