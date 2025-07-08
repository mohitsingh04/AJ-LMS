import React from 'react';

interface ChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  type?: 'bar' | 'line' | 'pie';
}

const Chart: React.FC<ChartProps> = ({ title, data, type = 'bar' }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      {type === 'bar' && (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div className="w-24 text-sm text-gray-600 truncate">{item.name}</div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: item.color || colors[index % colors.length]
                    }}
                  />
                </div>
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 text-right">{item.value}</div>
            </div>
          ))}
        </div>
      )}

      {type === 'pie' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color || colors[index % colors.length] }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {data.reduce((sum, item) => sum + item.value, 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;