'use client'

import React, { useState } from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define types for our data
interface DataPoint {
  condition: string;
  price: number;
}

interface MSRP {
  title: string;
  value: string;
}

interface YMMValueChartWithMSRPProps {
  chartData: DataPoint[];
  msrp: MSRP;
}

// Define the type for our custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded shadow-lg">
        <p className="font-bold text-lg text-gray-800">{label}</p>
        <p className="text-blue-600 text-xl font-bold">Value: ${payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function YMMValueChartWithMSRP({ chartData, msrp }: YMMValueChartWithMSRPProps) {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)

  const handleConditionClick = (condition: string) => {
    setSelectedCondition(condition === selectedCondition ? null : condition)
  }

  return (
    <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-gray-800">Vehicle value across different conditions</CardTitle>
    </CardHeader>
      <CardContent className="pt-6 pb-4 px-4">
        <div className="mb-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">{msrp.title}</span>
          <span className="text-2xl font-bold text-green-600">{msrp.value}</span>
        </div>
        <div className="h-[400px] w-full bg-white rounded-lg shadow-inner relative">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="condition" 
                stroke="#888"
                tick={{ fill: '#333', fontSize: 14 }}
                tickLine={{ stroke: '#888' }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                domain={['dataMin - 5000', 'dataMax + 5000']}
                tick={{ fill: '#333', fontSize: 14 }}
                tickLine={{ stroke: '#333' }}
                axisLine={{ stroke: '#333' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={({ cx, cy, payload }) => (
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={8} 
                    fill={selectedCondition === payload.condition ? "#3b82f6" : "#fff"}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    className="transition-all duration-300 cursor-pointer"
                    onClick={() => handleConditionClick(payload.condition)}
                  />
                )}
                activeDot={{ r: 10, fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 space-y-4">
          <h4 className="text-lg font-semibold">Value Breakdown</h4>
          {chartData.map((item, index) => (
            <div 
              key={item.condition} 
              className={`flex justify-between items-center p-3 rounded-lg transition-colors duration-300 ${
                selectedCondition === item.condition ? 'bg-blue-100' : 'bg-gray-100'
              } cursor-pointer`}
              onClick={() => handleConditionClick(item.condition)}
            >
              <span className="font-medium">{item.condition}</span>
              <div className="flex items-center">
                <span className="text-blue-600 font-bold text-lg">${item.price.toLocaleString()}</span>
                {index > 0 && (
                  <span className="ml-2 text-sm text-red-500">
                    (-${(chartData[index - 1].price - item.price).toLocaleString()})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}