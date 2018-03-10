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

  const userChartData = {
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
  // For each asset go through and one to the relevant organisation count
  const organisations = {};
  props.assets.forEach((asset) => {
    if (props.orgs.length > 0) {
      const organisationIndex = props.orgs.findIndex((org, i) => {
        if (org.orginizationid === asset.orginizationid) {
          return org;
        }
      });
      const organisation = props.orgs[organisationIndex];
      if (!organisations[organisation.name]) {
        organisations[organisation.name] = { number: 1 };
      } else {
        organisations[organisation.name].number += 1;
      }
    }
  });
  // add the numbers to the chart data
  Object.keys(organisations).forEach((org) => {
    data.labels.push(org);
    data.datasets[0].data.push(organisations[`${org}`].number);
  });

  const userData = {};

  props.users.forEach((user) => {
    if (props.orgs.length > 0) {
      const orgIndex = props.orgs.findIndex((org, i) => {
        if (parseInt(user.organizationid, 10) === org.orginizationid) {
          return org;
        }
        return null;
      });

      const organisation = props.orgs[orgIndex];
      if (!userData[organisation.name]) {
        userData[organisation.name] = { number: 1 };
      } else {
        userData[organisation.name].number += 1;
      }
    }
  });


  Object.keys(userData).forEach((org) => {
    userChartData.labels.push(org);
    userChartData.datasets[0].data.push(userData[`${org}`].number);
  });


  return (
    <div>
      <h1>Number of Assets per Organisation</h1>
      <Pie data={data} />
      <h1>Number of Users per Organisation</h1>
      <Pie data={userChartData} />
    </div>);
};


export default Charts;
