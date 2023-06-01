# react-verification-input
Basic otp verification like component with tailwindcss. <br/>
![image](https://github.com/phuopham/react-verification-input/assets/108047552/981d1c55-2fde-4fbc-8bdb-29ff3c621681)

## Installaton:
<pre>npm install --save @phuopham/verification-input </pre>
or
<pre>yarn add --save phuopham/verification-input</pre>
### Basic usage
```jsx
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function App() {
  const [value, setValue] = useState('');

  return (
    <VerificationInput
      value={value}
      onChange={setValue}
      className="bg-red-200"
    />
  );
}

Any comment or suggestion is highly welcome.
