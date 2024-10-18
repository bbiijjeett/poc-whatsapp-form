import { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Google Apps Script URL (replace with your actual URL)
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbw4MThaAg9nfCTvc7uixdr27VlsMMD3lSA1WirWRe4EavRAAdg8WDzhXg2O2baITXTh7g/exec';

    // // Send form data to Google Apps Script
    // fetch(googleScriptURL, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
    // })
    //   .then(response => {
    //     setLoading(false);
    //     setSuccess(true);

    //     // Redirect to WhatsApp community after successful submission
    //     window.location.href = 'https://chat.whatsapp.com/HqjtY7zlduK5eaLXFIyJmk';
    //   })
    //   .catch(error => {
    //     setLoading(false);
    //     console.error('Error!', error.message);
    //   });

    fetch(googleScriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
    })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        window.location.href = 'https://chat.whatsapp.com/HqjtY7zlduK5eaLXFIyJmk'; // Redirect after successful submission
      })
      .catch(error => {
        setLoading(false);
        console.error('Error!', error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className={`w-full p-3 text-white font-bold rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-500'}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {success && <p className="text-green-500 mt-4">Form submitted successfully!</p>}
    </form>
  );
};

export default ContactForm;
