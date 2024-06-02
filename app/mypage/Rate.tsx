'use client'
//
// 
// 
import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
//
//
//
ChartJS.register(ArcElement, Tooltip, Legend);
// 
// 
// 
const Rate = () => {
  const data = {
    labels: [
      ' 🌱 풋풋한',
      ' 🏄 스포티한',
      ' 🫧 깨끗한'
    ],

    datasets: [{
      label: '키워드별 매칭률',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(30, 150, 252)',
        'rgb(70, 229, 220)',
        'rgb(255, 241, 108)'
      ],
      borderColor: [
        'rgb(30, 150, 252)',
        'rgb(70, 229, 220)',
        'rgb(255, 241, 108)'],
      hoverOffset: 4,

    }]
  };

  const options={
    responsive:false,
    plugins:{
      legend: {
        position: 'right',
        labels:{
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'circle',
          padding:21,
          color:'#5B5C5E',
          font:{
            size: 15,
          }
        }
      },
    },
  }

  return (
      <div className='flex-1 flex flex-col justify-center' >
        <Doughnut data={data} options={options} />
      </div>
      
  );
};

export default Rate;