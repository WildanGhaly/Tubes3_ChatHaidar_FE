import React from 'react';
import './NewChat.css';

function NewChat({ messages, setMessages }) {
  return (
    <div className='NewChat'>
      <h1 style={{ textAlign: 'center' }}>ChatHaidar</h1>
      <div>
        <h2>Example</h2>
        <div >
          <button className='my-buttons' >8 + 2 * 3</button>
          <button className='my-buttons' >13/12/2023</button>
          <button className='my-buttons' >What is chicken?</button>
        </div>
      </div>
      <div>
        <h2>Capabilities</h2>
        <div>
          <button className='my-buttons' >Can calculate math expression</button>
          <button className='my-buttons' >Can show the day of a date</button>
          <button className='my-buttons' >Can answer question</button>
        </div>
      </div>
      <div>
        <h2>Limitations</h2>
        <div>
          <button className='my-buttons' >Can Only Use KMP or BM Algorithm</button>
          <button className='my-buttons' >Can not anwer the unknown question</button>
          <button className='my-buttons' >There might still be unfixed bug</button>
        </div>
      </div>
    </div>
  );
}

export default NewChat;
