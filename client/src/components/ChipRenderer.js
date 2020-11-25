import { Chip } from '@material-ui/core';

const ChipRenderer = ({ text, handleDelete, isDisabled, className }, key) => {
  const chipProps = {
    label: text,
    onDelete: handleDelete,
    disabled: isDisabled,
    className,
    key,
    size: 'small',
    variant: 'outlined',
    color: 'primary',
  };

  return <Chip {...chipProps} />;
};

export default ChipRenderer;
