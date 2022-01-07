---
title: 快速上手
order: 0
nav: /yaner-lib
---

## 引用组件

```sh
yarn add yaner-lib
```

## 使用组件

```javascript
import React from 'react';
import { Image } from 'yaner-lib';

const Wrapper: React.SF = () => {
  return (
    <div>
      <Image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
    </div>
  );
};

export default Wrapper;
```
