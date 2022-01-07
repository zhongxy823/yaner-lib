---
title: IpInput
order: 4
---

## IpInput

ip 输入框

Demo:

```tsx
import React, { useState } from 'react';
import { IpInput } from 'yaner-lib';

const IPage: React.FC = () => {
  const [value, setValue] = useState();
  return <IpInput value={value} onChange={(e) => setValue(e)} />;
};

export default IPage;
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
