import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';

interface SequenceChartProps {
  sequence: string;
  onClose: () => void;
  title: string;
}

const P_VALUES: { [key: string]: number } = {
  'A': 6.11,
  'R': 10.76,
  'N': 5.4,
  'D': 2.98,
  'C': 5.15,
  'E': 3.08,
  'Q': 5.65,
  'G': 6.06,
  'H': 7.64,
  'I': 6.04,
  'L': 6.04,
  'K': 9.47,
  'M': 5.71,
  'F': 5.76,
  'P': 6.30,
  'S': 5.70,
  'T': 5.60,
  'W': 5.88,
  'Y': 5.63,
  'V': 6.02
};

const RESIDUE = 5;

const SequenceChart: React.FC<SequenceChartProps> = ({ sequence, onClose, title }) => {
  const data = sequence.split('').map((char, index) => ({
    position: index + 1,
    pValue: P_VALUES[char.toUpperCase()] || RESIDUE,
    aminoAcid: char.toUpperCase()
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90vw] max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title} P-Value Analysis</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="h-[60vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="position"
                label={{ value: 'Sequence Position', position: 'bottom', offset: 0 }}
              />
              <YAxis
                domain={[0, 12]}
                label={{ value: 'P-Value', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                        <p className="text-sm font-medium">Position: {data.position}</p>
                        <p className="text-sm">Amino Acid: {data.aminoAcid}</p>
                        <p className="text-sm">P-Value: {data.pValue.toFixed(2)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="pValue"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Legend</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(P_VALUES).map(([acid, value]) => (
              <div key={acid} className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                <span className="text-sm text-gray-600">{acid}: {value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequenceChart;