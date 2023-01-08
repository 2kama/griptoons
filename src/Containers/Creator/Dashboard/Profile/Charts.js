import React, { Fragment } from 'react'


//third party component
import Chart from 'react-apexcharts'



const Charts = ({ name, userData, averageData, categories }) => {


    const plotData = {
        
    series: [{
        name: `My ${name}`,
        data: userData
      }, {
          name: `Average ${name}`,
          data: averageData
      }],
      options: {
        colors : ['#de3c4b', '#777'],
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'category',
          categories
        },
        noData: {
          text: "No Data to Show",
          align: 'center',
          verticalAlign: 'middle',
          style: {
            color: "#de3c4b",
            fontSize: '14px'
          }
        }
      },
    
    
    }




    return(
        <Fragment>
            
            <Chart options={plotData.options} series={plotData.series} type="area" height={350} />

        </Fragment>
    )
}



export default Charts