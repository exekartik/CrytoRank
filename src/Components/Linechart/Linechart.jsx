import React, {useEffect, useState} from 'react'
import Chart from 'react-google-charts'

const Linechart = ({historicalData}) => {

    const [data, setData] = useState([["Date", "prices"]])

    useEffect(()=>{
        let dataCopy = [["Date", "Prices"]];
        if(historicalData.prices)
        {
            historicalData.prices.map((item)=>{
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
            })
            setData(dataCopy);
        }
    },[historicalData])
  return (
    <Chart
    chartType='LineChart'
    data={data}
    height="100%"
    legendToggle
    options={{
        backgroundColor: 'transparent',
        colors: ['#06b6d4'],
        hAxis: { textStyle: { color: '#94a3b8' }, gridlines: { color: 'transparent' } },
        vAxis: { textStyle: { color: '#94a3b8' }, gridlines: { color: 'rgba(255, 255, 255, 0.1)' } },
        legend: { textStyle: { color: '#e2e8f0' } }
    }}
    />

  )
}

export default Linechart
