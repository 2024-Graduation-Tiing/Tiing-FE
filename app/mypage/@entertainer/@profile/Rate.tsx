'use client';

import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { fetchTopKeywords } from '@/app/api/matches/rate/request';
import { useQuery } from '@tanstack/react-query';

//
//
//

type KeywordCount = {
  id: string;
  count: number;
};

//
//
//

// set ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

// set Chart options
let options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxHeight: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 21,
        color: '#5B5C5E',
        font: {
          size: 14,
        },
      },
    },
    Tooltip: {},
  },
};

const COLORS = ['rgb(30, 150, 252)', 'rgb(70, 229, 220)', 'rgb(255, 241, 108)'];

const Rate = () => {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['topKeywords'],
    queryFn: fetchTopKeywords,
  });

  if (isLoading) return <>Loading...</>;
  if (isFetching) return <>Background Updating...</>;
  if (error) return <>{error.message}</>;

  if (data.topKeywords) {
    const labels = data.topKeywords.map((item: KeywordCount) => item.id);
    const count = data.topKeywords.map((item: KeywordCount) => item.count);
    const backgroundColors = COLORS.slice(0, labels.length);
    const borderColors = COLORS.slice(0, labels.length);

    let chartData = {
      labels: labels,
      datasets: [
        {
          label: ' 매칭수',
          data: count,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          hoverOffset: 4,
        },
      ],
    };

    if (labels.length > 3) {
      const otherKeywords = labels.slice(2);
      const newLabels = [...labels.slice(0, 2), '그 외'];
      const othersCount = count.slice(2).reduce((sum, value) => sum + value, 0);
      const newCounts = [...count.slice(0, 2), othersCount];

      chartData = {
        ...chartData,
        labels: newLabels,
        datasets: chartData.datasets.map((dataset) => ({
          ...dataset,
          data: newCounts,
        })),
      };

      options = {
        ...options,
        plugins: {
          ...options.plugins,
          // legend: {
          //   ...options.plugins.legend,
          //   position: 'bottom',
          // },
          tooltip: {
            callbacks: {
              title: function (context) {
                // '기타'인 경우만 커스터마이즈된 툴팁 표시
                const item = context[0];
                if (item.label === '그 외') {
                  const newTitle = otherKeywords.join(', ');
                  return newTitle;
                }
                return item.label;
              },
            },
          },
        },
      };

      return (
        <div className="h-full w-full">
          <Doughnut data={chartData} options={options} />
        </div>
      );
    }
  }
};
export default Rate;
