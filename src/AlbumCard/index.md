---
title: AlbumCard
order: 9
---

# AlbumCard 相册卡片

```jsx
import React from 'react';
import { AlbumCard } from 'yaner-lib';

export default () => {
  const _info = {
    photoUrl:
      'https://medusa-test.oss-cn-hangzhou.aliyuncs.com/csm-storage/403ea296-9e34-451a-909e-2877f779379b.jpeg',
    personId: 0,
    personName: '丘伟伦',
    subtitle: '安全员',
    attendance: '出勤',
    tagColor: '#00AE4C',
  };
  return (
    <div style={{ padding: '20px', background: '#121c37' }}>
      <AlbumCard info={_info} onClick={e => alert(e)} />
    </div>
  );
};
```

<API></API>
