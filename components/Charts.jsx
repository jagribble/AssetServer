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
    labels: [
      'Red',
      'Green',
      'Yellow',
    ],
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
  const organizations = {};
  // TODO: fix getting organization Name into the Pie chart
  props.assets.forEach((asset) => {
    // console.log('--------------');
    // console.log(asset.assetname);
    // console.log(organizations);
    // console.log(organizations[`${asset.assetname}`]);
    const organization = props.orgs.find((org) => {
      if (org.orginizationid === asset.orginizationid) {
        return org;
      }
    }, () => {
      console.log(organization.name);
      if (!organizations[organization.name]) {
        organizations[organization.name] = { number: 1 };
      } else {
        organizations[organization.name].number += 1;
      }
    });
  });

  console.log(organizations);
  return (<Pie data={data} />);
};


export default Charts;
