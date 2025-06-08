import PropTypes from 'prop-types';



// This displays the data for the table, showing the wrestler's name and championships won.
export const WrestlerRows = ({ wrestler}) => (
  <tr>
    <td>{wrestler.name}</td>
    <td>
      {wrestler.championships
        .map((c) => `${c.title} (${c.times})`)
        .join(', ')}
    </td>
    <td>{wrestler.totaldaysHeld}</td>
  </tr>
);

// USE WIKI API AND GET INFO ABOUT EACH CHAMPION. 
// SO WE CAN PUT IT IN THE WRESTLER MORE INFO.
// Used for the onClick event to show more information about the wrestler.
export const WrestlerMoreInfo = ({ wrestler }) => (
  <div>
    <h1>{wrestler.name}</h1>
    <p>{wrestler.description}</p>
  </div>
);


/*
// Type validation using PropTypes
WrestlerRows.propTypes = {
  wrestler: PropTypes.shape({
    name: PropTypes.string.isRequired,
    championships: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        times: PropTypes.number.isRequired,
        totaldaysHeld: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

WrestlerMoreInfo.propTypes = {
  wrestler: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
*/
