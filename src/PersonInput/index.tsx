import React, { useState, useRef } from 'react';
import { Input } from 'antd';

export interface PersonValue {
  name?: string;
  idCard?: string;
  phone?: string;
}

interface IComponentProps {
  value?: PersonValue;
  onChange?: (value: PersonValue) => void;
}

const IComponent: React.FC<IComponentProps> = ({ value = {}, onChange }) => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const idCardRef = useRef(null);
  const [name, setName] = useState<string>('');
  const [idCard, setIdCard] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const triggerChange = (changedValue: PersonValue) => {
    onChange?.({ name, idCard, phone, ...value, ...changedValue });
  };

  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const _value = e.target.value;
    switch (type) {
      case 'name':
        setName(_value);
        break;
      case 'idCard':
        setIdCard(_value);
        break;
      case 'phone':
        setPhone(_value);
        break;
      default:
        break;
    }
    triggerChange({ [type]: _value });
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (e.keyCode === 8) {
      switch (type) {
        case 'idCard':
          // @ts-ignore
          if (e.target.value.length <= 0) {
            setTimeout(() => {
              // 防止删除多余数据
              // @ts-ignore
              nameRef?.current?.focus();
            }, 100);
          }
          break;
        case 'phone':
          // @ts-ignore
          if (e.target.value.length <= 0) {
            setTimeout(() => {
              // 防止删除多余数据
              // @ts-ignore
              idCardRef?.current?.focus();
            }, 100);
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <span>
      <Input
        type="text"
        ref={nameRef}
        value={value.name || name}
        onChange={(e) => onValueChange(e, 'name')}
        placeholder="请输入姓名"
        style={{ width: 160, marginRight: '8px' }}
      />
      <Input
        type="text"
        ref={idCardRef}
        value={value.idCard || idCard}
        placeholder="请输入身份证号"
        onChange={(e) => onValueChange(e, 'idCard')}
        onKeyDown={(e) => onKeyDown(e, 'idCard')}
        style={{ width: 200, marginRight: '8px' }}
      />
      <Input
        type="text"
        ref={phoneRef}
        placeholder="请输入手机号"
        value={value.phone || phone}
        onChange={(e) => onValueChange(e, 'phone')}
        onKeyDown={(e) => onKeyDown(e, 'phone')}
        style={{ width: 200 }}
      />
    </span>
  );
};

export default IComponent;
