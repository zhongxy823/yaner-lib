---
title: FadeInOut
order: 2
---

## FadeInOut

ip 输入框

Demo:

```tsx
import React, { useState } from 'react';
import { FadeInOut } from 'yaner-lib';

const IPage: React.FC = () => {
  const itemDom = color => {
    return (
      <div
        onClick={() => alert(color)}
        style={{
          backgroundColor: color,
          textAlign: 'center',
          color: '#fff',
          height: '100%',
          width: '100%',
          fontSize: '18px',
        }}
      >
        {color}
      </div>
    );
  };
  return (
    <FadeInOut
      items={[
        'red',
        'orange',
        'yellow',
        'green',
        'palegreen',
        'blue',
        'purple',
      ].map(item => itemDom(item))}
    />
  );
};

export default IPage;
```

<API />
