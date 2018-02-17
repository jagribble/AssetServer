import React from 'react';
import { Pie } from 'react-chartjs-2';
// export default class Charts extends Component {
//   constructor(props){
//     super(props)
//   }
//
// }

const Charts = (props) => {
  const data = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
  };
  // For each asset go through and one to the relevant organization count
  const organizations = {};
  props.assets.forEach((asset) => {
    if (props.orgs.length > 0) {
      const organizationIndex = props.orgs.findIndex((org, i) => {
        if (org.orginizationid === asset.orginizationid) {
          return org;
        }
      });
      const organization = props.orgs[organizationIndex];
      if (!organizations[organization.name]) {
        organizations[organization.name] = { number: 1 };
      } else {
        organizations[organization.name].number += 1;
      }
    }
  });
  // add the numbers to the chart data
  Object.keys(organizations).forEach((org) => {
    data.labels.push(org);
    data.datasets[0].data.push(organizations[`${org}`].number);
  });

  console.log(organizations);
  return (
    <div>
      <h1>Number of Assets per Organization</h1>
      <Pie data={data} />
    </div>);
};


export default Charts;
