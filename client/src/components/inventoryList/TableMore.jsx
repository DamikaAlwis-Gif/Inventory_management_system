import React from 'react'

const TableMore = (props) => {
    const {details} = props;
    const formatText = (text) => {
      const temp = text.replace(/_/g, " ");
      return temp.charAt(0).toUpperCase() + temp.slice(1);
    };

  return (
    <>
      <table className="table table-primary table-hover table-sm table-responsive">
        <thead className="">
          <tr>
            <th>Attribute</th>
            <th>Information</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {Object.entries(details).map(([key, value]) => (
            <tr key={key}>
              <td>{formatText(key)}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableMore