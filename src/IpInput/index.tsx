import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'antd';
import './index.less';
import classnames from 'classnames';

interface IComponentProps {
  value?: string;
  onChange?: (value: string) => void;
}

const IComponent: React.FC<IComponentProps> = ({ value = '', onChange }) => {
  const warpRef = useRef(null);

  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let _value = e.target.value.replace(/\D/g, '');
    if (Number(_value) >= 255) {
      _value = '255';
      if (index < 3) {
        // @ts-ignore
        const inputs = warpRef.current!.childNodes;
        inputs[index + 1].childNodes[0].focus();
      }
    }
    const valueArr = value.split('.');
    valueArr[index] = _value;
    onChange && onChange(valueArr.join('.'));
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // @ts-ignore
    const inputs = warpRef.current!.childNodes;
    if ([190, 13].includes(e.keyCode) && index < 3) {
      inputs[index + 1].childNodes[0].focus();
    }
    // @ts-ignore
    if (e.keyCode === 8 && index > 0 && e.target.value.length <= 0) {
      inputs[index - 1].childNodes[0].focus();
    }
    // console.log(e.keyCode)
    //   console.log(warpRef.current!.childNodes, e.target.value, e.currentTarget.value)
  };

  return (
    <span ref={warpRef}>
      {Array(4)
        .fill('')
        .map((item, index) => (
          <span className="c-ip-input">
            <Input
              key={index}
              type="text"
              onKeyDown={(e) => onKeyDown(e, index)}
              // @ts-ignore
              value={value.split('.')[index]}
              onChange={(e) => onValueChange(e, index)}
              placeholder=""
              style={{ width: 160, marginRight: '8px' }}
            />
          </span>
        ))}
    </span>
  );
};

export default IComponent;
