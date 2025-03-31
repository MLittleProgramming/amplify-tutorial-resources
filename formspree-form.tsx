import React, { useState } from 'react';

interface DirectOrderProps {
  phoneNumber: string;
}

const DirectOrder: React.FC<DirectOrderProps> = ({
  phoneNumber = ''
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', { name, phone, address, orderNote });
    setFormSubmitted(true);

    try {
      const response = await fetch('YOUR_FORM_SPREE_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, address, orderNote })
      })

      if (response.ok) {
        // Reset form after submission
        setTimeout(() => {
          setName('');
          setPhone('');
          setAddress('');
          setOrderNote('');
          setFormSubmitted(false);
        }, 3000);
      } else {
        console.log('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form: ', error)
    }
  };

  return (
    <div className="direct-order">
      <div className="direct-order-card">
        <h3>Order Directly From Us</h3>
        <p>Fill out this form and we'll call you back to confirm your order</p>
        
        {formSubmitted ? (
          <div className="success-message">
            <p>This is a demo site, so no orders will be processed. This website was made and designed by <a href="https://mlittleprogramming.com" target="_blank" rel="noopener noreferrer">MLittleProgramming</a></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea 
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="orderNote">Order Notes</label>
              <textarea 
                id="orderNote"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Tell us what you'd like to order..."
                required
              />
            </div>
            
            <button type="submit" className="order-btn direct-btn">
              Request Order
            </button>
          </form>
        )}
        
        <div className="direct-contact">
          <p>Or call us directly: <a href="www.google.com">here</a></p>
        </div>
      </div>
    </div>
  );
};

export default DirectOrder; 
