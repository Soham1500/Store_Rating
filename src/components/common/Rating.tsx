import React from 'react';
import { Star } from 'lucide-react';
import classNames from 'classnames';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  editable = false,
  onChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const handleMouseEnter = (rating: number) => {
    if (!editable) return;
    setHoverRating(rating);
  };
  
  const handleMouseLeave = () => {
    if (!editable) return;
    setHoverRating(0);
  };
  
  const handleClick = (rating: number) => {
    if (!editable || !onChange) return;
    onChange(rating);
  };
  
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];
  
  const getColor = (position: number) => {
    const displayRating = hoverRating || value;
    if (position <= displayRating) {
      return 'text-amber-400 fill-amber-400';
    }
    return 'text-gray-300';
  };
  
  const stars = Array.from({ length: max }, (_, index) => {
    const position = index + 1;
    
    return (
      <Star
        key={position}
        className={classNames(
          sizeClass,
          getColor(position),
          'transition-all duration-100',
          editable && 'cursor-pointer hover:scale-110'
        )}
        onMouseEnter={() => handleMouseEnter(position)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(position)}
      />
    );
  });
  
  return (
    <div className={classNames('flex', className)}>
      {stars}
      {editable && (
        <span className="ml-2 text-sm text-gray-600">
          {hoverRating || value || '0'} of {max}
        </span>
      )}
    </div>
  );
};

export default Rating;