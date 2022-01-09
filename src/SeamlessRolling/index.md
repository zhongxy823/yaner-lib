---
title: SeamlessRolling
order: 1
---

# SeamlessRolling 无缝滚动

```jsx
import React from 'react';
import { SeamlessRolling } from 'yaner-lib';

export default () => {
  const itemDom = color => {
    return (
      <div
        onClick={() => alert(color)}
        style={{
          backgroundColor: color,
          opacity: 0.5,
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
    <div>
      <h3 style={{ fontSize: '18px' }}>横向</h3>
      <SeamlessRolling
        // hoverStop={false}
        direction="transverse"
        style={{ height: '400px' }}
        rollingKey="transverse"
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
      <h3 style={{ marginTop: '20px', fontSize: '18px' }}>竖向</h3>
      <SeamlessRolling
        hoverStop
        direction="vertical"
        style={{ height: '400px' }}
        rollingKey="vertical"
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
    </div>
  );
};
```

<API></API>
