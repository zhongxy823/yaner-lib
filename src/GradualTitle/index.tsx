import React from 'react';
import classnames from 'classnames';
import { toRGB } from '../utils';
import './index.less';

interface IComponentProps {
  /**
   * @description       label
   * @default           -
   */
  label: React.ReactNode;
  /**
   * @description       value
   * @default           -
   */
  value?: React.ReactNode;
  /**
   * @description       渐变背景颜色
   * @default           #048BFF
   */
  color?: string;
  /**
   * @description       类名
   * @default           -
   */
  className?: string;
  /**
   * @description       样式
   * @default           -
   */
  style?: React.CSSProperties;
}

const IComponent: React.FC<IComponentProps> = ({
  color = '#048BFF',
  value,
  label,
  className,
  style,
}) => {
  return (
    <div
      className={classnames('c-gradual-title', className)}
      style={{
        ...style,
        background: `linear-gradient(270deg, ${toRGB(color, 0)} 0%, ${toRGB(
          color,
          0.2,
        )} 54%, ${toRGB(color, 0)} 100%)`,
      }}
    >
      <div className="c-gradual-title-label">{label}</div>
      <div className="c-gradual-title-value">{value || '--'}</div>
    </div>
  );
};

export default IComponent;
