import { Bar } from 'react-chartjs-2';

const Diagram: React.FC<any> = ({ diagramData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Balkendiagramm</h2>
      <Bar 
        data={diagramData} 
        options={{
          plugins: {
            title: {
              display: true,
              text: "Datenübersicht",
            },
            legend: {
              display: false,
            },
          },
        }} 
      />
    </div>
  );
};

export default Diagram;
