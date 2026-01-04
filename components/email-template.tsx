export const SuperchatEmailTemplate: React.FC<{
  message: string;
  name: string;
  amount?: number;
  senderName?: string;
}> = ({ message, name, amount, senderName }) => (
  <div
    style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '0',
      backgroundColor: '#ffffff',
    }}
  >
    {/* Header */}
    <div
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        padding: '40px 20px',
        textAlign: 'center',
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
      <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
        You Have a New Tip!
      </h1>
      <p style={{ margin: '0', fontSize: '14px', opacity: '0.9' }}>
        {senderName ? `from ${senderName}` : 'From a supporter'}
      </p>
    </div>

    {/* Amount Badge */}
    {amount && (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div
          style={{
            display: 'inline-block',
            background: '#f0f4ff',
            border: '2px solid #4f46e5',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '24px',
            fontWeight: '700',
            color: '#4f46e5',
          }}
        >
          ${amount.toFixed(2)}
        </div>
      </div>
    )}

    {/* Message Section */}
    <div style={{ padding: '20px 20px' }}>
      <p
        style={{
          margin: '0 0 16px 0',
          fontSize: '14px',
          color: '#6b7280',
          textAlign: 'center',
        }}
      >
        Here's what they wanted to say:
      </p>

      <blockquote
        style={{
          backgroundColor: '#fafbff',
          padding: '20px',
          borderLeft: '4px solid #4f46e5',
          borderRadius: '6px',
          margin: '0 0 24px 0',
          fontStyle: 'italic',
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#374151',
          borderTop: '1px solid #e5e7eb',
          borderRight: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        "{message}"
      </blockquote>

      {/* CTA Button */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <a
          href="#"
          style={{
            display: 'inline-block',
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'background-color 0.2s',
          }}
        >
          View on Tipfinity
        </a>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        borderTop: '1px solid #e5e7eb',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
        fontSize: '12px',
        color: '#6b7280',
      }}
    >
      <p style={{ margin: '0 0 8px 0' }}>
        💖 Thank you for your support!
      </p>
      <p style={{ margin: '0', fontSize: '11px', opacity: '0.8' }}>
        © 2026 Tipfinity. All rights reserved.
      </p>
    </div>
  </div>
);