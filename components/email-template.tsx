/* eslint-disable*/
export const SuperchatEmailTemplate: React.FC<{
  message: string;
  name: string;
}> = ({ message, name }) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
    }}
  >
    <h2 style={{ color: '#4f46e5', textAlign: 'center' }}>
      🎉 Hello {name} You Have a New Tipfinity!
    </h2>

    <blockquote
      style={{
        backgroundColor: '#fff',
        padding: '15px',
        borderLeft: '5px solid #4f46e5',
        fontStyle: 'italic',
        margin: '20px 0',
      }}
    >
      "{message}"
    </blockquote>

  </div>
);
