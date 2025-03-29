import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
  const data = [
    { name: '1월', value: 1001 },
    { name: '2월', value: 200 },
    { name: '3월', value: 300 },
    { name: '4월', value: 200 },
    { name: '5월', value: 400 },
  ];

  return (
    <div style={{height:"100%" ,display:"flex", justifyContent:"center", alignItems:"center"}}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke="#E0E0E0" strokeWidth={4} />
          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

