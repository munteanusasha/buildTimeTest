import PropTypes, { number } from 'prop-types';

export default function Button(props) {
  return (
    <button
      className={props.className}
      value={props.value}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

Button.PropTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  value: number,
  onClick: null,
};

// export default Button;
