import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { compose, pure } from 'recompose';

const StatisticField = ({ field: o }) => {
  return (
    <Fragment>
      <h2>{o.label}</h2>
      {
        o.fields && o.fields.map(oo => (<div key={`field-${o.label}-${oo.label}`}>
          <p>{oo.label}: {oo.value}</p>
          {
            oo.fields && oo.fields.map(ooo => (<div key={`field-${oo.label}-${ooo.label}`}>
              <Card title={`${ooo.label}`}>
                {
                  ooo.fields && ooo.fields.map(oooo => (<div key={`field-${oo.label}-${ooo.label}-${oooo.label}`}>
                    <p>
                      {oooo.label}: {oooo.value}
                    </p>
                  </div>))
                }
              </Card>
            </div>))
          }
        </div>))
      }
    </Fragment>
  )
};

export default compose(
  pure,
)(StatisticField);

StatisticField.defaultProps = {
};

StatisticField.propTypes = {
  field: PropTypes.object.isRequired,
};
