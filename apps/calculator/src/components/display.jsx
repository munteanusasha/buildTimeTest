import PropTypes from 'prop-types';

export default function Display(props) {
  return <div id={props.id}>{props.value}</div>;
}

Display.PropTypes = {
  id: PropTypes.string,
  value: PropTypes.number,
};

Display.defaultProps = {
  id: '',
  value: 0,
};
